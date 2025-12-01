import { GoogleGenAI, Type } from "@google/genai";
import { GradeLevel, TargetLanguage, FlashcardData, CardType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "";

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

  // Improved Prompt for Better Image Filtering - Enhanced with Context
  const prompt = `
    You are creating educational flashcards for ${grade} students in Chile.
    
    Create a list of exactly ${quantity} vocabulary words or phrases related to the topic: "${topic}"
    Target Language: ${langTargetStr}
    
    CRITICAL RULES FOR EACH WORD:
    1. 'term': The word/phrase in ${langTargetStr}, appropriate for ${grade} level.
    2. ${secondaryInstruction}
    3. 'imageKeyword': This is THE MOST IMPORTANT FIELD. Generate a SPECIFIC, CONCRETE English search query for Pexels stock photos that DIRECTLY REPRESENTS the meaning of 'term'.
    
    IMAGE KEYWORD GUIDELINES (STRICT):
    - The keyword MUST be a concrete, visual representation of the term's meaning, NOT just a translation.
    - For abstract concepts: Use a concrete object that represents it (e.g., "Monday" → "calendar showing Monday", "freedom" → "bird flying free")
    - For adjectives: Include the subject showing that quality (e.g., "Happy" → "happy children laughing", "Fast" → "cheetah running", "Big" → "large elephant")
    - For verbs: Include the subject performing the action (e.g., "Run" → "person running track", "Eat" → "child eating apple", "Sleep" → "baby sleeping peacefully")
    - For nouns: Be specific with context (e.g., "Apple" → "red apple on white background", "Book" → "open book on desk", "House" → "modern house with garden")
    - For colors: Include a recognizable object (e.g., "Red" → "red apple", "Blue" → "blue ocean waves")
    - ALWAYS prefer educational, child-friendly, real-world images over abstract or text-heavy images.
    - Use 2-4 descriptive words in English that clearly identify what to search for.
    - The keyword should be searchable and likely to return relevant results on a stock photo site.
    
    EXAMPLES:
    - term: "Dog" → imageKeyword: "cute dog playing"
    - term: "Rápido" (Fast) → imageKeyword: "cheetah running fast"
    - term: "Monday" → imageKeyword: "calendar monday page"
    - term: "Happy" → imageKeyword: "happy child smiling"
    - term: "Apple" → imageKeyword: "red apple isolated"
    - term: "Run" → imageKeyword: "person running track"
    
    Return ONLY a valid JSON array. No explanations, no markdown, no extra text.
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
    if (!PEXELS_API_KEY) {
      console.error("PEXELS_API_KEY no está configurada");
      return undefined;
    }

    // Request more images per page to have better selection pool
    const perPage = 20; 
    
    // Improved search parameters for better relevance
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=${perPage}&page=${page}&orientation=square&size=medium`;
    
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    
    if (!response.ok) {
      console.error(`Pexels API error: ${response.status} - ${response.statusText}`);
      return undefined;
    }
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      // Prefer images from the first half (more relevant), but allow some randomness
      // This gives us better relevance while maintaining variety
      const relevantPool = data.photos.slice(0, Math.ceil(data.photos.length * 0.7));
      const randomIndex = Math.floor(Math.random() * relevantPool.length);
      const photo = relevantPool[randomIndex];
      
      // Prefer higher quality images
      return photo.src.large2x || photo.src.large || photo.src.medium;
    }
    
    // If no results, try a fallback search with simplified keyword
    if (page === 1) {
      const simplifiedKeyword = keyword.split(' ').slice(0, 2).join(' '); // Take first 2 words
      if (simplifiedKeyword !== keyword) {
        console.log(`Intentando búsqueda alternativa con: ${simplifiedKeyword}`);
        return await fetchPexelsImage(simplifiedKeyword, 1);
      }
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