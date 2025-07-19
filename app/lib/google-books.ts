export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    description?: string;
  };
}

export interface GoogleBooksResponse {
  items?: GoogleBook[];
  totalItems: number;
}

export async function searchGoogleBooks(query: string): Promise<GoogleBook[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    // Add manga-related terms to improve manga search results
    const enhancedQuery = `${query} manga OR comic OR graphic novel`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(enhancedQuery)}&maxResults=20&printType=books`,
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GoogleBooksResponse = await response.json();

    // Filter for Comics & Graphic Novels category only
    const comicsAndGraphicNovels = (data.items || []).filter((book) =>
      book.volumeInfo.categories?.some(
        (category) =>
          category.toLowerCase().includes('comics') ||
          category.toLowerCase().includes('graphic novels'),
      ),
    );

    return comicsAndGraphicNovels;
  } catch (error) {
    console.error('Google Books API error:', error);
    throw error;
  }
}

export function getThumbnailUrl(book: GoogleBook): string | null {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
  if (!thumbnail) return null;

  // Ensure HTTPS
  return thumbnail.replace('http:', 'https:');
}
