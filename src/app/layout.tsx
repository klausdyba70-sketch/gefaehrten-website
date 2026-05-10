import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CookieConsent from "@/components/CookieConsent";
import NewsletterSection from "@/components/NewsletterSection";
import client from "../../tina/__generated__/client";
import { generateOrganizationSchema } from "@/utils/seo";
import Schema from "@/components/Schema";
import Navbar from "@/components/Navbar";
import { localizeTinaData } from "@/utils/tina-helper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gefährten | Traumainstitut",
  description: "Ein Begleiter auf dem Weg der Heilung.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global settings from Tina
  let settings;
  try {
    const settingsResponse = await client.queries.settings({ relativePath: "index.json" });
    settings = localizeTinaData(settingsResponse.data.settings);
  } catch (e) {
    // Fallback or empty settings if not found
    settings = {
      address: { name: "GEFÄHRTEN", street: "Beispielstraße 123", city: "50667 Köln" },
      contactEmail: "info@gefaehrten.net",
      contactPhone: "+49 170 1234567",
      socials: { instagram: "#", facebook: "#" },
      navLinks: []
    };
  }

  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${sourceSerif.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Schema data={generateOrganizationSchema(settings)} />
        <Navbar 
          navLinks={(settings.navLinks || []).map((link: any) => {
            const resolveUrl = (l: any) => l.pageRef?._sys?.filename ? `/${l.pageRef._sys.filename}` : (l.url || "#");
            return {
              ...link,
              url: resolveUrl(link),
              subLinks: link.subLinks?.map((sub: any) => ({ ...sub, url: resolveUrl(sub) }))
            };
          })} 
          settings={settings} 
        />

        <main className="flex-1 w-full relative">{children}</main>

        <NewsletterSection />
        
        <footer className="w-full py-24 px-6 md:px-12 bg-[#0f110e] text-[#F5F2EB] border-t border-white/5 mt-auto">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[11px] uppercase tracking-[0.2em] font-sans">
              
              <div className="space-y-6">
                <div className="text-pink font-bold">Anschrift</div>
                <div className="opacity-60 leading-relaxed font-light normal-case tracking-normal text-lg">
                  {settings.address?.name}<br />
                  {settings.address?.street}<br />
                  {settings.address?.city}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-pink font-bold">Direkt</div>
                <div className="opacity-60 leading-relaxed font-light normal-case tracking-normal text-lg">
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-pink transition-colors">
                    {settings.contactEmail}
                  </a><br />
                  <a href={`tel:${settings.contactPhone}`} className="hover:text-pink transition-colors">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-pink font-bold">Social Media</div>
                <div className="flex gap-6 opacity-60">
                  <a href={settings.socials?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors">Instagram</a>
                  <a href={settings.socials?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors">Facebook</a>
                </div>
              </div>

            </div>

            <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-30">
              <p>&copy; {new Date().getFullYear()} {settings.address?.name}</p>
              <div className="flex gap-8 mt-6 md:mt-0">
                <Link href="/impressum" className="hover:text-pink transition-colors">Impressum</Link>
                <Link href="/datenschutz" className="hover:text-pink transition-colors">Datenschutz</Link>
              </div>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
