"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthContext";

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { session, loadingSession } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loadingSession && session) {
      router.replace("/");
    }
  }, [session, loadingSession]);

  return <>{children}</>;
}
