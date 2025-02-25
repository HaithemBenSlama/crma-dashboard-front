import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { type FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OtpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const validateOtp = (value: string): string => {
    if (!value || value.length !== 6 || !/^[0-9]{6}$/.test(value)) {
      return "Please enter a valid 6-digit OTP";
    }
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValidation = validateOtp(otp);
    setOtpError(otpValidation);

    if (!otpValidation && email) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
          setSuccessMessage("OTP verified successfully!");
          setOtp("");
          setOtpError("");
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error: any) {
        setOtpError(error.message || "Invalid OTP");
      } finally {
        setIsLoading(false);
      }
    }
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
        <div className="flex flex-col items-center gap-2 text-center pb-5">
          <h1 className="text-2xl font-bold">Verify Your OTP</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <div className="grid gap-6">
          <div className=" gap-2 flex flex-col items-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className={otpError ? "border-red-600" : ""}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {otpError && <p className="text-red-600 text-sm">{otpError}</p>}
            <a
              href=""
              className="ml-auto text-sm underline-offset-4 hover:underline text-zinc-950"
            >
              Resend OTP ?
            </a>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
}
