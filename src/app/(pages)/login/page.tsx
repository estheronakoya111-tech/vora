"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

type AuthMode = "login" | "register" | "forgot";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setStatusMessage(`A password reset link has been sent to ${email}`);
    } else if (mode === "register") {
      setStatusMessage("Account created successfully! Welcome to VORA.");
    } else {
      setStatusMessage("Welcome back to VORA!");
    }
  };

  const handleGoogleAuth = () => {
    setStatusMessage("Google authentication initiated.");
  };

  return (
    <div className="min-h-screen w-full bg-cream flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Split Container */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden border border-onyx/15 bg-cream/70 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Side: Editorial Image & Dynamic Typography Overlay */}
        <div className="relative hidden lg:block lg:col-span-6 overflow-hidden min-h-[600px]">
          <Image
            src="/images/interior.jpg"
            alt="VORA Interior Dining Experience"
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            priority
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-onyx/20 to-transparent" />

          {/* Bottom Left Watermark Content */}
          <div className="absolute bottom-10 left-10 right-10 text-cream space-y-2">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-cream/70 block">
              VORA / CULINARY SANCTUARY
            </span>
            <h2 className="font-display text-4xl font-normal leading-tight">
              {mode === "login" && "A table worth returning to."}
              {mode === "register" && "Join our inner circle."}
              {mode === "forgot" && "Reclaim your access."}
            </h2>
          </div>
        </div>

        {/* Right Side: Dynamic Auth Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-8 bg-cream/90">
          
          {/* Form Header */}
          <div className="space-y-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-cherry block">
              {mode === "login" && "WELCOME BACK"}
              {mode === "register" && "CREATE ACCOUNT"}
              {mode === "forgot" && "PASSWORD RECOVERY"}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-normal text-onyx">
              {mode === "login" && "Good to see you again."}
              {mode === "register" && "Begin your journey."}
              {mode === "forgot" && "Reset your key."}
            </h1>
          </div>

          {/* Inline Status Feedback Banner */}
          {statusMessage && (
            <div className="p-4 rounded-xl border border-cherry/20 bg-cherry/10 text-cherry text-xs font-sans font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name Input (Only on Registration) */}
            {mode === "register" && (
              <div className="space-y-2">
                <label className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate block">
                  FULL NAME
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Esther Onakoya"
                  className="w-full border-b border-onyx/20 bg-transparent py-2.5 font-sans text-sm text-onyx placeholder:text-slate/40 focus:border-onyx focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate block">
                EMAIL ADDRESS
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border-b border-onyx/20 bg-transparent py-2.5 font-sans text-sm text-onyx placeholder:text-slate/40 focus:border-onyx focus:outline-none transition-colors"
              />
            </div>

            {/* Password Input (Hidden in Password Recovery Mode) */}
            {mode !== "forgot" && (
              <div className="space-y-2">
                <label className="font-sans text-[11px] font-bold uppercase tracking-widest text-slate block">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full border-b border-onyx/20 bg-transparent py-2.5 pr-10 font-sans text-sm text-onyx placeholder:text-slate/40 focus:border-onyx focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-slate hover:text-onyx transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Inline Forgot Password Link */}
            {mode === "login" && (
              <div className="flex justify-start pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setStatusMessage("");
                  }}
                  className="font-sans text-xs text-slate hover:text-onyx transition-colors underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full flex items-center justify-between rounded-xl bg-onyx px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest text-cream transition-transform active:scale-[0.98] shadow-md hover:bg-onyx/90"
            >
              <span>
                {mode === "login" && "SIGN IN"}
                {mode === "register" && "CREATE ACCOUNT"}
                {mode === "forgot" && "SEND RESET LINK"}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Social Auth Divider (Hidden in Recovery Mode) */}
          {mode !== "forgot" && (
            <>
              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-onyx/15" />
                <span className="absolute bg-cream px-4 font-sans text-[10px] font-bold uppercase tracking-widest text-slate/60">
                  OR
                </span>
              </div>

              {/* Static Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-onyx/20 bg-cream py-3.5 font-sans text-xs font-bold text-onyx transition-all hover:border-onyx/40 hover:bg-cream/50 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </>
          )}

          {/* Mode Switcher Toggle Links */}
          <div className="text-center font-sans text-xs text-slate space-y-1">
            {mode === "login" && (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setStatusMessage("");
                  }}
                  className="font-bold text-onyx hover:underline"
                >
                  Create one
                </button>
              </p>
            )}

            {mode === "register" && (
              <p>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setStatusMessage("");
                  }}
                  className="font-bold text-onyx hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === "forgot" && (
              <p>
                Remembered your password?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setStatusMessage("");
                  }}
                  className="font-bold text-onyx hover:underline"
                >
                  Back to Sign in
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}