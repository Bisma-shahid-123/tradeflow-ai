import { ReactNode } from "react";

// This file is the layout for all /auth/* routes

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        {children}
      </body>
    </html>
  );
}

