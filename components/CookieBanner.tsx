"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifie si l'utilisateur a déjà accepté
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-indigo-500/30 p-4 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-300 text-center md:text-left">
                    Nous utilisons des cookies pour assurer le bon fonctionnement du site.
                    En continuant, vous acceptez notre{" "}
                    <Link href="/legal/privacy" className="text-indigo-400 underline hover:text-indigo-300">
                        Politique de Confidentialité
                    </Link>.
                </p>
                <button
                    onClick={acceptCookies}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
                >
                    Accepter & Fermer
                </button>
            </div>
        </div>
    );
}