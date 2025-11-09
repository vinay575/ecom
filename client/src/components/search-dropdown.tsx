import { useState, useEffect, useRef } from "react";
import { Search, Mic, X } from "lucide-react";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
}

export function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
          setIsLoading(false);
        })
        .catch(() => {
          setResults([]);
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-20"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded">
          <Mic className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg max-h-96 overflow-auto z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Searching...</div>
            ) : results.length > 0 ? (
              <div className="p-2">
                {results.map((result) => (
                  <a
                    key={result.id}
                    href={`/products/${result.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="h-12 w-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-sm text-muted-foreground">{result.category}</p>
                    </div>
                    <p className="font-semibold">{result.price}</p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">No results found</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
