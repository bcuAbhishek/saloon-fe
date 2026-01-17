"use client";

import { useAppForm } from "@/components/form/hooks";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/modules/auth/mutation";
import { userRegisterSchema } from "@/modules/auth/schema";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Extended schema to include confirmation and check
const registerFormSchema = userRegisterSchema.extend({
  confirmPassword: z.string(),
  dob: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const registerMutation = useRegisterMutation();
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      agreeToTerms: false,
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }: { value: any }) => {
      // Remove local-only fields before sending to API
      const { confirmPassword, dob, agreeToTerms, ...apiData } = value;
      await registerMutation.mutateAsync(apiData);
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center px-6 py-8 relative">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute left-4"
        >
          <MoveLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="w-full text-center text-2xl font-bold text-gray-900">Registration</h1>
      </header>

      <main className="flex-1 px-6 pt-4 pb-12 w-full max-w-md mx-auto space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">Create your account</h2>
        </div>

        <form
          className={cn("flex flex-col gap-6")}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-5">
            <div className="space-y-4">
              <form.AppField name="fullName">
                {(field: any) => (
                  <field.Input
                    label=""
                    placeholder="Full Name"
                    className="h-14 rounded-xl border-gray-200 bg-[#f3f0f1]/50 px-5 text-base focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d]"
                  />
                )}
              </form.AppField>

              <form.AppField name="email">
                {(field: any) => (
                  <field.Input
                    label=""
                    placeholder="Email or Phone Number"
                    type="email"
                    className="h-14 rounded-xl border-gray-200 bg-[#f3f0f1]/50 px-5 text-base focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d]"
                  />
                )}
              </form.AppField>

              <form.AppField name="password">
                {(field: any) => (
                  <field.PasswordInput
                    label=""
                    placeholder="Password"
                    className="h-14 rounded-xl border-gray-200 bg-[#f3f0f1]/50 px-5 text-base focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d]"
                  />
                )}
              </form.AppField>

              <form.AppField name="confirmPassword">
                {(field: any) => (
                  <field.PasswordInput
                    label=""
                    placeholder="Confirm Password"
                    className="h-14 rounded-xl border-gray-200 bg-[#f3f0f1]/50 px-5 text-base focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d]"
                  />
                )}
              </form.AppField>

              <form.AppField name="dob">
                {(field: any) => (
                  <field.Input
                    label=""
                    placeholder="Date of Birth (Optional)"
                    className="h-14 rounded-xl border-gray-200 bg-[#f3f0f1]/50 px-5 text-base focus-visible:ring-[#e21b4d]/20 focus-visible:border-[#e21b4d]"
                  />
                )}
              </form.AppField>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <form.AppField name="agreeToTerms">
                {(field: any) => (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="w-6 h-6 rounded border-gray-300 text-[#e21b4d] focus:ring-[#e21b4d]"
                    />
                    <label 
                      htmlFor="agreeToTerms" 
                      className="text-gray-800 text-lg"
                    >
                      I agree to Terms & Cancellation Policy
                    </label>
                  </div>
                )}
              </form.AppField>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-xl font-bold rounded-xl mt-4"
              variant="brand"
              disabled={registerMutation.isPending}
              isLoading={registerMutation.isPending}
            >
              Register
            </Button>
          </FieldGroup>
        </form>
      </main>
    </div>
  );
}

