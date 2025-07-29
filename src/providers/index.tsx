"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "./AuthContext";
import { useState, useEffect } from "react";
import NavBar from "@/components/navigation/NavBar";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  const hideNavbar = ["/login", "/signup"].includes(pathname);
  return (
    <AuthProvider>
      {!hideNavbar && <div className="h-16" />}
      {!hideNavbar && <NavBar />}
      {children}
    </AuthProvider>
  );
};

export default AppProviders;
