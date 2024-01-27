import { getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email !== process.env.ADMIN_EMAIL &&
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new Error("Invalid email or password");
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  const serialized = serialize("user-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  console.log("Logged succesfully");

  return new Response(JSON.stringify("Authenticated!"), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
