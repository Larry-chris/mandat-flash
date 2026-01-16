"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, CheckCircle, MapPin, Unlock, Download, ChevronLeft, Play, Square } from "lucide-react";
import Link from "next/link";
import { jsPDF } from "jspdf";

interface ReportData {
    price_estimation?: string;
    confidence_score?: string;
    owner_profile?: { type?: string; description?: string };
    market_analysis?: string;
    negotiation_points?: string[];
    error?: string;
}

// COMPOSANT CONTENU (Logique principale)
function AnalyseContent() {
    const searchParams = useSearchParams();

    const address = searchParams.get("addr") || "Adresse inconnue";
    const clientName = searchParams.get("name") || "";
    const context = searchParams.get("ctx") || "";

    const [loadingStep, setLoadingStep] = useState(0);
    const [isReadyToPay, setIsReadyToPay] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [report, setReport] = useState<ReportData | null>(null);

    // État pour l'Audio Mobile
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const steps = [
            { t: 1000, fn: () => setLoadingStep(1) },
            { t: 2500, fn: () => setLoadingStep(2) },
            { t: 4000, fn: () => setLoadingStep(3) },
        ];
        steps.forEach(step => setTimeout(step.fn, step.t));

        const fetchGeminiData = async () => {
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    body: JSON.stringify({ address, clientName, context }),
                });
                const data = await res.json();
                setReport(data);
                setTimeout(() => setIsReadyToPay(true), 5000);
            } catch (error) {
                console.error("Erreur:", error);
                setReport({
                    price_estimation: "Erreur IA",
                    confidence_score: "0%",
                    owner_profile: { type: "Inconnu", description: "Erreur technique." },
                    market_analysis: "Non disponible.",
                    negotiation_points: ["Réessayer."]
                });
                setIsReadyToPay(true);
            }
        };

        fetchGeminiData();
    }, [address, clientName, context]);

    const handleUnlock = () => setIsUnlocked(true);

    // --- LOGIQUE AUDIO (COACH VOCAL) ---
    const toggleAudio = () => {
        if (!report) return;

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const textToRead = `
      Briefing Mandat Flash pour le bien situé à : ${address}.
      Estimation IA : ${report.price_estimation}.
      
      Attention, profil vendeur détecté : ${report.owner_profile?.type}. 
      ${report.owner_profile?.description}
      
      Voici ta stratégie de négociation :
      Premier point : ${report.negotiation_points?.[0] || "Non défini"}.
      Deuxième point : ${report.negotiation_points?.[1] || "Non défini"}.
      Troisième point : ${report.negotiation_points?.[2] || "Non défini"}.
      
      Bonne chance pour le mandat.
    `;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = "fr-FR";
        utterance.rate = 1.1;
        utterance.pitch = 1;
        utterance.onend = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
    };

    // --- LOGIQUE PDF ---
    const generatePDF = () => {
        if (!report) return;

        const doc = new jsPDF();

        doc.setFillColor(11, 15, 25);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("MANDAT-FLASH", 10, 20);
        doc.setFontSize(10);
        doc.text("Dossier Stratégique Confidentiel", 10, 30);

        if (clientName) {
            doc.text(`Pour : ${clientName}`, 160, 30);
        } else {
            doc.text(`Réf: #IA-${Math.floor(Math.random() * 1000)}`, 160, 30);
        }

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text(`Analyse du bien :`, 10, 55);
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text(address, 10, 65);

        doc.setDrawColor(200, 200, 200);
        doc.line(10, 75, 200, 75);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Estimation de Valeur :", 10, 90);
        doc.setFontSize(24);
        doc.setTextColor(34, 197, 94);
        doc.text(report.price_estimation || "N/A", 10, 105);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Précision estimée : ${report.confidence_score}`, 80, 105);

        doc.setFillColor(245, 247, 250);
        doc.rect(10, 120, 190, 40, 'F');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Profil & Psychologie Vendeur :", 15, 130);

        doc.setFontSize(10);
        doc.setTextColor(79, 70, 229);
        doc.text((report.owner_profile?.type || "Standard").toUpperCase(), 15, 140);

        doc.setTextColor(50, 50, 50);
        const splitDesc = doc.splitTextToSize(`"${report.owner_profile?.description || ""}"`, 180);
        doc.text(splitDesc, 15, 148);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Arguments Clés & Négociation :", 10, 175);
        let yPos = 185;
        if (report.negotiation_points) {
            report.negotiation_points.forEach((point) => {
                doc.setFillColor(0, 0, 0);
                doc.circle(15, yPos - 1, 1, 'F');
                doc.setFontSize(10);
                doc.setTextColor(60, 60, 60);
                const splitPoint = doc.splitTextToSize(point, 170);
                doc.text(splitPoint, 20, yPos);
                yPos += 8 * splitPoint.length + 2;
            });
        }

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Généré par IA. Usage interne exclusif.", 10, 280);

        const filename = clientName ? `Dossier_${clientName.replace(/\s/g, '_')}.pdf` : `Analyse_Bien.pdf`;
        doc.save(filename);
    };

    // --- VUE CHARGEMENT ---
    if (!isReadyToPay) {
        return (
            <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="relative flex justify-center">
                        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin relative z-10" />
                    </div>
                    <h2 className="text-2xl font-bold animate-pulse">Analyse Stratégique en cours...</h2>
                    <div className="space-y-4 text-left bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <StepItem step={0} current={loadingStep} label="Croisement Données DVF & Marché" />
                        <StepItem step={1} current={loadingStep} label="Intégration du Contexte Client" />
                        <StepItem step={2} current={loadingStep} label="Profilage Psychologique (IA)" />
                        <StepItem step={3} current={loadingStep} label="Rédaction des Scripts de Vente" />
                    </div>
                </div>
            </div>
        );
    }

    // --- VUE RESULTAT ---
    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12 overflow-hidden relative pb-24">

            <div className="flex justify-between items-center mb-10 opacity-70">
                <Link href="/" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Nouvelle Recherche
                </Link>
                <div className="flex items-center gap-2 text-sm font-mono text-slate-500">
                    {clientName && <span className="text-indigo-400 font-bold border border-indigo-500/30 px-2 py-0.5 rounded">CLIENT: {clientName}</span>}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Dossier généré pour :</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white break-words max-w-2xl">{address}</h1>
                </div>

                {isUnlocked && (
                    <button
                        onClick={generatePDF}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/20 animate-in fade-in slide-in-from-right duration-700"
                    >
                        <Download className="w-4 h-4" />
                        Télécharger le Dossier {clientName ? `de ${clientName}` : "PDF"}
                    </button>
                )}
            </div>

            <div className={`grid md:grid-cols-2 gap-6 relative transition-all duration-1000 ${!isUnlocked ? "filter blur-xl select-none opacity-40 scale-95" : "filter blur-0 opacity-100 scale-100"}`}>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <h3 className="text-slate-400 mb-4 text-sm uppercase tracking-wider">Estimation Optimisée</h3>
                    <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                        {report?.price_estimation || "Calcul..."}
                    </div>
                    <div className="text-sm text-slate-500">Confiance IA : {report?.confidence_score}</div>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <h3 className="text-slate-400 mb-4 text-sm uppercase tracking-wider">Psychologie Vendeur</h3>
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-bold border border-indigo-500/30">
                            {report?.owner_profile?.type?.split('/')[0] || "Analyse..."}
                        </span>
                    </div>
                    <p className="text-slate-300 text-sm italic leading-relaxed">
                        "{report?.owner_profile?.description}"
                    </p>
                </div>

                <div className="md:col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
                    <h3 className="text-slate-400 mb-3 text-sm uppercase tracking-wider">Analyse Contexte & Marché</h3>
                    <p className="text-lg text-slate-200 leading-relaxed">{report?.market_analysis}</p>
                </div>

                <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-900/20 p-8 rounded-2xl border border-indigo-500/30">
                    <h3 className="text-indigo-300 mb-6 font-bold flex items-center gap-2 text-lg">
                        <Unlock className="w-5 h-5" /> Stratégie de Négociation
                    </h3>
                    <ul className="space-y-4">
                        {report?.negotiation_points?.map((point, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-200">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* BOUTON AUDIO FLOTTANT (Visible uniquement si débloqué) */}
            {isUnlocked && (
                <div className="fixed bottom-6 right-6 z-40">
                    <button
                        onClick={toggleAudio}
                        className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${isPlaying
                                ? "bg-red-500 text-white animate-pulse"
                                : "bg-white text-indigo-900"
                            }`}
                    >
                        {isPlaying ? (
                            <>
                                <Square className="w-5 h-5 fill-current" />
                                <span className="font-bold hidden md:inline">Stop</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 fill-current" />
                                <span className="font-bold hidden md:inline">Écouter Briefing</span>
                                <span className="font-bold md:hidden">Écouter</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {!isUnlocked && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0B0F19]/80 backdrop-blur-xl border border-indigo-500/50 p-8 md:p-10 rounded-3xl text-center max-w-md shadow-2xl shadow-indigo-500/20 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400 ring-1 ring-indigo-500/50">
                            <Lock className="w-10 h-10" />
                        </div>

                        <h2 className="text-3xl font-bold mb-3 text-white">Dossier Stratégique Prêt</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            L'IA a généré une stratégie sur-mesure pour convaincre <span className="text-white font-bold">{clientName || "le vendeur"}</span>.
                        </p>

                        <button onClick={handleUnlock} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                            <Unlock className="w-5 h-5" />
                            Accéder au Dossier (Simulation)
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

function StepItem({ step, current, label }: { step: number, current: number, label: string }) {
    if (current > step) return <div className="flex items-center text-green-400 transition-all duration-300 font-medium"><CheckCircle className="w-5 h-5 mr-3" /> {label}</div>;
    if (current === step) return <div className="flex items-center text-indigo-300 transition-all duration-300 font-medium"><Loader2 className="w-5 h-5 mr-3 animate-spin" /> {label}</div>;
    return <div className="flex items-center text-slate-600 transition-all duration-300"><div className="w-5 h-5 mr-3 border border-slate-700 rounded-full"></div> {label}</div>;
}

// 2. LE COMPOSANT EXPORTÉ (Le Wrapper Suspense Obligatoire)
export default function AnalysePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                <p className="text-slate-400">Initialisation...</p>
            </div>
        }>
            <AnalyseContent />
        </Suspense>
    );
}