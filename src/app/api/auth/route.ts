import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Route for set user data:<base-url>/api/auth (method: post)
export async function POST(req: NextRequest) {
  const data = await req.json();

  // Data validation: You can use zod npm package to verify your data.
  if (!data.user) {
    return NextResponse.json(
      { message: "User data not found." },
      { status: 400 }
    );
  }

  if (!data.token.trim()) {
    return NextResponse.json({ message: "Token not found." }, { status: 400 });
  }

  // Now, let's set user and token in cookies
  try {
    const days = 24 * 60 * 60 * 1000 * 7; // automatically clear after 7 days

    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: Date.now() + days,
    });

    cookies().set({
      name: "user",
      value: JSON.stringify(data.user || {}),
      httpOnly: true,
      secure: true,
      sameSite: true,
      expires: Date.now() + days,
    });

    return NextResponse.json({ message: "Login successful." });
  } catch {
    return NextResponse.json(
      { message: "Internal serve error." },
      { status: 500 }
    );
  }
}

/*
Certainly! We use JSON.stringify to convert the user data object into a string before
storing it in cookies because cookies can only hold string data. To retrieve the object,
we use JSON.parse to convert the string back into an object. This approach ensures 
compatibility with the string-only nature of cookies while preserving the original object 
structure.
*/

// Route to get user data: <base-url>/auth (method get)
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const userInString: any = req.cookies.get("user")?.value;
    const user = JSON.parse(userInString);

    return NextResponse.json({ user, token });
  } catch {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

// Route to delete or clear all cookies (use for logout)
// route: <base-url>/api/auth (method delete)
export async function DELETE(_req: NextRequest) {
  cookies().delete("token");
  cookies().delete("user");

  return NextResponse.json({ message: "Logout successful." });
}

// https://stackoverflow.com/questions/76274546/next-js-does-not-send-cookies-with-fetch-request-even-though-credentials-are-inc
