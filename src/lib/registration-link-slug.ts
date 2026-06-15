import { prisma } from "@/lib/prisma";

export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildSlugBase(companyName: string, branchName: string): string {
  const parts = [companyName, branchName]
    .map((part) => slugifyText(part))
    .filter(Boolean);

  return parts.join("-") || "visitor-link";
}

export async function generateUniqueSlug(
  base: string,
  excludeId?: string
): Promise<string> {
  let slug = slugifyText(base) || "visitor-link";
  let candidate = slug;
  let counter = 0;

  while (true) {
    const existing = await prisma.publicRegistrationLink.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;

    counter += 1;
    candidate = `${slug}-${counter}`;
  }
}

export function normalizeCustomSlug(slug: string): string {
  return slugifyText(slug);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 3;
}
