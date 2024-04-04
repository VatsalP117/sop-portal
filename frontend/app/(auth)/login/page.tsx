import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-[90vh] w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="basis-1/2">
          <img src="https://illustrations.popsy.co/gray/studying.svg" />
        </div>
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center items-center justify-center">
            <Icons.logo className="mx-auto h-8 w-8" />
            <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
            {/* <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p> */}
          </div>
          <Button asChild className="flex flex-row justify-center items-center">
            <Link href="/student">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Sign in with Github
            </Link>
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
