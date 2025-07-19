import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    description?: string;
  };
}

interface GoogleBooksResponse {
  items?: GoogleBook[];
  totalItems: number;
}

export default function GoogleBooksApiDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBooks([]);

    try {
      // Add manga-related terms to improve manga search results
      const enhancedQuery = `${searchQuery} manga OR comic OR graphic novel`;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(enhancedQuery)}&maxResults=20&printType=books`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GoogleBooksResponse = await response.json();
      setBooks(data.items || []);

      if (!data.items || data.items.length === 0) {
        setError('No books found for your search term');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Google Books API Demo</h1>
        <p className="text-muted-foreground">
          Test the Google Books API to see what manga and book data can be retrieved.
          Try searching for manga titles like "One Piece", "Naruto", or "Attack on Titan".
        </p>
      </div>

      {/* Search Form */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search-input" className="sr-only">
              Search for books
            </Label>
            <Input
              id="search-input"
              type="text"
              placeholder="Enter book or manga title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button
            onClick={searchBooks}
            disabled={isLoading || !searchQuery.trim()}
            className="sm:w-auto w-full"
          >
            {isLoading ? 'Searching...' : 'Search Books'}
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive font-medium">Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Searching for books...</p>
        </div>
      )}

      {/* Results */}
      {books.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Search Results ({books.length} books found)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {/* Book Cover */}
                <div className="mb-4 flex justify-center">
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
                      alt={`Cover of ${book.volumeInfo.title}`}
                      className="w-32 h-48 object-cover rounded shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-32 h-48 bg-muted rounded flex items-center justify-center">
                      <span className="text-muted-foreground text-sm text-center px-2">
                        No Cover Available
                      </span>
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm leading-tight min-h-[2.5rem] overflow-hidden">
                    {book.volumeInfo.title}
                  </h3>

                  {book.volumeInfo.authors && (
                    <p className="text-sm text-muted-foreground truncate">
                      by {book.volumeInfo.authors.join(', ')}
                    </p>
                  )}

                  {book.volumeInfo.publishedDate && (
                    <p className="text-xs text-muted-foreground">
                      Published: {book.volumeInfo.publishedDate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {!isLoading && !error && books.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No results found. Try searching for a different term.
          </p>
        </div>
      )}
    </div>
  );
}