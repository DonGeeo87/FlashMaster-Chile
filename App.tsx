import React, { useState } from 'react';
import ConfigForm from './components/ConfigForm';
import FlashcardItem from './components/FlashcardItem';
import PrintLayout from './components/PrintLayout';
import { generateVocabularyList } from './services/vocabularyService';
import { CourseConfig, FlashcardData } from './types';

function App() {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [config, setConfig] = useState<CourseConfig | null>(null);
  const [cards, setCards] = useState<FlashcardData[]>([]);

  const handleGenerate = async (newConfig: CourseConfig) => {
    setIsLoading(true);
    try {
      const generatedCards = await generateVocabularyList(
        newConfig.grade,
        newConfig.topic,
        newConfig.targetLanguage,
        newConfig.cardType,
        newConfig.quantity
      );
      setCards(generatedCards);
      setConfig(newConfig);
      setStep(2);
    } catch (error) {
      alert("Hubo un problema generando las flashcards. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCard = (id: string, updates: Partial<FlashcardData>) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que quieres volver al inicio? Se perderá el set actual.")) {
      setConfig(null);
      setCards([]);
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header - No Print */}
      <header className="bg-white border-b border-gray-200 no-print sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => step === 2 && handleReset()}>
            <span className="text-3xl">🎓</span>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 leading-none">
                FlashMaster Chile
              </h1>
              <span className="text-xs text-gray-400 font-medium tracking-wider">ENGLISH TEACHING RESOURCES</span>
            </div>
          </div>
          
          {step === 2 && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="group flex items-center justify-center px-5 py-2.5 border-2 border-red-100 text-red-600 font-bold rounded-lg transition-all hover:bg-red-50 hover:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Empezar de nuevo
              </button>
              
              <button
                onClick={handlePrint}
                className="flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir Set (PDF)
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        {step === 1 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
             <div className="text-center mb-12 max-w-2xl animate-fade-in-up">
                <div className="inline-block p-4 rounded-full bg-blue-50 mb-6">
                  <h1 className="text-3xl font-bold text-blue-700">Hello Teacher!</h1>
                </div>
                <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Create English flashcards <br/>in seconds</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Select your grade level and topic. The system will choose appropriate vocabulary from the Chilean curriculum and automatically search for high-quality educational illustrations.
                </p>
             </div>
             <ConfigForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        )}

        {step === 2 && config && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{config.topic}</h2>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">{config.grade}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-600 font-medium">🇬🇧 Inglés</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-600 font-medium">{config.cardType}</span>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 text-blue-800 px-4 py-3 rounded-xl border border-blue-100 shadow-sm">
                 <span className="text-xl mr-3">💡</span>
                 <p className="text-sm font-medium">
                   Si una foto no corresponde, pasa el mouse sobre ella y pulsa <span className="inline-block bg-white px-1.5 py-0.5 rounded border border-blue-200 mx-1">🔄</span> para buscar otra variante.
                 </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {cards.map((card) => (
                <FlashcardItem
                  key={card.id}
                  data={card}
                  type={config.cardType}
                  onUpdate={handleUpdateCard}
                  showTranslations={config.showTranslations}
                />
              ))}
            </div>
            
            <div className="flex justify-center pt-8 pb-12">
               <p className="text-gray-400 text-sm">¿Todo listo? Pulsa el botón "Imprimir Set" en la barra superior.</p>
            </div>
          </div>
        )}
      </main>

      {/* Hidden Print Layout */}
      {config && <PrintLayout cards={cards} config={config} />}
    </div>
  );
}

export default App;