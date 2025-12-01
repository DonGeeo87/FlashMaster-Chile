import React, { useState, useEffect } from 'react';
import { GradeLevel, TargetLanguage, CardType, CourseConfig } from '../types';
import { SUGGESTED_TOPICS } from '../constants';

interface ConfigFormProps {
  onGenerate: (config: CourseConfig) => void;
  isLoading: boolean;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onGenerate, isLoading }) => {
  const [grade, setGrade] = useState<GradeLevel>(GradeLevel.BASICO_1);
  const [topic, setTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [language, setLanguage] = useState<TargetLanguage>(TargetLanguage.ENGLISH);
  const [cardType, setCardType] = useState<CardType>(CardType.IMAGE_TEXT);
  const [quantity, setQuantity] = useState<number>(8);

  // Set default topic when grade changes
  useEffect(() => {
    const suggestions = SUGGESTED_TOPICS[grade];
    if (suggestions && suggestions.length > 0) {
      setTopic(suggestions[0]);
      setCustomTopic('');
    }
  }, [grade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = topic === 'custom' ? customTopic : topic;
    if (!finalTopic) return;
    
    onGenerate({
      grade,
      topic: finalTopic,
      targetLanguage: language,
      cardType,
      quantity
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </span>
        Configuración de Clase
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Grade Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel (Curso)</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
            >
              {Object.values(GradeLevel).map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad de Tarjetas</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
            >
              <option value={4}>4 Tarjetas</option>
              <option value={8}>8 Tarjetas</option>
              <option value={12}>12 Tarjetas</option>
              <option value={16}>16 Tarjetas</option>
            </select>
          </div>
        </div>

        {/* Topic Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temática</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border mb-3"
          >
            {SUGGESTED_TOPICS[grade]?.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
            <option value="custom">✨ Otro (Personalizado)</option>
          </select>
          
          {topic === 'custom' && (
            <input
              type="text"
              placeholder="Escribe el tema (ej. Dinosaurios, Sistema Solar)"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-blue-50"
              required
            />
          )}
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idioma Objetivo</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setLanguage(TargetLanguage.ENGLISH)}
                className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  language === TargetLanguage.ENGLISH
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                🇬🇧 Inglés
              </button>
              <button
                type="button"
                onClick={() => setLanguage(TargetLanguage.SPANISH)}
                className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  language === TargetLanguage.SPANISH
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                🇨🇱 Español
              </button>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Flashcard</label>
             <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value as CardType)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
             >
               <option value={CardType.IMAGE_TEXT}>🖼️ Imagen + Palabra</option>
               <option value={CardType.TEXT_TRANSLATION}>📝 Palabra + Traducción</option>
               <option value={CardType.TEXT_DEFINITION}>📖 Palabra + Definición</option>
             </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || (topic === 'custom' && !customTopic)}
          className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white transition-all ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Contenido...
            </>
          ) : (
            '✨ Crear Flashcards'
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfigForm;