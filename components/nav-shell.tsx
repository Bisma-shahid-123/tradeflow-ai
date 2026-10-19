"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ShoppingBag,
  Truck,
  BookOpen,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "../lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const supabase = createClient();


const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders/new", label: "New Order", icon: PlusCircle },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dispatch", label: "Dispatch", icon: Truck },
  { href: "/khata", label: "Khata", icon: BookOpen },
];

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
    router.refresh();
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64">
      {/* Sidebar for md+ */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r bg-card p-4 md:flex">
        <Link
          href="/dashboard"
          className="mb-6 text-xl font-bold tracking-tight"
        >
          TradeFlow AI
        </Link>
        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
        <Button variant="ghost" className="justify-start gap-2" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </aside>

      {/* Top bar for md+ branding */}
      <header className="sticky top-0 z-10 hidden items-center justify-between border-b bg-background/95 px-6 py-4 backdrop-blur md:flex md:pl-72">
        <h1 className="text-lg font-semibold">TradeFlow AI</h1>
      </header>

      <main className="p-4 md:p-6 md:pt-4">{children}</main>

      {/* Bottom nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card px-2 pt-2 md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <MobileNavLink key={item.href} item={item} pathname={pathname} />
          ))}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function NavLink({
  item,
  pathname,
}: {
  item: { href: string; label: string; icon: React.ElementType };
  pathname: string;
}) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  );
}

function MobileNavLink({
  item,
  pathname,
}: {
  item: { href: string; label: string; icon: React.ElementType };
  pathname: string;
}) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-col items-center gap-1 p-2 text-xs",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  );
}
