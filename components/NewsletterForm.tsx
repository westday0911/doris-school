"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: "hero" | "simple";
}

export function NewsletterForm({
  className,
  inputClassName,
  buttonClassName,
  placeholder = "輸入您的 Email 地址",
  buttonText = "訂閱電子報",
  variant = "simple"
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("請輸入正確的 Email 地址");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "訂閱失敗");

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error("Subscription error:", err);
      setStatus("error");
      setMessage(err.message || "訂閱發生錯誤，請稍後再試。");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-2 text-emerald-400 font-bold", className)}>
        <CheckCircle2 size={20} />
        <span>訂閱成功！感謝您的加入。</span>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex flex-col sm:flex-row gap-2 w-full",
        variant === "hero" && "bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl",
        className
      )}
    >
      <input 
        type="email" 
        required
        placeholder={placeholder} 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          "flex-1 bg-transparent border-0 px-6 py-4 focus:outline-none focus:ring-0",
          variant === "simple" && "bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2",
          variant === "hero" && "text-white placeholder:text-slate-500",
          inputClassName
        )}
        disabled={status === "loading"}
      />
      <Button 
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "font-bold transition-all shrink-0",
          variant === "hero" && "h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white",
          variant === "simple" && "rounded-xl",
          buttonClassName
        )}
      >
        {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : buttonText}
      </Button>
      {status === "error" && (
        <p className="text-red-400 text-xs absolute -bottom-6 left-2 font-medium">{message}</p>
      )}
    </form>
  );
}
