import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh max-h-svh overflow-hidden lg:grid-cols-[1.75fr_1.25fr]">
      <div className="relative hidden lg:block bg-[#5980ff]">
        <img
          className="absolute inset-0 h-full opacity-60 w-full object-cover dark:brightness-[0.2] dark:grayscale"
          src="/images/Login_Page_Image.png"
          alt="Login Background"
        />
      </div>
      <div className="flex flex-col h-svh">
        {/* Logo Section - Fixed Height */}
        <div className="flex justify-center pt-16 pb-4">
          <a
            href="#"
            className="w-[248px] pl-[8.53px] justify-end items-start gap-[25.69px] inline-flex overflow-hidden"
          >
            <img src="/images/logo.svg" alt="MachinesTalk Logo" />
          </a>
        </div>

        {/* Form Section - Flexible Height with Overflow Control */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-10 overflow-hidden">
          <div className="w-full max-w-xs py-4">
            <LoginForm />
          </div>
        </div>

        {/* Footer Section - Fixed Height */}
        <div className="p-6 md:pb-8">
          <p className="text-center max-w-[350px] leading-tight font-normal text-sm text-zinc-500 mx-auto">
            By clicking Sign in, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
