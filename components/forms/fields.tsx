"use client";

import { type ReactNode } from "react";

const control =
  "w-full rounded-[12px] border border-line bg-card px-4 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-sans text-sm font-medium text-ink-2">
        {label}
        {required && <span className="text-accent-strong"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-sans text-[13px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${control} h-12 ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${control} min-h-[120px] resize-y py-3 ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${control} h-12 appearance-none bg-[right_1rem_center] ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}
