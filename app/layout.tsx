import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Zap } from "lucide-react";
// IMPORT DU COMPOSANT COOKIE (Depuis le dossier components à la racine)
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Mandat-Flash | AI Real Estate Intelligence",
  description: "Advanced AI profiling and valuation for elite real estate agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#0B0F19] text-slate-200">

        {/* 1. CONTENU PRINCIPAL (Pages) */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* 2. FOOTER GLOBAL (Obligatoire pour Paddle) */}
        <footer className="border-t border-slate-800 bg-[#050810] py-12">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">

            {/* Colonne Marque */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500 fill-indigo-500" />
                <span className="font-bold text-lg text-white tracking-wider">MANDAT-FLASH</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                L'outil d'intelligence artificielle indispensable pour les mandataires immobiliers modernes.
                Gagnez vos mandats grâce à la psychologie comportementale.
              </p>
              <p className="text-slate-600 pt-4">
                © 2026 L Company. Tous droits réservés.
              </p>
            </div>

            {/* Colonne Légal */}
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Informations Légales</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/legal/terms" className="hover:text-indigo-400 transition-colors">Conditions Générales (Terms)</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-indigo-400 transition-colors">Confidentialité (Privacy)</Link></li>
                <li><Link href="/legal/refund" className="hover:text-indigo-400 transition-colors">Remboursements (Refunds)</Link></li>
              </ul>
            </div>

            {/* Colonne Contact */}
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Contact & Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="mailto:bokolarry6@gmail.com" className="hover:text-white transition-colors">
                    bokolarry6@gmail.com
                  </a>
                </li>
                <li className="text-slate-600 pt-4 text-xs leading-relaxed">
                  Édité par <strong className="text-slate-500">L Company</strong><br />
                  Cotonou, Littoral<br />
                  Bénin (West Africa)
                </li>
              </ul>
            </div>

          </div>
        </footer>

        {/* 3. BANNIÈRE COOKIES (S'affiche par-dessus le reste si pas acceptée) */}
        <CookieBanner />

      </body>
    </html>
  );
}