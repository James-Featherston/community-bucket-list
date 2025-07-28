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
import { TypographyP } from "../typography/p";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { signInUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const result = await signInUser(values.email, values.password);
      if (result.success) {
        router.push("/");
      } else {
        form.setError("password", {
          type: "manual",
          message: result.error?.message,
        });
        console.log(result.error?.message);
      }
    } catch (error) {
      form.setError("email", {
        type: "manual",
        message: "Unexpected error occurred. Please try again.",
      });
    } finally {
      setFormError(null);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-100 border rounded-lg p-6 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TypographyH3 className="text-center">Login Today!</TypographyH3>
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
          Login
        </Button>
        <Button asChild variant="link" className="px-0 text-sm">
          <Link href="/signup">Don't have an account? Signup</Link>
        </Button>
        {formError && <TypographyP>{formError}</TypographyP>}
      </form>
    </Form>
  );
};

export default LoginForm;
