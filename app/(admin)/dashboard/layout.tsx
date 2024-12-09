import { auth } from "@/auth";
import AdminContextProvider from "@/components/context/admin-context";
import LoaderCustom from "@/components/utils/loader";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return <LoaderCustom />;

  if (session.user.role !== "ADMIN" && session.user.role !== "USER") {
    redirect("/");
  }

  return <AdminContextProvider>{children}</AdminContextProvider>;
}
