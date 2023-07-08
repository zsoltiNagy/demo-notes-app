import React from "react";
import Button, { ButtonProps } from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

interface LoaderButtonProps extends ButtonProps {
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  children,
  ...props
}: LoaderButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {children}
    </Button>
  );
}
