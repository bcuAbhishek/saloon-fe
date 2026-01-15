"use client";

import { useAppForm } from "@/components/form/hooks";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/modules/auth/mutation";
import { userLoginSchema } from "@/modules/auth/schema";

export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: userLoginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <form
          className={cn("flex flex-col gap-6")}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>

            <form.AppField name="email">
              {(field) => (
                <field.Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                />
              )}
            </form.AppField>

            <Button
              type="submit"
              className="w-full"
              variant="primary"
              disabled={loginMutation.isPending}
              isLoading={loginMutation.isPending}
            >
              Login
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
