"use client";

import { useAppForm } from "@/components/form/hooks";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/modules/auth/mutation";
import { userLoginSchema } from "@/modules/auth/schema";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: userLoginSchema,
    },
    onSubmit: async ({ value }: { value: any }) => {
      await loginMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center px-6 py-6 relative">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute left-4"
        >
          <MoveLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="w-full text-center text-2xl font-bold text-gray-900">Login</h1>
      </header>

      <main className="flex-1 px-6 pt-4 pb-12 w-full max-w-md mx-auto">
        <form
          className={cn("flex flex-col gap-6")}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-4">
            <div className="space-y-2">
              <form.AppField name="email">
                {(field: any) => (
                  <div className="relative">
                    <field.Input
                      label=""
                      placeholder="Email or Phone"
                      type="email"
                      className="h-14 rounded-xl border-[#e21b4d] bg-[#e21b4d]/10 px-5 text-base text-[#e21b4d] focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d] placeholder:text-[#e21b4d]/70"
                    />
                  </div>
                )}
              </form.AppField>

              <form.AppField name="password">
                {(field: any) => (
                  <div className="relative">
                    <field.PasswordInput
                      label=""
                      placeholder="Password"
                      className="h-14 rounded-xl border-[#e21b4d] bg-[#e21b4d]/10 px-5 text-base text-[#e21b4d] focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d] placeholder:text-[#e21b4d]/70"
                    />
                  </div>
                )}
              </form.AppField>
            </div>

            <div className="flex justify-center -mt-2">
              <Link 
                href="/forgot-password" 
                className="text-[#a46071] font-medium hover:underline text-base"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold rounded-xl"
              variant="brand"
              disabled={loginMutation.isPending}
              isLoading={loginMutation.isPending}
            >
              Login
            </Button>
          </FieldGroup>
        </form>

        <div className="mt-12 space-y-4">
          <div className="relative flex items-center justify-center">
            <span className="text-[#a46071] text-base relative z-10 bg-white px-4 italic">
              Or login with
            </span>
          </div>

          <div className="space-y-2">
            <Button 
              variant="secondary" 
              className="w-full h-14 rounded-xl text-lg flex items-center justify-center gap-3 bg-[#f3f0f1]"
              onClick={() => {}}
            >
              Google
            </Button>
            <Button 
              variant="secondary" 
              className="w-full h-14 rounded-xl text-lg flex items-center justify-center gap-3 bg-[#f3f0f1]"
              onClick={() => {}}
            >
              Facebook
            </Button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-[#a46071] text-lg">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#a46071] font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
