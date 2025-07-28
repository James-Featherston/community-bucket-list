import { AuthRedirect } from "@/components/auth/AuthRedirect";
import SignUpForm from "@/components/auth/SignUpForm";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthRedirect>
        <SignUpForm />
      </AuthRedirect>
    </div>
  );
};

export default page;
