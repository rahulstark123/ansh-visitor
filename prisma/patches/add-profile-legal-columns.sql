-- Run once on existing Supabase databases where Profile legal columns are missing.
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "acceptedTerms" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "acceptedPrivacy" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "consentAt" TIMESTAMP(3);
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "termsVersion" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "privacyVersion" TEXT;
