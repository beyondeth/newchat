"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, BookOpenText, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BookInfo } from "@/lib/types";

interface UnifiedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnifiedSearch({ isOpen, onClose }: UnifiedSearchProps) {
  const router = useRouter();
  const [siteSearchQuery, setSiteSearchQuery] = useState("");
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [isSiteSearchActive, setIsSiteSearchActive] = useState(false);
  const [isBookSearchActive, setIsBookSearchActive] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

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

  const handleSiteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSearchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(siteSearchQuery)}`);
    setIsSiteSearchActive(false);
  };

  const handleBookSelect = (book: BookInfo) => {
    setSelectedBook(book);
    setBooks([]);
    setBookSearchQuery("");
    setExpandedDescription(false);
  };

  const renderDescription = (description: string) => {
    const MAX_LENGTH = 200;
    if (description.length <= MAX_LENGTH || expandedDescription) {
      return description;
    }
    return description.slice(0, MAX_LENGTH) + "...";
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex items-center space-x-2 ">
        <div className="relative flex items-center w-30 h-9">
          {isSiteSearchActive ? (
            <Input
              type="text"
              value={siteSearchQuery}
              onChange={(e) => setSiteSearchQuery(e.target.value)}
              placeholder="검색어 입력"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSiteSearch(e);
                }
              }}
              autoFocus
            />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setIsSiteSearchActive(true)}
            >
              <SearchIcon size={16} className="mr-2 text-gray-400" />
              <span className="text-gray-400">웹</span>
            </Button>
          )}
        </div>

        <div className="relative flex items-center w-30 h-9">
          {isBookSearchActive ? (
            <Input
              type="text"
              value={bookSearchQuery}
              onChange={(e) => setBookSearchQuery(e.target.value)}
              placeholder="책 검색"
              className="w-30"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchBooks(bookSearchQuery);
                }
              }}
              autoFocus
            />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setIsBookSearchActive(true)}
            >
              <BookOpenText size={16} className="mr-2  text-gray-400" />
              <span className="text-gray-400">책</span>
            </Button>
          )}
        </div>

        {/* 책 검색 모달 */}
        {books.length > 0 && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-8">
            <div className="bg-white rounded-lg shadow-xl max-w-sm mx-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">책 검색 결과</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBooks([])}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => handleBookSelect(book)}
                  >
                    <div className="flex space-x-4">
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={80}
                        height={120}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h3
                          className="font-semibold"
                          dangerouslySetInnerHTML={{ __html: book.title }}
                        />
                        <p
                          className="text-sm text-gray-600"
                          dangerouslySetInnerHTML={{ __html: book.author }}
                        />
                        <p className="text-xs text-gray-500">
                          {book.publisher}
                        </p>
                      </div>
                    </div>
                    {book.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 선택된 책 상세 모달 */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 md:p-8">
            <div className="bg-white rounded-lg shadow-xl max-w-sm mx-auto p-6">
              <div className="flex space-x-4 mb-4">
                <Image
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  width={100}
                  height={150}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3
                    className="font-semibold"
                    dangerouslySetInnerHTML={{ __html: selectedBook.title }}
                  />
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: selectedBook.author }}
                  />
                  <p className="text-xs text-gray-500">
                    {selectedBook.publisher} (
                    {selectedBook.pubdate.replace(
                      /(\d{4})(\d{2})(\d{2})/,
                      "$1-$2-$3",
                    )}
                    )
                  </p>
                </div>
              </div>

              {selectedBook.description && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">책 소개</h4>
                  <p className="text-sm text-gray-600">
                    {renderDescription(selectedBook.description)}
                    {selectedBook.description.length > 200 &&
                      !expandedDescription && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setExpandedDescription(true)}
                          className="text-blue-500 ml-2"
                        >
                          더보기
                        </Button>
                      )}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                {selectedBook.link && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(selectedBook.link!, "_blank")}
                  >
                    구매하기
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBook(null)}
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button variant="ghost" onClick={onClose}>
        닫기
      </Button>
    </div>
  ) : null;
}
