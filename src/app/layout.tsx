import type { Metadata } from "next";
import { Inter, Space_Grotesk, Syne, Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import AuthProvider from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARC OPUS | Crafted Beyond Ordinary",
  description: "ARC OPUS is a premium luxury high-end designer fashion house. Explore our curated collections and interactive 3D outfit configurator.",
  metadataBase: new URL("https://arcopus.fashion"),
  icons: {
    icon: '/arc_opus_logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable} ${unbounded.variable} ${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050505] text-[#F5F5F5] selection:bg-[#C10E1D] selection:text-white flex flex-col font-sans overflow-x-hidden">
        <AuthProvider>
          <AppProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-grow flex flex-col pt-[80px]">
              {children}
            </main>
            <CartDrawer />
            <WishlistDrawer />
            <CheckoutDrawer />
            <ProfileDrawer />
            <AuthModal />
            <Footer />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
