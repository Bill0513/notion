"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        your Ideas, Documents, & Plans. Unified. Welcome to
        <span className="underline cursor-pointer ml-2">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens
      </h3>
      {/* loading动画 */}
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg"></Spinner>
        </div>
      )}
      {/* 未登录 */}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button size="sm">
              Get Jotion Free <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
            </Button>
          </SignInButton>
        </>
      )}
      {/* 已登录 */}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/document">
            Enter Jotion <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Link>
        </Button>
      )}
    </div>
  );
};
