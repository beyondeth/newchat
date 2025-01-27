"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import Image from "next/image";

import { BookInfo } from "@/lib/types";

interface BookSearchProps {
  onBookSelect?: (book: BookInfo | null) => void;
  initialBook?: BookInfo | null; // 초기 책 상태 추가
}

export default function BookSearch({
  onBookSelect,
  initialBook,
}: BookSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(
    initialBook || null,
  );

  const searchBooks = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/books?query=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookSelect = (book: BookInfo) => {
    setSelectedBook(book);
    setBooks([]);
    setSearchQuery("");
    if (onBookSelect) {
      onBookSelect(book);
    }
  };

  const clearSelection = () => {
    setSelectedBook(null);
    if (onBookSelect) {
      onBookSelect(null);
    }
  };

  if (selectedBook) {
    return (
      <div className="relative rounded-lg border p-3">
        <div className="flex gap-3">
          <Image
            src={selectedBook.image}
            alt={selectedBook.title}
            width={60}
            height={80}
            className="h-20 w-15 rounded object-cover"
          />
          <div className="flex-1">
            <h3
              className="font-semibold"
              dangerouslySetInnerHTML={{ __html: selectedBook.title }}
            />
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: selectedBook.author }}
            />
            <p className="text-xs text-muted-foreground">
              {selectedBook.publisher} (
              {selectedBook.pubdate.replace(
                /(\d{4})(\d{2})(\d{2})/,
                "$1-$2-$3",
              )}
              )
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={clearSelection}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="책 검색하기 (선택옵션)"
          className="pr-24"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchBooks(searchQuery);
            }
          }}
        />
        <Button
          type="button"
          onClick={() => searchBooks(searchQuery)}
          disabled={isLoading}
          className="absolute right-0 top-0 rounded-l-none"
          size="default"
        >
          {isLoading ? "검색중..." : "검색"}
        </Button>
      </div>

      {books.length > 0 && (
        <div className="max-h-64 overflow-y-auto rounded-lg border bg-background p-2">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-muted"
              onClick={() => handleBookSelect(book)}
            >
              <Image
                src={book.image}
                alt={book.title}
                width={40}
                height={60}
                className="h-15 w-10 rounded object-cover"
              />
              <div className="flex-1 text-sm">
                <h4
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: book.title }}
                />
                <p
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: book.author }}
                />
                <p className="text-xs text-muted-foreground">
                  {book.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
