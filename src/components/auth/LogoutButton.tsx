"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const { logOutUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onLogout = async () => {
    try {
      setLoading(true);
      await logOutUser();
      router.push("/login");
    } catch (error) {
      console.error("Logout Failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
