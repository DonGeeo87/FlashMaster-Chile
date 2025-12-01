import React from 'react';
import { FlashcardData, CardType, CourseConfig } from '../types';

interface PrintLayoutProps {
  cards: FlashcardData[];
  config: CourseConfig;
}

const PrintLayout: React.FC<PrintLayoutProps> = ({ cards, config }) => {
  
  // Helper to render a grid of cards
  const renderGrid = (items: React.ReactNode[]) => (
    <div className="grid grid-cols-2 gap-4 w-full px-8">
      {items.map((item, idx) => (
        <div key={idx} className="break-inside-avoid mb-4">
          {item}
        </div>
      ))}
    </div>
  );

  const renderCover = (title: string, subtitle: string) => (
     <div className="flex flex-col items-center justify-center h-[90vh] break-after-page text-center p-10 border-4 border-double border-gray-200 m-8 rounded-xl">
        <h1 className="text-5xl font-bold mb-6">{config.grade}</h1>
        <h2 className="text-4xl font-semibold mb-4 text-blue-800">{config.topic}</h2>
        <div className="w-24 h-1 bg-gray-300 mb-8"></div>
        <h3 className="text-3xl font-bold text-gray-700 mb-2">{title}</h3>
        <p className="text-xl text-gray-500">{subtitle}</p>
        <div className="mt-12 text-sm text-gray-400">
          Generado con FlashMaster Chile
        </div>
      </div>
  );

  // LOGIC: If type is IMAGE_TEXT, we create two distinct sets.
  if (config.cardType === CardType.IMAGE_TEXT) {
    return (
      <div className="print-only w-full bg-white">
        
        {/* === SET 1: IMAGES ONLY === */}
        {renderCover("Set de Imágenes", "Recorta estas tarjetas para actividades de asociación.")}

        <div className="w-full py-8">
          {renderGrid(cards.map((card) => (
            <div key={`img-${card.id}`} className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center h-[300px] relative">
              {card.imageUrl ? (
                <div className="w-full h-full overflow-hidden rounded-md">
                   <img src={card.imageUrl} alt="Flashcard visual" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="text-gray-300 flex flex-col items-center">
                  <span>Sin Imagen</span>
                </div>
              )}
              {/* Small hint text upside down at bottom for teacher reference, optional */}
              <span className="absolute bottom-1 right-2 text-[8px] text-gray-300">{card.term}</span>
            </div>
          )))}
        </div>

        {/* FORCE PAGE BREAK */}
        <div className="break-after-page"></div>

        {/* === SET 2: WORDS ONLY === */}
        {renderCover("Set de Palabras", "Vocabulario en Inglés")}

        <div className="w-full py-8">
          {renderGrid(cards.map((card) => (
             <div key={`txt-${card.id}`} className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-[300px]">
                <h2 className="text-5xl font-bold text-center text-black leading-tight">{card.term}</h2>
                {config.showTranslations && (
                  <p className="text-lg text-gray-400 mt-4 font-light">{card.secondaryText}</p>
                )}
             </div>
          )))}
        </div>

      </div>
    );
  }

  // STANDARD LAYOUT (Text + Translation, Definition, etc.)
  // Just one set of cards combined
  return (
    <div className="print-only w-full bg-white">
      {renderCover("Flashcards de Estudio", `${config.cardType} - Inglés`)}

      <div className="w-full py-8">
        {renderGrid(cards.map((card) => (
          <div 
            key={card.id} 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-[300px] relative"
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-black">{card.term}</h2>
            {config.showTranslations && (
              <p className="text-2xl text-gray-600 text-center font-light">{card.secondaryText}</p>
            )}
          </div>
        )))}
      </div>
    </div>
  );
};

export default PrintLayout;