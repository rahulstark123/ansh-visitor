ALTER TABLE "Subscription" ADD COLUMN IF NOT EXISTS "billingCycle" TEXT NOT NULL DEFAULT 'monthly';
