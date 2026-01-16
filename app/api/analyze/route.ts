import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { address, clientName, context } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Adresse manquante" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Tu es un expert immobilier d'élite et psychologue de la vente.
      
      ANALYSE CIBLÉE POUR :
      - Adresse : "${address}"
      - Propriétaire : "${clientName || "Non spécifié"}"
      - Contexte connu : "${context || "Aucune info préalable"}"

      TA MISSION :
      Agis comme un "Sniper" qui prépare un agent immobilier pour son premier RDV (R1).
      Utilise le contexte fourni (ex: divorce => pressé) pour déduire la psychologie.
      
      Génère UNIQUEMENT un JSON strict :
      {
        "price_estimation": "Montant estimé (ex: 450 000 €)",
        "confidence_score": "Pourcentage (ex: 92%)",
        "owner_profile": {
          "type": "2 adjectifs (ex: Analytique / Pressé)",
          "description": "Une phrase courte sur l'état d'esprit probable du vendeur."
        },
        "market_analysis": "Une phrase percutante sur le marché local.",
        "negotiation_points": [
          "Levier 1 (basé sur le bien ou le contexte)",
          "Levier 2 (Psychologique ou technique)",
          "Argument clé pour signer le mandat"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanText));

  } catch (error) {
    console.error("Erreur Gemini:", error);
    return NextResponse.json({ error: "Echec de l'analyse" }, { status: 500 });
  }
}