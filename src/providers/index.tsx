"use client";

import { AuthProvider } from "./AuthContext";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
