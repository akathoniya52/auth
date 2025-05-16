import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function Home() {
  const session = await getSession()
  // const { data: session, status } = useSession();

  // Check if session exists
  if (session === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in</div>;
  }

  const accessToken = session?.accessToken;

  console.log("Access Token:", session);

  return (
    <div>
      <h1>Welcome</h1>
      <p>Access Token: {accessToken}</p>
    </div>
  );
}
