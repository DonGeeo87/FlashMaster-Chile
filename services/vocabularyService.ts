import { GradeLevel, TargetLanguage, FlashcardData, CardType } from "../types";
import { fetchPixabayImage, regenerateCardImage } from "./pixabayService";

// Import vocabulary data
import baseVocabulary from "../data/vocabulary/base.json";
import intermediateVocabulary from "../data/vocabulary/intermediate.json";

// Combine all vocabulary sources
const VOCABULARY_DATA = {
  ...baseVocabulary.vocabulary,
  ...intermediateVocabulary.vocabulary,
};

// Map grade levels to vocabulary complexity
const GRADE_TO_COMPLEXITY: Record<GradeLevel, "base" | "intermediate" | "advanced"> = {
  [GradeLevel.BASICO_1]: "base",
  [GradeLevel.BASICO_2]: "base",
  [GradeLevel.BASICO_3]: "intermediate",
  [GradeLevel.BASICO_4]: "intermediate",
  [GradeLevel.BASICO_5]: "intermediate",
  [GradeLevel.BASICO_6]: "intermediate",
  [GradeLevel.BASICO_7]: "advanced",
  [GradeLevel.BASICO_8]: "advanced",
  [GradeLevel.MEDIO_1]: "advanced",
  [GradeLevel.MEDIO_2]: "advanced",
  [GradeLevel.MEDIO_3]: "advanced",
  [GradeLevel.MEDIO_4]: "advanced",
};

interface VocabularyItem {
  term: string;
  translation: string;
  definition: string;
  imageKeyword: string;
}

/**
 * Normalize topic name to match vocabulary keys
 * Handles variations like "Colors" vs "Colores (Colors)", emojis, etc.
 */
function normalizeTopic(topic: string): string {
  // Remove extra whitespace
  let normalized = topic.trim();
  
  // Remove emojis and special characters for matching
  const cleanTopic = normalized.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
  
  // Try exact match first
  if (VOCABULARY_DATA[normalized]) {
    return normalized;
  }
  
  if (VOCABULARY_DATA[cleanTopic]) {
    return cleanTopic;
  }
  
  // Get all available keys
  const keys = Object.keys(VOCABULARY_DATA);
  
  // Try case-insensitive match
  const match = keys.find(key => {
    const cleanKey = key.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    const lowerNormalized = normalized.toLowerCase();
    const lowerClean = cleanTopic.toLowerCase();
    const lowerKey = key.toLowerCase();
    const lowerCleanKey = cleanKey.toLowerCase();
    
    return (
      lowerKey === lowerNormalized ||
      lowerCleanKey === lowerClean ||
      lowerKey.includes(lowerNormalized) ||
      lowerNormalized.includes(lowerKey) ||
      lowerCleanKey.includes(lowerClean) ||
      lowerClean.includes(lowerCleanKey)
    );
  });
  
  if (match) {
    return match;
  }
  
  // If no match found, return original (will show error message to user)
  return normalized;
}

/**
 * Get vocabulary for a specific topic and language
 */
function getVocabularyForTopic(
  topic: string,
  language: TargetLanguage
): VocabularyItem[] {
  const normalizedTopic = normalizeTopic(topic);
  const topicData = VOCABULARY_DATA[normalizedTopic];
  
  if (!topicData) {
    console.warn(`No vocabulary found for topic: ${topic}`);
    return [];
  }
  
  const langKey = language === TargetLanguage.ENGLISH ? "en" : "es";
  return topicData[langKey] || [];
}

/**
 * Select random items from array
 */
function selectRandomItems<T>(array: T[], count: number): T[] {
  if (array.length <= count) {
    return [...array];
  }
  
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Generate vocabulary list from predefined data
 */
export async function generateVocabularyList(
  grade: GradeLevel,
  topic: string,
  language: TargetLanguage,
  cardType: CardType,
  quantity: number
): Promise<FlashcardData[]> {
  // Get vocabulary for the topic
  const vocabulary = getVocabularyForTopic(topic, language);
  
  if (vocabulary.length === 0) {
    throw new Error(
      `No se encontró vocabulario para el tema "${topic}". ` +
      `Por favor, verifica que el tema existe o agrega vocabulario para este tema.`
    );
  }
  
  // Select random items up to the requested quantity
  const selectedItems = selectRandomItems(vocabulary, Math.min(quantity, vocabulary.length));
  
  // Determine secondary text based on card type
  const isEnglishTarget = language === TargetLanguage.ENGLISH;
  
  // Generate flashcards
  const cardsWithImages = await Promise.all(
    selectedItems.map(async (item, index) => {
      let imageUrl: string | undefined = undefined;
      
      // Fetch image if needed
      if (cardType === CardType.IMAGE_TEXT && item.imageKeyword) {
        imageUrl = await fetchPixabayImage(item.imageKeyword);
      }
      
      // Determine secondary text based on card type
      let secondaryText = "";
      if (cardType === CardType.TEXT_TRANSLATION) {
        secondaryText = item.translation;
      } else if (cardType === CardType.TEXT_DEFINITION) {
        secondaryText = item.definition;
      } else {
        // IMAGE_TEXT - show translation as secondary (may be hidden in UI)
        secondaryText = item.translation;
      }
      
      return {
        id: `card-${Date.now()}-${index}`,
        term: item.term,
        secondaryText: secondaryText,
        imageKeyword: item.imageKeyword,
        imageUrl: imageUrl,
        pexelsPage: 1,
      };
    })
  );
  
  return cardsWithImages;
}

/**
 * Check if vocabulary exists for a topic
 */
export function hasVocabularyForTopic(topic: string): boolean {
  const normalizedTopic = normalizeTopic(topic);
  return !!VOCABULARY_DATA[normalizedTopic];
}

/**
 * Get available topics
 */
export function getAvailableTopics(): string[] {
  return Object.keys(VOCABULARY_DATA);
}

/**
 * Get vocabulary count for a topic
 */
export function getVocabularyCount(topic: string, language: TargetLanguage): number {
  const normalizedTopic = normalizeTopic(topic);
  const topicData = VOCABULARY_DATA[normalizedTopic];
  
  if (!topicData) {
    return 0;
  }
  
  const langKey = language === TargetLanguage.ENGLISH ? "en" : "es";
  return topicData[langKey]?.length || 0;
}

// Re-export Pexels functions for convenience
export { fetchPexelsImage, regenerateCardImage };

