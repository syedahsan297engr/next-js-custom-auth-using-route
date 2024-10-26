"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//If you want to login as a normal user, set false value for the isAdmin
const dummyUserData = {
  user: { name: "blue daddy", email: "bluedady@gmail.com", isAdmin: true },
  token: "12345",
};

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!password) {
      alert("Password is required.");
      return;
    }

    // Let check email and password
    if (email !== "bluedady@gmail.com" || password !== "12345678") {
      alert("Invalid credential");
      return;
    }

    // USE YOUR BACKEND API TO AUTHENTICATE YOUR USER CREDENTIAL AND SEND USER DATA AS WELL AS TOKEN

    // Let set user data
    const request = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(dummyUserData),
    });

    const response = await request.json();

    if (!request.ok) {
      alert(
        response?.message || "Something went wrong, please try again later."
      );

      return;
    }

    alert(response?.message || "Login successful.");
    router.push("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
      <h1 className="text-[22px] font-medium text-center">Login</h1>

      <div className="mt-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-1 mt-1 w-full border outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-2 py-1 mt-1 w-full border outline-none"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="px-5 py-2 rounded-3xl font-medium text-white bg-black"
        >
          Login
        </button>
      </div>

      <div className="mt-6 text-[14px] text-gray-700">
        <p className="font-bold">Hint</p>
        <p>email: bluedady@gmail.com</p>
        <p>password: 12345678</p>
      </div>
    </form>
  );
}
