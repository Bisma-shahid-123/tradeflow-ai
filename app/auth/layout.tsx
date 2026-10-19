import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavShell } from "@/components/nav-shell";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/auth/sign-in");
  }

  return <NavShell>{children}</NavShell>;
}
