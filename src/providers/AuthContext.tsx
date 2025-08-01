import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import type { Session, AuthResponse } from "@supabase/supabase-js";

type AuthResult =
  | { success: true; data: AuthResponse["data"] }
  | { success: false; error: AuthResponse["error"] };

type AuthContextType = {
  session: Session | null;
  signUpNewUser: (email: string, password: string) => Promise<AuthResult>;
  signInUser: (email: string, password: string) => Promise<AuthResult>;
  logOutUser: () => Promise<void>;
  loadingSession: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const signUpNewUser = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("There was an error with sign up", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  const signInUser = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("There was an error with sign in", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  const logOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed", error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoadingSession(false);
    };

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event); // helpful for debugging
        setSession(session);
      }
    );

    getSession();

    return () => subscription.subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, logOutUser, loadingSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext undefined");
  }
  return context;
};

export { useAuthContext, AuthProvider };
