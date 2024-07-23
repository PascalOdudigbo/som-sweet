import type { Metadata } from "next";
import "../../styles/_globals.scss";
import { ToastProvider } from "@/components";
import { AuthProvider } from "@/contexts/AuthProvider";

export const metadata: Metadata = {
  title: "Som' Sweet",
  description: "Where sweetness meets perfection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}