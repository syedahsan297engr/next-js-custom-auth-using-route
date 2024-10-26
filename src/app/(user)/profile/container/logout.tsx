"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleClick = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/");
    router.refresh(); // Do not forget to refetch the router.
  };

  return (
    <section className="mt-8">
      <button
        onClick={handleClick}
        className="px-5 py-2 rounded-3xl font-medium text-white bg-red-500"
      >
        Logout
      </button>
    </section>
  );
}
