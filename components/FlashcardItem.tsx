import React, { useState, useEffect } from 'react';
import { FlashcardData, CardType } from '../types';
import { regenerateCardImage } from '../services/pixabayService';

interface FlashcardItemProps {
  data: FlashcardData;
  type: CardType;
  onUpdate: (id: string, updates: Partial<FlashcardData>) => void;
  showTranslations?: boolean;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ data, type, onUpdate, showTranslations = true }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(data.imageUrl);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  // Sync internal state when prop changes
  useEffect(() => {
    setCurrentImageUrl(data.imageUrl);
    setIsImageLoading(!!data.imageUrl);
    setImageError(false);
  }, [data.imageUrl]);

  const handleChangePhoto = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!data.imageKeyword) return;

    onUpdate(data.id, { isGeneratingImage: true });
    try {
      const currentPage = data.pexelsPage || 1;
      // regenerateCardImage now handles fetching a new pool of images (page+1) 
      // and returning a random one from that pool
      const { url, page } = await regenerateCardImage(data.imageKeyword, currentPage);
      
      if (url) {
        onUpdate(data.id, { imageUrl: url, pexelsPage: page, isGeneratingImage: false });
      } else {
         onUpdate(data.id, { isGeneratingImage: false });
      }
    } catch (error) {
      onUpdate(data.id, { isGeneratingImage: false });
    }
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpdate(data.id, { imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow group">
      {/* Visual Header / Image Area */}
      {type === CardType.IMAGE_TEXT && (
        <div className="relative h-56 bg-gray-100 flex items-center justify-center border-b border-gray-100 overflow-hidden">
          
          {currentImageUrl && !imageError ? (
            <>
              {/* Actual Image */}
              <img 
                src={currentImageUrl} 
                alt={data.term} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsImageLoading(false)}
                onError={handleImageError}
              />
              
              {/* Loading Spinner overlay */}
              {isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                   <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400 p-4 text-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="text-sm">Sin imagen</span>
               <button 
                 onClick={(e) => handleChangePhoto(e)}
                 className="mt-2 text-xs text-blue-500 hover:underline"
               >
                 Buscar foto
               </button>
            </div>
          )}

          {/* Action Buttons (Hover) */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
             {/* Regenerate Button */}
             <button 
               onClick={handleChangePhoto}
               disabled={data.isGeneratingImage}
               className={`bg-white/90 p-2 rounded-full shadow hover:bg-white text-blue-600 transition-transform hover:scale-110 ${data.isGeneratingImage ? 'animate-spin' : ''}`} 
               title="Buscar otra foto"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
             </button>

             {/* Upload Button */}
             <label className="cursor-pointer bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 flex items-center justify-center transition-transform hover:scale-110" title="Subir imagen propia">
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
             </label>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-1 leading-tight">{data.term}</h3>
        
        {/* Secondary text logic */}
        {(type !== CardType.IMAGE_TEXT || !data.imageUrl) && showTranslations && (
             <p className="text-gray-500 font-medium text-lg mt-1">{data.secondaryText}</p>
        )}
        
        {type === CardType.IMAGE_TEXT && data.imageUrl && (
            <p className="text-gray-300 text-[10px] mt-2 uppercase tracking-wider font-semibold">Listo para imprimir</p>
        )}
      </div>
    </div>
  );
};

export default FlashcardItem;