"use client";

import { Check, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] py-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                        Tarifs simples, <span className="text-indigo-500">Rentabilité immédiate.</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Un seul mandat signé grâce à l'IA rembourse 10 ans d'abonnement.
                    </p>
                </div>

                {/* Grid des Prix */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* PLAN 1 : STARTER */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-2">Starter</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">29$</span>
                            <span className="text-slate-500">/mois</span>
                        </div>
                        <p className="text-slate-400 mb-8 text-sm">Pour découvrir la puissance de l'IA sur vos premiers mandats.</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> 5 Analyses / mois</li>
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> Estimation Prix Marché</li>
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> Profil Vendeur Standard</li>
                            <li className="flex gap-3 text-slate-500 text-sm"><Check className="w-5 h-5 text-slate-700" /> Pas d'export PDF</li>
                        </ul>
                        <button className="w-full py-3 rounded-lg border border-indigo-500 text-indigo-400 font-bold hover:bg-indigo-500/10 transition-colors">
                            Choisir Starter
                        </button>
                    </div>

                    {/* PLAN 2 : PRO (Mis en avant) */}
                    <div className="bg-[#111827] border-2 border-indigo-500 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-indigo-500/20">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAIRE</div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Pro Agent
                        </h3>
                        <div className="mb-6">
                            <span className="text-5xl font-bold text-white">49$</span>
                            <span className="text-slate-500">/mois</span>
                        </div>
                        <p className="text-slate-300 mb-8 text-sm">L'outil complet pour les mandataires qui veulent dominer leur secteur.</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-white text-sm"><Check className="w-5 h-5 text-green-400" /> <strong>Analyses Illimitées</strong></li>
                            <li className="flex gap-3 text-white text-sm"><Check className="w-5 h-5 text-green-400" /> Profil Psychologique Avancé</li>
                            <li className="flex gap-3 text-white text-sm"><Check className="w-5 h-5 text-green-400" /> <strong>Génération PDF Client</strong></li>
                            <li className="flex gap-3 text-white text-sm"><Check className="w-5 h-5 text-green-400" /> Coach Vocal (Mobile)</li>
                            <li className="flex gap-3 text-white text-sm"><Check className="w-5 h-5 text-green-400" /> Support Prioritaire</li>
                        </ul>
                        <button className="w-full py-4 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shadow-lg">
                            Passer Pro
                        </button>
                    </div>

                    {/* PLAN 3 : AGENCY */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col">
                        <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm mb-2">Agency</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">199$</span>
                            <span className="text-slate-500">/mois</span>
                        </div>
                        <p className="text-slate-400 mb-8 text-sm">Pour les équipes et agences locales (jusqu'à 5 agents).</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> Tout du pack Pro</li>
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> 5 Comptes Utilisateurs</li>
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> Logo Agence sur PDF</li>
                            <li className="flex gap-3 text-slate-300 text-sm"><Check className="w-5 h-5 text-indigo-500" /> Facturation centralisée</li>
                        </ul>
                        <button className="w-full py-3 rounded-lg border border-slate-600 text-white font-bold hover:bg-slate-800 transition-colors">
                            Contacter l'équipe
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}