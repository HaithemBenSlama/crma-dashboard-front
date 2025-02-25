import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent, type ChangeEvent, useState, useEffect } from "react";
import { AlertDestructive } from "./alert-destructive";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    setIsBlocked(loginAttempts > 2);
  }, [loginAttempts]);

  const handleBlockEnd = () => {
    setIsBlocked(false);
    setLoginAttempts(0);
  };

  const validateEmail = (value: string): string => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return "Password is required";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isBlocked) return;

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (!emailValidation && !passwordValidation) {
      setIsLoading(true);
      try {
        // Replace this with your actual login API call
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        // Reset attempts on successful login
        setLoginAttempts(0);
        // Handle successful login (e.g., redirect)
      } catch (error) {
        // Increment failed attempts
        setLoginAttempts((prev) => prev + 1);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  return (
    <div className="space-y-4">
      {loginAttempts > 0 && (
        <AlertDestructive
          attempts={loginAttempts}
          onBlockEnd={handleBlockEnd}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" error={!!emailError}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              disabled={isLoading || isBlocked}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" error={!!passwordError}>
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              disabled={isLoading || isBlocked}
              required
            />
            <a
              href="/reset"
              className="ml-auto text-sm underline-offset-4 hover:underline text-zinc-500"
            >
              Forgot your password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isBlocked}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
