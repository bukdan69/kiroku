import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/hooks/useUserRole";
import { NotificationProvider } from "@/hooks/useNotifications";
import { UserProfileProvider } from "@/hooks/useUserProfile";
import { CurrentTenantProvider } from "@/hooks/useCurrentTenant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arisan KU - Platform Arisan Online Terpercaya di Indonesia",
  description: "Kelola arisan lebih mudah dan transparan dengan Arisan KU. Sistem keamanan terbaik, notifikasi WhatsApp otomatis, dan pembayaran yang aman. Daftar gratis sekarang!",
  keywords: ["arisan online", "arisan digital", "platform arisan", "arisan terpercaya", "arisan indonesia", "kelola arisan"],
  authors: [{ name: "Arisan KU" }],
  openGraph: {
    title: "Arisan KU - Platform Arisan Online Terpercaya",
    description: "Kelola arisan lebih mudah dan transparan dengan sistem keamanan terbaik",
    type: "website",
    locale: "id_ID",
    siteName: "Arisan KU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arisan KU - Platform Arisan Online Terpercaya",
    description: "Kelola arisan lebih mudah dan transparan dengan sistem keamanan terbaik",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <CurrentTenantProvider>
            <UserRoleProvider>
              <UserProfileProvider>
                <NotificationProvider>
                  {children}
                </NotificationProvider>
              </UserProfileProvider>
            </UserRoleProvider>
          </CurrentTenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}