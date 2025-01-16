"use client";
// components/WriteButton.tsx

import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

interface WriteButtonProps {
  className?: string;
}

export default function WriteButton({ className }: WriteButtonProps) {
  const handleWriteClick = () => {
    const editor = document.querySelector(".ProseMirror");
    if (editor) {
      editor.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        (editor as HTMLElement).focus();
      }, 100);
    }
  };

  return (
    <Button
      variant="ghost"
      className={className}
      title="글쓰기"
      onClick={handleWriteClick}
    >
      <PenSquare />
    </Button>
  );
}
