import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeFlow AI",
  description: "The conversational operating system for social-commerce merchants",
};

import { ReactNode } from "react";
import { NavShell } from "@/components/nav-shell";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./globals.css";

export const metadata = {
  title: "TradeFlow AI",
  description: "The conversational operating system for social-commerce merchants",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createBrowserSupabaseClient();

  return (
    <html lang="en">
      <body className="min-h-screen">
        <SessionContextProvider supabaseClient={supabase}>
          <NavShell>{children}</NavShell>
        </SessionContextProvider>
      </body>
    </html>
  );
}

