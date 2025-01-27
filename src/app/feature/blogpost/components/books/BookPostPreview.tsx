// components/BookPostPreview.tsx
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { BookInfo } from "@/lib/types";

interface BookPostPreviewProps {
  book: BookInfo;
}

export function BookPostPreview({ book }: BookPostPreviewProps) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border bg-card/50">
      <div className="flex gap-4 p-4">
        <div className="relative min-w-[120px]">
          <Image
            src={book.image}
            alt={book.title}
            width={120}
            height={174}
            className="rounded-md object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="text-xs text-muted-foreground">
              {book.publisher} ·{" "}
              {book.pubdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}
            </p>
            <p className="text-sm line-clamp-2 text-muted-foreground">
              {book.description}
            </p>
          </div>
          {book.link && book.link.trim() !== "" && (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => book.link && window.open(book.link, "_blank")}
              >
                <ExternalLink size={14} />
                <span>구매하기</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
