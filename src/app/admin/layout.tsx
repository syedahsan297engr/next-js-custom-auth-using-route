import Link from "next/link";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="py-4 text-white bg-orange-700">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <Link href="/admin">Bluedady</Link>

          <div className="flex gap-x-3">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/users">Users</Link>
            <Link href="/profile">Profile</Link>
          </div>
        </div>
      </header>
      <div className="max-w-[1240px] mx-auto py-4 min-h-[calc(100dvh-50px)]">
        {children}
      </div>

      <footer className="py-4 text-white bg-orange-700">
        <div className="max-w-[1240px] mx-auto">
          <h1>Footer section</h1>
        </div>
      </footer>
    </>
  );
}
