import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { AuthRedirect } from "@/components/auth/AuthRedirect";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthRedirect>
        <LoginForm />
      </AuthRedirect>
    </div>
  );
};

export default LoginPage;
