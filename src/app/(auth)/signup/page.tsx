"use client";

import { useAppForm } from "@/components/form/hooks";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/modules/auth/mutation";
import { userRegisterSchema } from "@/modules/auth/schema";

export default function SignupPage() {
  const registerMutation = useRegisterMutation();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    validators: {
      onSubmit: userRegisterSchema,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl space-y-8">
        <form
          className={cn("flex flex-col gap-6")}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Fill in your details to create an account
              </p>
            </div>

            <div className="space-y-4">
              <form.AppField name="email">
                {(field) => (
                  <field.Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                )}
              </form.AppField>

              <form.AppField name="fullName">
                {(field) => (
                  <field.Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                )}
              </form.AppField>

              <form.AppField name="password">
                {(field) => (
                  <field.PasswordInput
                    label="Password"
                    placeholder="Enter your password (min 8 characters)"
                  />
                )}
              </form.AppField>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="primary"
              disabled={registerMutation.isPending}
              isLoading={registerMutation.isPending}
            >
              Create Account
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
