"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { MfaVerify } from "@/components/MfaVerify";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "verify" | "redirect">(
    "loading"
  );

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/sign-in");
        return;
      }

      const { data: aal } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aal?.currentLevel === "aal2") {
        router.push("/dashboard");
        return;
      }

      setStatus("verify");
    }

    check();
  }, [router]);

  if (status === "loading") {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Loading…
        </CardContent>
      </Card>
    );
  }

  return <MfaVerify />;
}
