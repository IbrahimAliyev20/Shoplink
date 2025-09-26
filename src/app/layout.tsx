import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import ClientLayout from "@/components/home/navigation/clientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Shoplink",
  description: "Shoplink",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <ClientLayout>{children}</ClientLayout>
            <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}