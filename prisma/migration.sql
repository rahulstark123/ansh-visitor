-- ============================================================
-- Ansh Visitor — Supabase Database Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceConfig" (
    "id" SERIAL NOT NULL,
    "wid" INTEGER NOT NULL,
    "departments" TEXT[] DEFAULT ARRAY['Engineering', 'HR & Operations', 'Product Management', 'Enterprise Sales']::TEXT[],
    "designations" TEXT[] DEFAULT ARRAY['Software Engineer', 'Senior Developer', 'Product Manager', 'HR Manager', 'Operations Admin', 'Sales Director']::TEXT[],
    "officeBranches" TEXT[] DEFAULT ARRAY['HQ - Bangalore', 'Delhi Branch', 'Mumbai Office']::TEXT[],
    "workLocations" TEXT[] DEFAULT ARRAY['Remote', 'On-site', 'Hybrid']::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Employee',
    "department" TEXT NOT NULL DEFAULT 'General',
    "designation" TEXT,
    "officeBranch" TEXT,
    "workLocation" TEXT,
    "avatarInitials" TEXT NOT NULL DEFAULT 'EE',
    "status" TEXT NOT NULL DEFAULT 'Active',
    "phoneNumber" TEXT,
    "personalEmail" TEXT,
    "bloodGroup" TEXT,
    "dob" TEXT,
    "code" TEXT,
    "joiningDate" TEXT,
    "reportingManager" TEXT,
    "reportingHR" TEXT,
    "emergencyName" TEXT,
    "emergencyPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wid" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Expected',
    "hostId" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3),
    "checkedOutAt" TIMESTAMP(3),
    "preRegisteredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idProofType" TEXT,
    "idProofNumber" TEXT,
    "badgeNumber" TEXT,
    "qrCode" TEXT,
    "notes" TEXT,
    "wid" INTEGER NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceConfig_wid_key" ON "WorkspaceConfig"("wid");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE INDEX "Profile_wid_idx" ON "Profile"("wid");

-- CreateIndex
CREATE INDEX "Profile_email_idx" ON "Profile"("email");

-- CreateIndex
CREATE INDEX "Visitor_wid_idx" ON "Visitor"("wid");

-- CreateIndex
CREATE INDEX "Visitor_hostId_idx" ON "Visitor"("hostId");

-- CreateIndex
CREATE INDEX "Visitor_status_idx" ON "Visitor"("status");

-- CreateIndex
CREATE INDEX "Visitor_wid_status_idx" ON "Visitor"("wid", "status");

-- CreateIndex
CREATE INDEX "Visitor_preRegisteredAt_idx" ON "Visitor"("preRegisteredAt");

-- AddForeignKey
ALTER TABLE "WorkspaceConfig" ADD CONSTRAINT "WorkspaceConfig_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Seed initial workspace ──────────────────────────────────
INSERT INTO "Workspace" ("id", "name", "plan") VALUES (1, 'Ansh Visitor', 'free')
  ON CONFLICT ("id") DO NOTHING;

INSERT INTO "WorkspaceConfig" ("wid", "updatedAt") VALUES (1, CURRENT_TIMESTAMP)
  ON CONFLICT ("wid") DO NOTHING;

-- ── Public registration links ────────────────────────────────
CREATE TABLE "PublicRegistrationLink" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "wid" INTEGER NOT NULL,
    "hostId" TEXT NOT NULL,
    "officeBranch" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "designTheme" TEXT NOT NULL DEFAULT 'classic',
    "pageTitle" TEXT,
    "welcomeMessage" TEXT,
    "qrValidityPeriod" TEXT NOT NULL DEFAULT '24h',
    "fieldNameRequired" BOOLEAN NOT NULL DEFAULT true,
    "fieldPhoneRequired" BOOLEAN NOT NULL DEFAULT false,
    "fieldEmailRequired" BOOLEAN NOT NULL DEFAULT false,
    "fieldPurposeRequired" BOOLEAN NOT NULL DEFAULT false,
    "fieldIdProofRequired" BOOLEAN NOT NULL DEFAULT false,
    "fieldCompanyEnabled" BOOLEAN NOT NULL DEFAULT true,
    "fieldCompanyRequired" BOOLEAN NOT NULL DEFAULT false,
    "fieldNotesEnabled" BOOLEAN NOT NULL DEFAULT true,
    "fieldNotesRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicRegistrationLink_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PublicRegistrationLink_slug_key" ON "PublicRegistrationLink"("slug");
CREATE UNIQUE INDEX "PublicRegistrationLink_wid_hostId_key" ON "PublicRegistrationLink"("wid", "hostId");
CREATE INDEX "PublicRegistrationLink_wid_idx" ON "PublicRegistrationLink"("wid");
CREATE INDEX "PublicRegistrationLink_hostId_idx" ON "PublicRegistrationLink"("hostId");

ALTER TABLE "PublicRegistrationLink" ADD CONSTRAINT "PublicRegistrationLink_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicRegistrationLink" ADD CONSTRAINT "PublicRegistrationLink_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Billing: Subscription & Transaction tables ───────────────
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "wid" INTEGER NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'pro',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "wid" INTEGER NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Transaction_razorpayOrderId_key" ON "Transaction"("razorpayOrderId");
CREATE UNIQUE INDEX "Transaction_razorpayPaymentId_key" ON "Transaction"("razorpayPaymentId");

CREATE INDEX "Subscription_wid_idx" ON "Subscription"("wid");
CREATE INDEX "Subscription_wid_status_idx" ON "Subscription"("wid", "status");
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

CREATE INDEX "Transaction_wid_idx" ON "Transaction"("wid");
CREATE INDEX "Transaction_subscriptionId_idx" ON "Transaction"("subscriptionId");
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");
CREATE INDEX "Transaction_wid_status_idx" ON "Transaction"("wid", "status");

ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_wid_fkey" FOREIGN KEY ("wid") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Legal consent tracking on profiles ─────────────────────────
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "acceptedTerms" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "acceptedPrivacy" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "consentAt" TIMESTAMP(3);
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "termsVersion" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "privacyVersion" TEXT;
