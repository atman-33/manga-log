import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Loader2, Search, BookOpen } from 'lucide-react';
import { searchGoogleBooks, getThumbnailUrl, type GoogleBook } from '~/lib/google-books';

interface GoogleBooksSearchProps {
  onSelectBook: (title: string, thumbnail?: string) => void;
}

export function GoogleBooksSearch({ onSelectBook }: GoogleBooksSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBooks([]);

    try {
      const results = await searchGoogleBooks(searchQuery);
      setBooks(results);
      setIsExpanded(true);

      if (results.length === 0) {
        setError('No manga or comics found for your search term');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelectBook = (book: GoogleBook) => {
    const thumbnail = getThumbnailUrl(book);
    onSelectBook(book.volumeInfo.title, thumbnail || undefined);
    setIsExpanded(false);
    setBooks([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        <span>Search for manga titles to auto-fill</span>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="google-books-search" className="sr-only">
            Search for manga titles
          </Label>
          <Input
            id="google-books-search"
            type="text"
            placeholder="Search manga titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          size="icon"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Search Results */}
      {isExpanded && books.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Search Results ({books.length} found)
            </h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              Hide Results
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {books.map((book) => (
              <Card
                key={book.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectBook(book)}
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      {getThumbnailUrl(book) ? (
                        <img
                          src={getThumbnailUrl(book)!}
                          alt={`Cover of ${book.volumeInfo.title}`}
                          className="w-12 h-16 object-cover rounded shadow-sm"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-muted rounded flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                        {book.volumeInfo.title}
                      </h5>

                      {book.volumeInfo.authors && (
                        <p className="text-xs text-muted-foreground truncate mb-1">
                          by {book.volumeInfo.authors.join(', ')}
                        </p>
                      )}

                      {book.volumeInfo.publishedDate && (
                        <Badge variant="secondary" className="text-xs">
                          {book.volumeInfo.publishedDate}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}