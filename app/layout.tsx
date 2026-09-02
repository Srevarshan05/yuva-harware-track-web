import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUVA Megathon — Hardware Track",
  description: "Hardware Track | Hosted by IEEE SB of SRM IST Trichy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ background: "#000000" }}>
      <body
        style={{
          background: "#000000",
          color: "#ffffff",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          backgroundColor: "#000000",
        }}
      >
        {children}
      </body>
    </html>
  );
}

