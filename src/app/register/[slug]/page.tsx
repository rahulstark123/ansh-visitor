import PublicRegisterPage from "@/components/public/public-register-page";

export default async function RegisterSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicRegisterPage slug={slug} />;
}
