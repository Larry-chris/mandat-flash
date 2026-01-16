import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// --- 1. FONCTION : TROUVER LES COORDONNÉES GPS (Gouv.fr) ---
async function getCoordinates(address: string) {
  try {
    const encodedAddr = encodeURIComponent(address);
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodedAddr}&limit=1`);
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lon, citycode: data.features[0].properties.citycode };
    }
    return null;
  } catch (e) {
    console.error("Erreur Geocoding:", e);
    return null;
  }
}

// --- 2. FONCTION : TROUVER LES VENTES RÉELLES (API DVF Open Data) ---
async function getSoldProperties(lat: number, lon: number) {
  try {
    // On cherche les ventes dans un rayon de 500m
    const res = await fetch(`http://api.cquest.org/dvf?lat=${lat}&lon=${lon}&dist=500`);
    const data = await res.json();

    // On filtre pour ne garder que les 5 dernières ventes pertinentes (Maison ou Appartement)
    if (data.features && data.features.length > 0) {
      const sales = data.features
        .slice(0, 8) // On en prend 8 pour donner de la matière à l'IA
        .map((f: any) => {
          const p = f.properties;
          return `- Vente le ${p.date_mutation} : ${p.valeur_fonciere}€ pour ${p.surface_reelle_bati}m² (${p.type_local})`;
        })
        .join("\n");
      return sales;
    }
    return "Aucune donnée DVF récente trouvée à proximité immédiate.";
  } catch (e) {
    console.error("Erreur DVF:", e);
    return "Données marché inaccessibles pour le moment.";
  }
}

export async function POST(req: Request) {
  try {
    const { address, clientName, context } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Adresse manquante" }, { status: 400 });
    }

    // A. ON RÉCUPÈRE LA "VÉRITÉ DU MARCHÉ" (DATA)
    let marketDataContext = "Données marché non localisées.";
    const coords = await getCoordinates(address);

    if (coords) {
      const soldData = await getSoldProperties(coords.lat, coords.lon);
      marketDataContext = `
        COORDONNÉES : Lat ${coords.lat}, Lon ${coords.lon}
        HISTORIQUE DES VENTES RÉELLES (DVF) DANS LA RUE (Preuves irréfutables) :
        ${soldData}
      `;
    }

    // B. ON LANCE L'IA AVEC LA DATA + LA MÉTHODE VENTE
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Modèle mis à jour

    const systemInstruction = `
      TU ES UN MENTOR IMMOBILIER D'ÉLITE (Style "Disrupteur Immobilier" & "Victor Cabrera").
      
      DÉTAILS DU MANDAT :
      - Adresse : "${address}"
      - Client : "${clientName || "Le Propriétaire"}"
      - Contexte émotionnel connu : "${context || "Aucun (Profil à déduire)"}"
      
      ${marketDataContext}

      TES RÈGLES D'OR POUR L'ANALYSE (Logique Métier) :
      1. **JAMAIS D'ESTIMATION PLAISIR** : Utilise les ventes DVF ci-dessus pour justifier ton prix. Si le voisin a vendu moins cher, tu DOIS le dire.
      2. **L'HUMAIN D'ABORD (Cédric Laporte)** : Ne parle pas technique tout de suite. Analyse le contexte (ex: "Divorce" = Besoin de sécurité et rapidité / "Succession" = Besoin d'accompagnement).
      3. **MÉTHODE ADERA (Victor Cabrera)** : Pour la stratégie de négo, n'argumente pas en mode "Ping-Pong". Utilise une "Question Calibrée" basée sur les faits DVF.
         *Exemple : "M. le Vendeur, au vu de la vente au n°14 à 3000€/m2 (Preuve), qu'est-ce qui justifierait selon vous un écart de 20% ?"*

      GÉNÈRE CE JSON STRICT :
      {
        "price_estimation": "Fourchette réaliste basée sur DVF (ex: 410k€ - 430k€)",
        "confidence_score": "Score % (Si beaucoup de ventes DVF trouvées = Haut, sinon Bas)",
        "owner_profile": {
          "type": "2 Adjectifs psychologiques (ex: Affectif / Pragmatique)",
          "description": "Analyse courte. Si le contexte est vide, déduis les peurs classiques (peur de brader, peur du délai)."
        },
        "market_analysis": "Une phrase d'expert qui cite une tendance observée dans les données DVF (ex: 'On observe 3 ventes récentes sous les 400k€ dans la rue, le marché corrige à la baisse').",
        "negotiation_points": [
          "POINT HUMAIN : Une phrase d'empathie liée au contexte pour briser la glace (ex: 'Je comprends que vendre la maison familiale est dur...').",
          "PREUVE FACTUELLE : Un argument qui cite EXPLICITEMENT une vente DVF de la liste ci-dessus pour ancrer le prix.",
          "SCRIPT ADERA (La Finale) : Rédige le script exact de traitement de l'objection prix. Utilise le schéma : Acceptation > Question Calibrée (Découverte) > Empathie > Réponse Factuelle (DVF) > Accord."
        ]
      }
    `;

    const result = await model.generateContent(systemInstruction);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanText));

  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json({
      price_estimation: "Analyse impossible",
      confidence_score: "0%",
      owner_profile: { type: "Inconnu", description: "Erreur technique." },
      market_analysis: "Service momentanément indisponible.",
      negotiation_points: ["Veuillez réessayer plus tard."]
    }, { status: 500 });
  }
}