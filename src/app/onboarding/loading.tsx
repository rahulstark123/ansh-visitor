import { AuthFormSkeleton } from "@/components/ui/page-skeletons";

export default function OnboardingLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070809] px-6">
      <AuthFormSkeleton />
    </div>
  );
}
