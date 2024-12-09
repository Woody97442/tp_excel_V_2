"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Si la session est présente, rediriger vers le dashboard
    if (status === "authenticated") {
      router.push("/dashboard"); // ou la route du dashboard
    } else {
      router.push("/auth/login");
    }
  }, [status, router]);

  return null;
}
