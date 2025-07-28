"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthContext";
import LoadingPage from "@/components/loading/LoadingPage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loadingSession } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loadingSession && session === null) {
      router.push("/login");
    } else if (!loadingSession && session) {
      setLoading(false);
    }
  }, [session, loadingSession]);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
}
