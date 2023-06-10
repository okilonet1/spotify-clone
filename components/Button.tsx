import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
        w-full 
        rounded-full 
        border
        border-transparent
        bg-green-500
        px-3 
        py-3 
        font-bold 
        text-black
        transition
        hover:opacity-75
        disabled:cursor-not-allowed
        disabled:opacity-50
      `,
          disabled && "cursor-not-allowed opacity-75",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
