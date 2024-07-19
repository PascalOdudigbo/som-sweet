"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: "toast-success",
    error: "toast-error",
    info: "toast-info",
    warning: "toast-warning",
    default: "toast-default",
    dark: "toast-dark",
  };

  return (
    <>
      {children}
      <ToastContainer
        style={{ fontSize: "14px", zIndex: 1000 }}
        toastClassName={(context) =>
          `${contextClass[context?.type || "default"]} toast-base`
        }
        bodyClassName="toast-body"
        position="bottom-left"
        autoClose={3500}
      />
    </>
  );
}
