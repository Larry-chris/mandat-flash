"use client";

import { MapPin, Zap, User, FileText } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [address, setAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim().length > 3) {
      setIsLoading(true);
      // On encode toutes les infos dans l'URL
      const params = new URLSearchParams({
        addr: address,
        name: clientName,
        ctx: context
      });
      router.push(`/analyse?${params.toString()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#0B0F19]">

      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header Logo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 opacity-90">
            <Zap className="w-6 h-6 text-indigo-500 fill-indigo-500" />
            <span className="font-bold text-xl tracking-wider text-white">MANDAT-FLASH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            L'IA qui prépare vos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Rendez-Vous Vendeurs.
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Générez un profil psychologique, une stratégie de prix et un briefing audio en 30 secondes.
          </p>
        </div>

        {/* LE FORMULAIRE STRATÉGIQUE */}
        <form onSubmit={handleSearch} className="relative group mt-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="relative bg-[#111827] border border-slate-700 rounded-xl p-6 shadow-2xl space-y-4">

            {/* Adresse */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Adresse du bien *</label>
              <div className="flex items-center bg-slate-900/50 border border-slate-700 rounded-lg p-2 focus-within:border-indigo-500 transition-colors">
                <MapPin className="ml-2 w-5 h-5 text-indigo-500" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: 12 Rue de la Paix, Paris..."
                  className="w-full bg-transparent text-white p-2 focus:outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Nom Client */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nom du Vendeur (Optionnel)</label>
                <div className="flex items-center bg-slate-900/50 border border-slate-700 rounded-lg p-2 focus-within:border-indigo-500 transition-colors">
                  <User className="ml-2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: M. Dupont"
                    className="w-full bg-transparent text-white p-2 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Contexte */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contexte connu (Optionnel)</label>
                <div className="flex items-center bg-slate-900/50 border border-slate-700 rounded-lg p-2 focus-within:border-indigo-500 transition-colors">
                  <FileText className="ml-2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Ex: Divorce, Mutation, Pressé..."
                    className="w-full bg-transparent text-white p-2 focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? "Initialisation..." : "Lancer l'Analyse Stratégique"}
              {!isLoading && <Zap className="w-5 h-5" />}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-6 opacity-30 grayscale text-sm font-bold text-slate-400 pt-8">
          <span>DONNÉES DVF</span>
          <span>ANALYSE SOCIO-DÉMO</span>
          <span>COACH VOCAL</span>
        </div>

      </div>
    </main>
  );
}