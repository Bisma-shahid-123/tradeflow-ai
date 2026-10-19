"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import MfaSetup from "../../../components/MfaSetup";

export default function SetupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkMfa() {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.currentLevel === "aal2") {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    }
    checkMfa();
  }, [router, supabase]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-600">{error}</p>;

  return <MfaSetup />;
}
