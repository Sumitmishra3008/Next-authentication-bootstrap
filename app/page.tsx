import Image from "next/image";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { Appbar } from "@/components/Appbar";
import { Session } from "next-auth";

async function getUser() {
  const session: Session | null = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("Session:", session);
  return session;
}

export default async function Home() {
  const session: Session | null = await getUser();
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <Appbar />
      <h1>{JSON.stringify(session)}</h1>
    </>
  );
}
