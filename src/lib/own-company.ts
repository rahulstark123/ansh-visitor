/** Case-insensitive match when visitor company equals workspace name. */
export function isOwnCompany(
  company: string | undefined | null,
  workspaceName: string | undefined | null
): boolean {
  const a = company?.trim().toLowerCase();
  const b = workspaceName?.trim().toLowerCase();
  if (!a || !b) return false;
  return a === b;
}
