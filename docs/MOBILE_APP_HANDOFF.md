# ANSH Visitor — Mobile App Handoff for Cursor

> **Purpose of this document**  
> Use this as the single source of truth when building the **React Native** mobile app for ANSH Visitor.  
> Stitch will supply visual UI designs per screen — this document explains **what the app is**, **every screen**, **features**, **data**, **flows**, and **how it connects to the existing web backend**.  
> When implementing, match Stitch designs for layout/visuals and this document for behavior and business logic.

---

## 1. Product Summary

**App name:** ANSH Visitor  
**Category:** B2B workplace / visitor management  
**Platform target:** React Native (iOS + Android)  
**Existing product:** Next.js web app in this same repository (`ansh-visitor`)

### What the app does

ANSH Visitor helps offices manage guests from arrival to departure:

- Issue **QR gate passes** with a 6-character passcode
- **Pre-register** expected guests or register **walk-ins** at the lobby desk
- **Check in / check out** visitors via QR scan or passcode
- Maintain a **team directory** (employees who act as hosts)
- Share **My Link** — a public URL where guests pre-register without logging in
- Run **reports & audit exports** for compliance
- Configure **workspace**, branches, billing (Pro plan)

### Who uses the mobile app

| Role | Primary use on mobile |
|------|----------------------|
| **Reception / front desk** | Check-in, check-out, walk-ins, QR scan, print/share passes |
| **Admin / HR** | Team directory, workspace settings, reports |
| **Manager / Employee (host)** | Pre-register guests, view today's visitors, My Link |
| **Visitor (guest)** | Public registration page only (optional separate flow or WebView) |

### Core value on mobile

The mobile app should feel like a **lobby desk tool**: fast check-in, big tap targets, camera QR scanning, offline-tolerant lists where possible, and instant pass display.

---

## 2. Brand & UI Direction

### Visual identity (match Stitch designs when provided)

- **Primary accent:** Emerald / teal (trust, “go”, security)
- **Secondary:** Sky blue, slate neutrals
- **Semantic:** Rose/red for check-out & delete, amber for “expected” status, emerald for “checked in”
- **Typography:** Bold screen titles, small uppercase field labels, clean sans-serif
- **Components:** Rounded cards, soft borders, stat tiles with icons, bottom sheets for actions
- **Dark mode:** Support light + dark (web app already does)

### Mobile navigation pattern (recommended)

Use **bottom tab bar** for main sections (5 tabs max on phone):

1. **Dashboard** — lobby overview + quick Check In
2. **Visitors** — lists + register guest
3. **Team** — directory
4. **Reports** — audits (Admin-heavy; can be tab or nested)
5. **More** — Settings, Help, Profile, Billing

Alternative: 4 tabs + “More” drawer for Settings/Reports if Stitch designs that way.

**Important:** Follow Stitch screen layouts when provided. This document defines **content and behavior**, not pixel-perfect layout.

### Stitch design workflow

When the user provides Stitch exports:

1. Map each Stitch frame → screen name in Section 4 below
2. Implement screen shell from Stitch (colors, spacing, typography)
3. Wire behavior from this document + API section
4. Flag any Stitch screen with no matching feature here — ask before inventing

---

## 3. Authentication & Session

### Auth provider

Web app uses **Supabase Auth** (email/password + Google OAuth).

Mobile should:

1. Sign in with email/password via Supabase JS client (`@supabase/supabase-js`)
2. Store session securely (`expo-secure-store` or `react-native-keychain`)
3. On launch: restore session → fetch profile → fetch workspace data
4. Google OAuth: use Supabase OAuth with deep link redirect (`anshvisitor://auth/callback` or Expo scheme)

### After login

1. `GET /api/profiles/{userId}` — current user profile (host record)
2. Read `wid` (workspace id) from profile
3. Bootstrap: workspace, config, hosts, visitors in parallel

### Onboarding (first-time users)

3-step wizard (only if profile/workspace incomplete):

1. **Your profile** — name, phone, role, department
2. **Workspace** — company name, primary office branch
3. **Success** — enter main app

Match web: `/onboarding`

### Logged-out screens

- Splash / welcome
- Login
- Sign up
- Forgot password (if supported)

---

## 4. Complete Screen Inventory

### A. Auth & onboarding

| Screen ID | Name | Description |
|-----------|------|-------------|
| `auth-welcome` | Welcome / Splash | Logo, tagline, Login + Sign up CTAs |
| `auth-login` | Login | Email, password, Google, link to sign up |
| `auth-signup` | Sign Up | Name, email, password, company name |
| `onboarding-step-1` | Profile Setup | Name, phone, role, department |
| `onboarding-step-2` | Workspace Setup | Company name, office branch |
| `onboarding-step-3` | Ready | Loading / success → Dashboard |

---

### B. Dashboard (Lobby)

| Screen ID | Name | Description |
|-----------|------|-------------|
| `dashboard-home` | Lobby Dashboard | Welcome + name, primary actions |

**Content:**

- Greeting: “Welcome back, {name}”
- **Primary actions (sticky or prominent):**
  - **Check In** → opens Guest Verify modal (scan mode)
  - **Check Out** → opens Guest Verify modal (checkout mode)
- **Stat cards (4):**
  - Checked-In Guests (active in building)
  - Expected Today (pre-registered, status Expected)
  - Checked Out Today
  - Total Logged Visits
- **Charts (optional on mobile, scroll below):**
  - Visits by purpose (donut)
  - Lobby traffic over time
- **Lists:**
  - Currently checked-in guests (tap → detail / check out)
  - Expected arrivals today

---

### C. Visitors module

Parent section with **segmented control** or **sub-tabs**:

| Sub-tab | Screen ID | Description |
|---------|-----------|-------------|
| Today's Guests | `visitors-today` | Checked in + checked out today |
| Registered | `visitors-preregistered` | Status = Expected |
| All Log | `visitors-all` | Full history |
| My Link | `visitors-my-link` | Pro: public registration link builder |

#### Visitors list screen (shared pattern)

- Search: name, company, email, phone
- Filters: purpose, registration type (Pre-registered / Walk-in / All)
- **Table / card list** each row:
  - Visitor name, company
  - Purpose badge
  - Host name
  - Status badge: `Expected` (amber), `CheckedIn` (green), `CheckedOut` (gray)
  - Registration type: walk-in vs pre-registered
  - Time (pre-registered / checked in)
- Row actions:
  - Check in (if Expected)
  - Check out (if CheckedIn)
  - View / Print QR pass
- FAB or header button: **Register Guest**

#### Register Guest modal / screen

**Screen ID:** `modal-register-guest`

Two modes (top tabs):

1. **Pre-register (Expected)** — issues QR pass, status stays Expected until desk check-in
2. **Walk-in Entry** — immediate check-in, badge assigned

**Form fields (most optional except at least one identity field):**

| Field | Notes |
|-------|-------|
| Guest full name | Optional but recommended |
| Guest company | Placeholder = workspace name |
| Phone | International format, default India +91 |
| Email | |
| Visit purpose | Meeting, Interview, Vendor, Delivery, Other |
| QR pass validity | Pre-register only: 24h, 7d, 30d, 90d |
| Govt ID type | Aadhaar, PAN, Driving License, Passport, Voter ID |
| Govt ID number | Enabled when ID type selected |
| Special notes | Free text |

**Employee section (always visible on register form):**

- Checkbox/toggle: **Employee** (optional)
- Helper text: “Visiting from {company}? Pick yourself or a colleague.”
- When ON → dropdown of active team members
- Selecting employee auto-fills: name, email, phone, company = workspace name

**Submit buttons:**

- Pre-register: **Issue QR Pass**
- Walk-in: **Check In Now**

**After pre-register success:** show Visitor Pass screen (QR + passcode + print/share).

#### Visitor Pass screen

**Screen ID:** `screen-visitor-pass`

- Company / workspace branding
- Title: ANSH VISITOR PASS
- Large **QR code** (value = 6-char `qrCode`)
- Passcode text: `Passcode: XXXXXX`
- Visitor name, purpose, company
- Valid until (if pre-registered)
- Branch, host name
- Badge number (if walk-in / checked in)
- Actions: **Share**, **Save image**, **Print** (platform print API)

#### Guest Verify modal (Check In / Check Out)

**Screen ID:** `modal-guest-verify`

Opened from Dashboard or Visitors list.

**Modes:** `check-in` | `check-out`

**Tabs:**

1. **Camera** — QR scanner (use `expo-camera` + barcode scanner or `react-native-vision-camera`)
2. **Passcode** — manual 6-character entry

**Flow:**

1. Scan or enter passcode → lookup visitor in local list or API
2. Show visitor summary card
3. Check-in only: optional Govt ID type + number fields
4. Confirm → `PATCH` check-in or check-out API
5. Success toast + badge number on check-in

**Validation:**

- QR pass must be valid (`qrValidUntil` not expired) for check-in
- Walk-ins may not have `qrValidUntil`

#### My Link (Pro feature)

**Screen ID:** `visitors-my-link`

Gate entire screen if workspace is Free (show upgrade overlay).

**Sections:**

- Public URL slug (read-only, auto-generated from company + branch)
- Copy link, open in browser, show desk QR for URL
- Toggle: link active / inactive
- Page title, welcome message
- Design theme picker: Classic, Modern, Minimal, Bold, Glass
- QR validity period default for public registrations
- Field rules toggles: which fields required/enabled (name, phone, email, company, purpose, ID proof, notes)
- **Live preview** of public form (bottom sheet or split on tablet)

**Save** → `POST /api/registration-links`

---

### D. Team Directory

| Screen ID | Name | Description |
|-----------|------|-------------|
| `team-list` | Team Directory | Search + filter + card grid |
| `team-detail` | Teammate Profile | Drawer or stack screen |
| `team-wizard` | Add/Edit Teammate | 3-step wizard |
| `modal-delete-teammate` | Delete confirm | Destructive confirm |

#### Team list

- Search by name, email
- Filters: department, status (Active / Inactive / All)
- **Teammate cards:**
  - Avatar initials
  - Name + “You” badge on current user
  - Designation · department
  - Email, phone, branch
  - Badges: work location, role, active dot
  - **⋮ menu:**
    - **Edit** → wizard
    - **Generate QR** → opens Register Guest pre-filled (pre-register mode, Employee toggle ON, employee selected)
    - **Delete** → confirm (not on own card)

#### Add/Edit teammate wizard (3 steps)

1. **Identity** — name, work email, password (add only), phone, DOB  
2. **Job details** — employee code, joining date, designation, department, access role (Admin/Manager/Employee), status, office branch, work location, reporting manager, reporting HR  
3. **Emergency** — personal email, blood group, emergency contact name & phone  

#### Teammate detail

- Tabs: **Profile** | **Activities** (visitors they hosted)
- Edit button

---

### E. Reports & Audits

**Screen ID:** `reports-home`

- Time period selector: today, this week, this month, custom range
- Summary stats: total visits, avg duration, ID verified count
- Audit list/table: visitor, host, check-in/out, ID proof, badge, walk-in flag
- **Export Logs** → generate Excel/share sheet (use `xlsx` or server export endpoint if added later)

Pro gating: advanced export may be Pro-only on web.

---

### F. Settings

Use stack navigator under **More** tab or dedicated Settings hub.

| Screen ID | Name |
|-----------|------|
| `settings-profile` | Profile Settings |
| `settings-company` | Company / Branches |
| `settings-workspace` | Workspace dropdowns (departments, designations, branches, work locations) |
| `settings-billing` | Plan, usage, upgrade |
| `help-center` | Help guides grid |

#### Profile settings

Editable: name, phone, employee code, department, emergency contacts, etc.

#### Company settings

List of office branches with address, city, state, pincode, WFH allowed. Add/edit branch modal.

#### Billing

- Current plan: Free / Pro Trial / Pro
- Usage: teammates count, visitors, locations
- Upgrade CTA, Razorpay payment (may stay web-only initially — deep link to web billing acceptable for v1)

---

### G. Public visitor registration (guest-facing)

**Screen ID:** `public-register-{slug}`

Standalone flow — **no app login**. Options for mobile project:

1. **WebView** loading `{API_BASE}/register/{slug}` (fastest v1)
2. **Native screen** calling public API (better UX)

**Public form fields** (configurable per link):

- Name, phone, email, company, purpose, govt ID, notes
- Employee toggle + employee dropdown (for own-company staff)

**Success screen:**

- Congratulations message
- Full visitor pass with QR + passcode
- Save / share pass

**Themes:** classic, modern, minimal, bold, glass — match link `designTheme`.

---

## 5. Data Models

### Workspace

```
id, name, plan (free | pro | pro_trial), createdAt
```

### Profile (teammate / host)

```
id (Supabase UUID), name, email, role (Admin | Manager | Employee),
department, designation, officeBranch, workLocation, avatarInitials,
status (Active | Inactive), phone, employee code, joiningDate,
reportingManager, reportingHR, personalEmail, bloodGroup,
emergencyName, emergencyPhone, wid
```

### Visitor

```
id, name, email, phone, company?, purpose,
status (Expected | CheckedIn | CheckedOut),
hostId, hostName,
checkedInAt?, checkedOutAt?, preRegisteredAt,
qrCode? (6-char), qrValidUntil?, badgeNumber?,
walkIn (boolean), notes?, idProofType?, idProofNumber?, wid
```

### Public registration link (My Link)

```
id, slug, wid, hostId, officeBranch, enabled,
designTheme, pageTitle, welcomeMessage, qrValidityPeriod,
field*Required / field*Enabled flags
```

### Visit purposes (enum)

`Meeting` | `Interview` | `Vendor` | `Delivery` | `Other`

### QR validity periods

`24h` | `7d` | `30d` | `90d`

---

## 6. Key User Flows

### Flow 1: Pre-register a guest (desk)

1. Visitors → Register Guest
2. Tab: Pre-register
3. Fill guest details (or Employee toggle + pick teammate)
4. Issue QR Pass
5. Show pass screen → share with guest

### Flow 2: Walk-in check-in

1. Register Guest → Walk-in tab
2. Fill details → Check In Now
3. Visitor created as CheckedIn with badge number
4. Optional: show pass

### Flow 3: Expected guest arrives (QR check-in)

1. Dashboard → Check In
2. Scan guest QR or enter passcode
3. Confirm details + optional ID proof
4. Check in → badge assigned, host notified (future: push)

### Flow 4: Guest leaves

1. Dashboard → Check Out
2. Scan or search by passcode/name
3. Confirm → status CheckedOut, `checkedOutAt` set

### Flow 5: Employee gate pass from Team Directory

1. Team → card ⋮ → Generate QR
2. Register Guest opens: Pre-register tab, Employee ON, fields prefilled
3. User reviews → Issue QR Pass

### Flow 6: Guest self-registers via My Link

1. Guest opens public URL (SMS/email/WhatsApp)
2. Fills form (optional Employee self-select)
3. Receives QR pass on success screen

### Flow 7: Admin exports audit

1. Reports → select period → Export Logs
2. Share Excel file

---

## 7. API Reference (existing web backend)

Base URL: configurable `EXPO_PUBLIC_API_URL` (e.g. `https://your-domain.com`)

All authenticated routes expect the same session/cookies as web **or** migrate to Bearer token from Supabase JWT (recommended for mobile).

### Auth

- Supabase: `signInWithPassword`, `signUp`, `signInWithOAuth`, `signOut`, `getSession`

### Profiles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profiles?wid={wid}` | All teammates |
| GET | `/api/profiles/{id}` | Single profile |
| POST | `/api/profiles` | Create teammate |
| PATCH | `/api/profiles/{id}` | Update teammate |
| DELETE | `/api/profiles/{id}` | Delete teammate |

### Visitors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/visitors?wid={wid}&status={optional}` | List visitors |
| POST | `/api/visitors` | Create (pre-register or walk-in) |
| PATCH | `/api/visitors/{id}/check-in` | Check in |
| PATCH | `/api/visitors/{id}/check-out` | Check out |

**POST /api/visitors body (example):**

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+91 98765 43210",
  "company": "Acme Corp",
  "purpose": "Meeting",
  "hostId": "uuid",
  "hostName": "Vikram Raj",
  "notes": "",
  "idProofType": "",
  "idProofNumber": "",
  "wid": 1,
  "walkIn": false,
  "qrValidityPeriod": "24h"
}
```

### Workspace

| Method | Endpoint |
|--------|----------|
| GET | `/api/workspace?wid={wid}` |
| GET | `/api/workspace/config?wid={wid}` |

### Registration links (My Link)

| Method | Endpoint |
|--------|----------|
| GET | `/api/registration-links?wid={wid}&hostId={id}` |
| POST | `/api/registration-links` |

### Public (no auth)

| Method | Endpoint |
|--------|----------|
| GET | `/api/public/register/{slug}` | Page config + employees list |
| POST | `/api/public/register/{slug}` | Submit guest registration |

---

## 8. React Native — Suggested Stack

| Concern | Recommendation |
|---------|----------------|
| Framework | Expo (SDK 52+) managed workflow |
| Navigation | Expo Router or React Navigation 7 |
| State | Zustand (mirror web patterns) + TanStack Query for API cache |
| Auth | `@supabase/supabase-js` + secure storage |
| Forms | React Hook Form + Zod |
| QR display | `react-native-qrcode-svg` |
| QR scan | `expo-camera` / `expo-barcode-scanner` or Vision Camera |
| Phone input | `react-native-phone-number-input` |
| Icons | `lucide-react-native` or `@expo/vector-icons` |
| Styling | NativeWind (Tailwind) to align with web design tokens |
| Toast | `react-native-toast-message` |
| Share pass | `expo-sharing` + `react-native-view-shot` |

### Project structure (suggested)

```
mobile/
  app/                    # Expo Router screens
    (auth)/
    (tabs)/
    modal/
  components/
    visitors/
    team/
    dashboard/
  lib/
    api.ts
    supabase.ts
    types.ts
  stores/
    visitor-store.ts
  constants/
    theme.ts
```

---

## 9. Mobile-Specific Requirements

### Must-have for v1

- [ ] Login + session persist
- [ ] Dashboard with Check In / Check Out
- [ ] QR scanner for check-in/out
- [ ] Visitors list (today + registered)
- [ ] Register Guest (pre-register + walk-in + employee toggle)
- [ ] Visitor pass display (QR + passcode)
- [ ] Team directory list + Generate QR → register prefill
- [ ] Pull-to-refresh on lists

### Should-have for v1

- [ ] Team add/edit wizard
- [ ] Reports view + export
- [ ] My Link settings (or WebView to web)
- [ ] Dark mode
- [ ] Haptic feedback on scan success

### Nice-to-have / v2

- [ ] Push notifications when guest checks in (host alert)
- [ ] Offline queue for check-in when network returns
- [ ] Native public registration (no WebView)
- [ ] In-app Razorpay billing
- [ ] Multi-branch switcher in header

### Permissions

- **Camera** — QR scanning (explain in App Store copy)
- **Photo library** — save pass image (optional)

---

## 10. Status & Badge UI Rules

| Status | Color | Meaning |
|--------|-------|---------|
| Expected | Amber | Pre-registered, not yet arrived |
| CheckedIn | Emerald | Inside building |
| CheckedOut | Slate/gray | Visit completed |

| Registration | Indicator |
|--------------|-----------|
| Pre-registered | `walkIn: false` |
| Walk-in | `walkIn: true`, has `badgeNumber` |

---

## 11. Plan Gating (Free vs Pro)

| Feature | Free | Pro |
|---------|------|-----|
| Basic visitors log & QR | ✅ | ✅ |
| Up to 5 teammates | ✅ | Unlimited |
| 100 check-ins/month | ✅ | Unlimited |
| 1 branch | ✅ | Multiple |
| My Link public pages | ❌ | ✅ |
| Advanced reports export | Limited | ✅ |
| Custom badge / branding | ❌ | ✅ |

Show upgrade modal when user hits Pro-only screen (match web `ProFeatureGate`).

---

## 12. Copy & Microcopy (use consistently)

- **Register Guest** — not “Add Visitor”
- **Issue QR Pass** — pre-register submit
- **Check In Now** — walk-in submit
- **Pre-register (Expected)** / **Walk-in Entry (Check In)** — mode tabs
- **Employee (Optional)** — toggle label
- **ANSH VISITOR PASS** — pass card title
- **Passcode: {code}** — under QR
- **Present this QR at reception** — pass subtitle

---

## 13. Instructions for Cursor When Building

When the user says *“build the mobile app”* or attaches Stitch designs:

1. **Read this document first** for scope and behavior.
2. **Map each Stitch frame** to a screen ID from Section 4.
3. **Reuse API contracts** from Section 7 — do not invent new backend shapes unless discussed.
4. **Mirror web business rules** (employee toggle, Generate QR → register prefill, QR validity, walk-in vs pre-register).
5. **Prefer native** for scanner and pass display; WebView acceptable only for public register or billing in v1.
6. **Create `mobile/` as separate Expo app** in repo (or sibling repo) — do not break Next.js web app.
7. **Use TypeScript** and share types where possible (`types/visitor.ts` duplicated or shared package).
8. **Ask for Stitch assets** if a screen behavior is documented here but no design exists yet.

### Definition of done (MVP)

- Receptionist can check in an expected guest via QR on a real device
- Receptionist can register walk-in and pre-register guest
- Employee gate pass flow works from Team → Generate QR
- Visitor pass shows correct QR encoding the 6-char code
- Session persists across app restarts

---

## 14. Reference: Web App Source Map

When unsure about behavior, read these web files:

| Feature | Web location |
|---------|----------------|
| Navigation | `src/config/navigation.ts` |
| Visitor lists + register | `src/components/crm/visitor-log-list.tsx` |
| Register modal (global) | `src/components/crm/register-guest-dialog.tsx` |
| QR verify / scan | `src/components/crm/guest-verify-modal.tsx` |
| Team directory | `src/app/(app)/team/page.tsx` |
| My Link | `src/app/(app)/visitors/my-link/page.tsx` |
| Public register | `src/components/public/public-registration-form.tsx` |
| Dashboard | `src/app/(app)/dashboard/page.tsx` |
| Reports | `src/app/(app)/reports/page.tsx` |
| Data store patterns | `src/stores/visitor-store.ts` |
| Prisma schema | `prisma/schema.prisma` |

---

## 15. Document Changelog

| Date | Notes |
|------|-------|
| 2026-06-16 | Initial handoff for React Native + Stitch workflow |

---

*Attach Stitch PNG/Figma exports per screen when starting implementation. Cursor should implement screen-by-screen following this spec.*
