import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import ClientLayout from "@/components/home/navigation/clientLayout";
import { getMetaTags } from "@/services/MetaTags/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetaTags();
  const metaTags = data?.data[0];

  return {
    title: metaTags?.title || "Shoplink",
    description: metaTags?.meta_description || "Shoplink",
    keywords: metaTags?.meta_keywords || "Shoplink",
  };
}

export default function RootLayout({
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
