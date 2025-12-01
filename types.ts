export enum GradeLevel {
  BASICO_1 = '1° Básico',
  BASICO_2 = '2° Básico',
  BASICO_3 = '3° Básico',
  BASICO_4 = '4° Básico',
  BASICO_5 = '5° Básico',
  BASICO_6 = '6° Básico',
  BASICO_7 = '7° Básico',
  BASICO_8 = '8° Básico',
  MEDIO_1 = '1° Medio',
  MEDIO_2 = '2° Medio',
  MEDIO_3 = '3° Medio',
  MEDIO_4 = '4° Medio',
}

export enum TargetLanguage {
  ENGLISH = 'Inglés',
  SPANISH = 'Español',
}

export enum CardType {
  IMAGE_TEXT = 'Imagen + Texto',
  TEXT_TRANSLATION = 'Texto + Traducción',
  TEXT_DEFINITION = 'Texto + Definición',
}

export interface FlashcardData {
  id: string;
  term: string;
  secondaryText: string; // Translation or definition
  imageUrl?: string;
  imageKeyword?: string; // English keyword for searching
  pexelsPage?: number; // Track pagination to get different photos
  isGeneratingImage?: boolean; 
}

export interface CourseConfig {
  grade: GradeLevel;
  topic: string;
  targetLanguage: TargetLanguage;
  cardType: CardType;
  quantity: number;
}