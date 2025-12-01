import { GoogleGenAI, Type } from "@google/genai";
import { GradeLevel, TargetLanguage, FlashcardData, CardType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const PEXELS_API_KEY = "jgyJaX0dd3avtsJvBDkIiJDbDBGxxhfDk4Xx5BnytBA4chWfQYtHa5po";

export const generateVocabularyList = async (
  grade: GradeLevel,
  topic: string,
  language: TargetLanguage,
  cardType: CardType,
  quantity: number
): Promise<FlashcardData[]> => {
  
  const isEnglishTarget = language === TargetLanguage.ENGLISH;
  const langTargetStr = isEnglishTarget ? "English" : "Spanish";
  const langNativeStr = isEnglishTarget ? "Spanish" : "English";

  let secondaryInstruction = "";
  if (cardType === CardType.TEXT_TRANSLATION) {
    secondaryInstruction = `The 'secondaryText' should be the direct translation in ${langNativeStr}.`;
  } else if (cardType === CardType.TEXT_DEFINITION) {
    secondaryInstruction = `The 'secondaryText' should be a short, simple definition in ${langTargetStr} appropriate for ${grade} level.`;
  } else {
    secondaryInstruction = `The 'secondaryText' should be the word in ${langNativeStr} (even though we might hide it later for image cards).`;
  }

  // Improved Prompt for Better Image Filtering
  const prompt = `
    Create a list of ${quantity} vocabulary words or phrases for a school class in Chile.
    Grade Level: ${grade}
    Topic: ${topic}
    Target Language: ${langTargetStr}
    
    Instructions:
    1. Select words that are appropriate for the age group of ${grade}.
    2. 'term': The word/phrase in ${langTargetStr}.
    3. ${secondaryInstruction}
    4. 'imageKeyword': This is CRITICAL. Provide a specific, concrete English search query for a STOCK PHOTO website.
       - If the term is a color (e.g., "Red"), do NOT just say "Red". Say "Red apple" or "Red balloon".
       - If the term is an adjective (e.g., "Happy"), do NOT just say "Happy". Say "Happy child smiling".
       - If the term is abstract (e.g., "Monday"), find a concrete representation like "Calendar page Monday".
       - If the term is a verb (e.g., "Run"), say "Person running".
       - Avoid text-heavy images.
       - Return ONLY the search query string in English.
    
    Return pure JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: { type: Type.STRING },
              secondaryText: { type: Type.STRING },
              imageKeyword: { type: Type.STRING },
            },
            required: ["term", "secondaryText", "imageKeyword"],
          },
        },
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    // Fetch images from Pexels in parallel
    const cardsWithImages = await Promise.all(data.map(async (item: any, index: number) => {
      let imageUrl = undefined;
      
      if (cardType === CardType.IMAGE_TEXT) {
        // Initial fetch, we use a random seed logic inside fetchPexelsImage to get variety immediately
        imageUrl = await fetchPexelsImage(item.imageKeyword);
      }

      return {
        id: `card-${Date.now()}-${index}`,
        term: item.term,
        secondaryText: item.secondaryText,
        imageKeyword: item.imageKeyword,
        imageUrl: imageUrl,
        pexelsPage: 1, 
      };
    }));

    return cardsWithImages;

  } catch (error) {
    console.error("Error generating vocabulary:", error);
    throw new Error("Failed to generate vocabulary list.");
  }
};

export const fetchPexelsImage = async (keyword: string, page: number = 1): Promise<string | undefined> => {
  try {
    // We request 15 images per page to have a "pool" to choose from
    const perPage = 15; 
    
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=${perPage}&page=${page}&orientation=square&size=medium`, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    
    if (!response.ok) return undefined;
    
    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      // Pick a random image from the returned pool
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      const photo = data.photos[randomIndex];
      return photo.src.large2x || photo.src.medium;
    }
    return undefined;
  } catch (error) {
    console.error("Pexels fetch error:", error);
    return undefined;
  }
};

export const regenerateCardImage = async (keyword: string, currentPage: number): Promise<{url: string | undefined, page: number}> => {
  // We increment page to get a totally new set of 15 images
  const nextPage = currentPage + 1;
  const url = await fetchPexelsImage(keyword, nextPage);
  return { url, page: nextPage };
};