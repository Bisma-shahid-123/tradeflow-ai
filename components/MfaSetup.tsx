"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

const supabase = createClient();
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MfaEnrollResponse {
  id: string;
  type: "totp";
  totp: {
    uri: string;
    secret: string;
    qr_code: string;
  };
}

export default function MfaSetup() {
  const router = useRouter();
  const [factor, setFactor] = useState<MfaEnrollResponse | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startEnroll() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "TradeFlow AI",
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setFactor(data as MfaEnrollResponse);
    setLoading(false);
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!factor) return;
    setLoading(true);
    setError(null);

    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId: factor.id });

    if (challengeError) {
      setError(challengeError.message);
      setLoading(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: factor.id,
      challengeId: challenge.id,
      code: code.replace(/\s/g, ""),
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (!factor) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Set up 2FA</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account with an authenticator
            app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button onClick={startEnroll} disabled={loading} className="w-full">
            {loading ? "Preparing QR code" : "Show QR code"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan the QR code</CardTitle>
        <CardDescription>
          Open your authenticator app, scan the code, then enter the 6-digit
          code below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <div
          className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-md border bg-white p-2"
          // Supabase returns a trusted SVG QR code.
          dangerouslySetInnerHTML={{ __html: factor.totp.qr_code }}
        />
        <form onSubmit={verify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">6-digit code</Label>
            <Input
              id="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying" : "Verify and continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
