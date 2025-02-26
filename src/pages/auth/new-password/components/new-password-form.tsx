// src/pages/new-password/components/new-password-form.tsx
import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent, type ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom"; // For token from URL

export function NewPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL (e.g., /new-password?token=abc123)

  const validatePassword = (value: string): string => {
    if (!value) {
      return "New password is required";
    }
    return "";
  };

  const validateConfirmPassword = (value: string, newPass: string): string => {
    if (!value) {
      return "Confirm password is required";
    }
    if (value !== newPass) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPasswordValidation = validatePassword(newPassword);
    const confirmPasswordValidation = validateConfirmPassword(
      confirmPassword,
      newPassword
    );

    setNewPasswordError(newPasswordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (!newPasswordValidation && !confirmPasswordValidation && token) {
      setIsLoading(true);
      try {
        // Simulate setting a new password with token (replace with your API call)
        const response = await fetch("/api/auth/new-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        });

        if (response.ok) {
          setSuccessMessage("Password successfully updated!");
          setNewPassword("");
          setConfirmPassword("");
          setNewPasswordError("");
          setConfirmPasswordError("");
          // Optionally, redirect to login or dashboard
        } else {
          throw new Error("Failed to update password");
        }
      } catch (error: any) {
        setNewPasswordError(error.message || "Failed to update password");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordError(validatePassword(value));
    setConfirmPasswordError(validateConfirmPassword(confirmPassword, value));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(value, newPassword));
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
          <h1 className="text-2xl font-bold">Set New Password</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="newPassword" error={!!newPasswordError}>
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={newPasswordError}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" error={!!confirmPasswordError}>
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
              disabled={isLoading}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save New Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
