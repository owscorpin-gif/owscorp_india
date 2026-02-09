import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/lib/auth";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "OWSCORP - Affiliate Marketing Marketplace | Discover, Compare & Buy",
  description: "OWSCORP is your trusted multi-niche affiliate marketplace. Discover trending products in electronics, fashion, beauty, home, fitness, and more. Compare prices and get the best deals!",
  keywords: "affiliate marketplace, electronics deals, fashion shopping, beauty products, home appliances, best prices, product reviews",
  openGraph: {
    title: "OWSCORP - Affiliate Marketing Marketplace",
    description: "Discover trending products across multiple categories. Compare and shop from trusted affiliate partners.",
    type: "website",
    url: "https://owscorp.in",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <ToastProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <ChatWidget />
            </WishlistProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
