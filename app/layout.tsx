import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B2B48",
};

export const metadata: Metadata = {
  title: "La Cité d'Excellence - HOUEKIN MINISTRIES",
  description: "Bâtir une génération d'excellence par la Puissance du Saint-Esprit. Un lieu où la foi rencontre l'excellence à Cotonou, Bénin.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  keywords: ["HOUEKIN MINISTRIES", "La Cité d'Excellence", "Église Bénin", "Cotonou", "Prédications", "Cultes"],
  openGraph: {
    title: "La Cité d'Excellence - HOUEKIN MINISTRIES",
    description: "Bâtir une génération d'excellence par la Puissance du Saint-Esprit.",
    url: "https://houekin.org",
    siteName: "HOUEKIN MINISTRIES",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${inter.variable} bg-background text-on-surface font-sans overflow-x-hidden w-full`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
