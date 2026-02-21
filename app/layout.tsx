import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workplace Wellness Survey — House of Return",
  description:
    "An anonymous survey about how the physical space of your workplace affects you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#f6f2f0", color: "#4e4a48" }}>
        {children}
      </body>
    </html>
  );
}
