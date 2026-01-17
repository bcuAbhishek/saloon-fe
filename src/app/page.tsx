'use client'

import { getUserProfileQuery } from "@/modules/auth/queries";

export default function Page() {

  const {user, isLoading, isError}  = getUserProfileQuery()

  console.log(`USER PROFILE : ${JSON.stringify(user)}, isLoading: ${isLoading}, isError: ${isError}`)
  return (
    <div>
   
    </div>
  );
}