import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent, type ChangeEvent, useState } from "react";

export function PasswordResetForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidation = validateEmail(email);

    setEmailError(emailValidation);

    if (!emailValidation) {
      setIsLoading(true);
      try {
        // Simulate sending a password reset link (replace with your API call)
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setSuccessMessage("Password reset link sent to your email!");
          setEmail("");
          setEmailError("");
        } else {
          throw new Error("Failed to send reset link");
        }
      } catch (error: any) {
        setEmailError(error.message || "Failed to send reset link");
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

  return (
    <div className="space-y-4">
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to reset your password
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
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
