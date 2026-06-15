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
