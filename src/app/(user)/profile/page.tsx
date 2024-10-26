import { redirect } from "next/navigation";
import ProfileView from "./container/profile-view";
import Logout from "./container/logout";
import { cookies } from "next/headers";

export default async function Profile() {
  const userRequest = await fetch("http://localhost:3000/api/auth", {
    headers: { Cookie: cookies().toString() },
    cache: "no-store",
  });
  const userResponse: { user: TUser } = await userRequest.json();

  // If a request throws error, we just redirect to login page
  if (!userRequest.ok) {
    redirect("/auth/login");
  }

  return (
    <main>
      <ProfileView user={userResponse.user} />
      <Logout />
    </main>
  );
}
