'use client'

import { getUserProfileQuery } from "@/modules/auth/queries";

export default function Page() {

  const {user, isLoading, isError}  = getUserProfileQuery()

  console.log(`USER PROFILE : ${JSON.stringify(user)}, isLoading: ${isLoading}, isError: ${isError}`)
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading user profile. Maybe you have not logged in yet.</p>}
      {user && (
        <div>
          <h1>Welcome, {user.fullName}!</h1>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}