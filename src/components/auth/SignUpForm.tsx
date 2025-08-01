"use client";

import React, { useState } from "react";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthFormField from "./AuthFormField";
import { Button } from "../ui/button";
import { useAuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { TypographyH3 } from "../typography/h3";
import Link from "next/link";

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const { signUpNewUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: SignupFormValues) => {
    try {
      setLoading(true);
      const result = await signUpNewUser(values.email, values.password);
      if (result.success) {
        router.push("/");
      } else {
        form.setError("email", {
          type: "manual",
          message: result.error?.message,
        });
      }
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="w-100 border rounded-lg p-6 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TypographyH3 className="text-center">Sign Up Today!</TypographyH3>
        <AuthFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="email@example.com"
        />
        <AuthFormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <Button
          variant="outline"
          disabled={loading}
          type="submit"
          className="mx-3 hover:cursor-pointer"
        >
          Signup
        </Button>
        <Button asChild variant="link" className="px-0 text-sm">
          <Link href="/login">Already have an account? Login</Link>
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
