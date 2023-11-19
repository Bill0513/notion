"use client";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo></Logo>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/* loading动画 */}
        {isLoading && <Spinner></Spinner>}
        {/* 未登录 */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Jotion Free</Button>
            </SignInButton>
          </>
        )}
        {/* 已登录 */}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/document">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};
