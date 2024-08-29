import React from "react";
import { cn } from "@/util/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center gap-x-2 rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:text-gray-900",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-600 disabled:bg-gray-300 disabled:text-gray-900",
    danger:
      "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600 disabled:bg-gray-300 disabled:text-gray-900",
  };

  const sizeClasses = {
    small: "px-2.5 py-1.5 text-xs",
    medium: "px-3.5 py-2.5 text-sm",
    large: "px-4 py-3 text-base",
  };

  const iconClasses = icon
    ? iconPosition === "left"
      ? "-ml-0.5 mr-1"
      : "ml-1 -mr-0.5"
    : "";

  return (
    <button
      type="button"
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={cn("h-5 w-5", iconClasses)}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={cn("h-5 w-5", iconClasses)}>{icon}</span>
      )}
    </button>
  );
};
