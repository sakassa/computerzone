import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ComputerZone Maroc - Ordinateurs Portables Gaming",
  description: "Découvrez notre sélection d'ordinateurs portables gaming haut de gamme au Maroc. Livraison rapide, prix compétitifs et support client en français et arabe.",
  keywords: "ordinateurs portables gaming Maroc, laptops gaming Casablanca, ordinateurs portables gaming Rabat, gaming laptops Maroc, ordinateurs portables gaming pas cher Maroc",
  authors: [{ name: "ComputerZone Maroc" }],
  creator: "ComputerZone Maroc",
  publisher: "ComputerZone Maroc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://computerzone.me"),
  alternates: {
    canonical: "/",
    languages: {
      'fr-MA': '/fr',
      'ar-MA': '/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://computerzone.me",
    title: "ComputerZone Maroc - Ordinateurs Portables Gaming",
    description: "Découvrez notre sélection d'ordinateurs portables gaming haut de gamme au Maroc. Livraison rapide, prix compétitifs et support client en français et arabe.",
    siteName: "ComputerZone Maroc",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ComputerZone Maroc - Ordinateurs Portables Gaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ComputerZone Maroc - Ordinateurs Portables Gaming",
    description: "Découvrez notre sélection d'ordinateurs portables gaming haut de gamme au Maroc. Livraison rapide, prix compétitifs et support client en français et arabe.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-MA">
      <head>
        {/* Favicon for modern browsers */}
        <link rel="icon" type="image/png" sizes="32x32" href="/placeholder-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/placeholder-logo.png" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/placeholder-logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/placeholder-logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/placeholder-logo.png" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/placeholder-logo.png" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        
        {/* Web Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content="Casablanca" />
        <meta name="geo.position" content="33.5731;-7.5898" />
        <meta name="ICBM" content="33.5731, -7.5898" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
