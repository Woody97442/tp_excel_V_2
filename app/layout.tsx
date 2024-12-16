import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavAside from "@/components/Layout/nav-aside";
import NavHeader from "@/components/Layout/nav-header";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { SessionProvider } from "next-auth/react";
import UserContextProvider from "@/components/context/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tp Excel V 2",
  description: "Exercice de mise en pratique Excel V 2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const user = session?.user?.id
    ? await getUserById(session.user.id as string)
    : null;

  return (
    <html lang="fr">
      <body className={inter.className + " bg-[#f5f5f5] dark:bg-gray-900"}>
        <SessionProvider session={session}>
          <UserContextProvider user={user}>
            <div className="flex min-h-screen w-full flex-col bg-muted/40 dark:bg-gray-800">
              <NavAside />
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-40">
                <NavHeader />
                {children}
              </div>
            </div>
          </UserContextProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
