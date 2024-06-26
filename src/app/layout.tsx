import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "WagOne - Chat",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={work_sans.className}>
                {children}
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
