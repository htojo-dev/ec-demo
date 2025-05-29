import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // console.log(process.env.WP_SITE_URL)
  const body = await req.json();
  // console.log(body);
  const {username, password} = body;
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.WP_SITE_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username,password}),
  })

  const data = await res.json();

  if(!res.ok) {
    return new NextResponse(JSON.stringify({message: "Login failed", error: data}), {
      status: 401,
    })
  }

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return new NextResponse(JSON.stringify({message: "Login successful"}), {
    status: 200,
  })

}