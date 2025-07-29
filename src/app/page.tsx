import LogoutButton from "@/components/auth/LogoutButton";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <div>Welcome Home</div>
        <LogoutButton />
      </div>
    </ProtectedRoute>
  );
}
