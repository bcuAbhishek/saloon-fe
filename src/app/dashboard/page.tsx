'use client'

import { useGetProfileQuery } from "@/modules/auth/queries";
import { useLogoutMutation } from "@/modules/auth/mutation";
import { Button } from "@/components/ui/button";

export default function Page() {
    const { user } = useGetProfileQuery();
    const logoutMutation = useLogoutMutation();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>
                {JSON.stringify(user)}
            </p>
            <Button
                onClick={() => logoutMutation.mutate()}
            >
                Logout
            </Button>
        </div>
    );
}