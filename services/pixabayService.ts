/**
 * Pixabay Image Service
 * Handles image fetching from Pixabay API (ilustraciones y dibujos para niños)
 */

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || "";

/**
 * Fetch an illustration/drawing from Pixabay based on keyword
 */
export async function fetchPixabayImage(
  keyword: string,
  page: number = 1
): Promise<string | undefined> {
  try {
    const apiKey = PIXABAY_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      console.warn("⚠️ PIXABAY_API_KEY no está configurada. Las imágenes no se cargarán.");
      console.warn("💡 Crea un archivo .env con: PIXABAY_API_KEY=tu_key");
      return undefined;
    }

    // Request more images per page to have better selection pool
    const perPage = 20;

    // Search for illustrations/drawings specifically
    // image_type: "illustration" para dibujos e ilustraciones
    // category: "education" para contenido educativo (opcional, puede limitar resultados)
    // safesearch: true para contenido seguro para niños
    // order: "popular" para mejores resultados
    // colors: puede filtrar por color si la keyword contiene un color
    
    // Detectar si es una búsqueda de color y ajustar parámetros
    const colorKeywords = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'black', 'white', 'brown', 'gray', 'grey'];
    const isColorSearch = colorKeywords.some(color => keyword.toLowerCase().startsWith(color));
    
    // Para colores, no usar category=education ya que limita mucho los resultados
    // Para otros temas educativos, usar category=education
    const categoryParam = isColorSearch ? '' : '&category=education';
    
    // Usar la keyword tal como viene del vocabulario
    const searchUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      keyword
    )}&image_type=illustration${categoryParam}&per_page=${perPage}&page=${page}&safesearch=true&order=popular`;

    const response = await fetch(searchUrl);

    if (!response.ok) {
      console.error(`Pixabay API error: ${response.status} - ${response.statusText}`);
      return undefined;
    }

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      // Prefer images from the first half (more relevant), but allow some randomness
      const relevantPool = data.hits.slice(0, Math.ceil(data.hits.length * 0.7));
      const randomIndex = Math.floor(Math.random() * relevantPool.length);
      const hit = relevantPool[randomIndex];

      // Prefer higher quality images
      // Pixabay returns: largeImageURL (1280px), webformatURL (640px), previewURL (150px)
      return hit.largeImageURL || hit.webformatURL || hit.previewURL;
    }

    // If no results found, try fallback strategies
    if (page === 1 && (!data.hits || data.hits.length === 0)) {
      // Strategy 1: Try without category filter (if it was used)
      if (categoryParam) {
        const noCategoryUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
          keyword
        )}&image_type=illustration&per_page=${perPage}&page=1&safesearch=true&order=popular`;
        
        const noCategoryResponse = await fetch(noCategoryUrl);
        if (noCategoryResponse.ok) {
          const noCategoryData = await noCategoryResponse.json();
          if (noCategoryData.hits && noCategoryData.hits.length > 0) {
            const hit = noCategoryData.hits[Math.floor(Math.random() * noCategoryData.hits.length)];
            return hit.largeImageURL || hit.webformatURL || hit.previewURL;
          }
        }
      }
      
      // Strategy 2: For colors, try simple shape-based search
      if (isColorSearch) {
        const colorMatch = keyword.toLowerCase().match(/\b(red|blue|yellow|green|orange|purple|pink|black|white|brown|gray|grey)\b/);
        if (colorMatch) {
          const baseColor = colorMatch[0];
          const shapeKeywords = [`${baseColor} circle`, `${baseColor} square`, `${baseColor} ball`, `${baseColor} color`];
          
          for (const shapeKeyword of shapeKeywords) {
            const shapeUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
              shapeKeyword
            )}&image_type=illustration&per_page=10&page=1&safesearch=true&order=popular`;
            
            const shapeResponse = await fetch(shapeUrl);
            if (shapeResponse.ok) {
              const shapeData = await shapeResponse.json();
              if (shapeData.hits && shapeData.hits.length > 0) {
                const hit = shapeData.hits[Math.floor(Math.random() * shapeData.hits.length)];
                return hit.largeImageURL || hit.webformatURL || hit.previewURL;
              }
            }
          }
        }
      }
    }

    return undefined;
  } catch (error) {
    console.error("Pixabay fetch error:", error);
    return undefined;
  }
}

/**
 * Regenerate card image by fetching from next page
 */
export async function regenerateCardImage(
  keyword: string,
  currentPage: number
): Promise<{ url: string | undefined; page: number }> {
  const nextPage = currentPage + 1;
  const url = await fetchPixabayImage(keyword, nextPage);
  return { url, page: nextPage };
}

