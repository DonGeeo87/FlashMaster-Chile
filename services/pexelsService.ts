/**
 * Pexels Image Service
 * Handles image fetching from Pexels API
 */

// Get API key from environment (Vite replaces process.env.* at build time)
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "";

/**
 * Fetch an image from Pexels based on keyword
 */
export async function fetchPexelsImage(
  keyword: string,
  page: number = 1
): Promise<string | undefined> {
  try {
    const apiKey = PEXELS_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      console.warn("⚠️ PEXELS_API_KEY no está configurada. Las imágenes no se cargarán.");
      console.warn("💡 Crea un archivo .env en la raíz con: PEXELS_API_KEY=tu_key");
      return undefined;
    }

    // Request more images per page to have better selection pool
    const perPage = 20;

    // Improved search parameters for better relevance
    const searchUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      keyword
    )}&per_page=${perPage}&page=${page}&orientation=square&size=medium`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: apiKey,
      },
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
      const simplifiedKeyword = keyword.split(" ").slice(0, 2).join(" "); // Take first 2 words
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
}

/**
 * Regenerate card image by fetching from next page
 */
export async function regenerateCardImage(
  keyword: string,
  currentPage: number
): Promise<{ url: string | undefined; page: number }> {
  // We increment page to get a totally new set of images
  const nextPage = currentPage + 1;
  const url = await fetchPexelsImage(keyword, nextPage);
  return { url, page: nextPage };
}

