import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDestructiveProps {
  attempts: number;
  maxAttempts?: number;
  blockDuration?: number; // in minutes
  onBlockEnd?: () => void;
}

export function AlertDestructive({
  attempts,
  maxAttempts = 3,
  blockDuration = 0.5,
  onBlockEnd,
}: AlertDestructiveProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const isBlocked = attempts >= maxAttempts;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isBlocked) {
      setTimeRemaining(blockDuration * 60); // Convert minutes to seconds

      intervalId = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (intervalId) {
              clearInterval(intervalId);
            }
            onBlockEnd?.(); // Call the callback when block ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isBlocked, blockDuration, onBlockEnd]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!attempts) return null;

  return (
    <Alert variant="destructive" className="flex items-start gap-3">
      <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-gray-600" />
      <div>
        <AlertTitle className="font-semibold text-gray-600">
          {isBlocked ? "Account Blocked" : "Login Failed"}
        </AlertTitle>
        <AlertDescription>
          {isBlocked ? (
            <>
              Your account has been temporarily blocked due to many failed
              attempts.
              {timeRemaining > 0 && (
                <p className="mt-1 font-semibold">
                  Please try again in {formatTime(timeRemaining)}
                </p>
              )}
            </>
          ) : (
            <>
              Invalid credentials. You have{" "}
              <b>{maxAttempts - attempts} attempts </b>
              remaining before your account is temporarily blocked.
            </>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
}
