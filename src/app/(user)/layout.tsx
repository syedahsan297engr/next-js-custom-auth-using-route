import Link from "next/link";

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="py-4 sticky top-0 z-20 text-white bg-orange-700">
        <div className="max-w-[1240px] mx-auto flex justify-between">
          <Link href="/" className="font-medium">
            Bluedady
          </Link>

          <div className="flex items-center gap-x-3">
            <Link href="/admin" className="font-medium">
              Admin
            </Link>
            <Link href="/profile" className="font-medium">
              Profile
            </Link>
          </div>
        </div>
      </header>
      <div className="max-w-[1240px] mx-auto py-4 min-h-[calc(100dvh-50px)]">
        {children}
      </div>

      <footer className="p3-4 bg-gray-100">
        <div className="max-w-[1240px] mx-auto">
          <h1>Footer section</h1>
        </div>
      </footer>
    </div>
  );
}
