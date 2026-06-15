INSERT INTO "Workspace" (id, name, plan) VALUES (1, 'Ansh Visitor', 'free') ON CONFLICT (id) DO NOTHING;
INSERT INTO "WorkspaceConfig" (wid, "updatedAt") VALUES (1, NOW()) ON CONFLICT (wid) DO NOTHING;
