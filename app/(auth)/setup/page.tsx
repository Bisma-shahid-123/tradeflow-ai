"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { MfaSetup } from "@/components/MfaSetup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SetupPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "setup" | "confirm" | "done">(
    "loading"
  );

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setStatus("confirm");
        return;
      }

      const { data: aal } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aal?.currentLevel === "aal2") {
        setStatus("done");
        router.push("/dashboard");
        return;
      }

      setStatus("setup");
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

  if (status === "confirm") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Confirm your email</CardTitle>
          <CardDescription>
            We sent you a confirmation link. Please click it, then sign in to
            finish setting up 2FA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => router.push("/auth/sign-in")}
          >
            Go to sign in
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <MfaSetup />;
}
