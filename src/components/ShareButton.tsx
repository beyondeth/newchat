// // components/posts/ShareButton.tsx
// import { Share2 } from "lucide-react";
// import { useToast } from "./ui/use-toast";

// interface ShareButtonProps {
//   postId: string;
// }

// export default function ShareButton({ postId }: ShareButtonProps) {
//   const { toast } = useToast();

//   const handleShare = async () => {
//     const url = `${window.location.origin}/posts/${postId}`;

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           url: url,
//         });
//       } else {
//         await navigator.clipboard.writeText(url);
//         toast({
//           description: "링크가 클립보드에 복사되었습니다.",
//         });
//       }
//     } catch (error) {
//       if (error instanceof Error && error.name !== "AbortError") {
//         toast({
//           variant: "destructive",
//           description: "공유하기에 실패했습니다.",
//         });
//       }
//     }
//   };

//   return (
//     <button
//       onClick={handleShare}
//       className="flex items-center gap-2 p-1 rounded-sm transition-colors duration-200 hover:bg-gray-100"
//     >
//       <Share2 className="size-4" />
//     </button>
//   );
// }

// components/posts/ShareButton.tsx
import { Share2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ShareButtonProps {
  postId: string;
}

export default function ShareButton({ postId }: ShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = `${window.location.origin}/posts/${postId}`;

    try {
      await navigator.clipboard.writeText(url);
      toast({
        description: "클립보드에 링크가 복사되었습니다.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "링크 복사에 실패했습니다.",
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 p-1 rounded-sm transition-colors duration-200 hover:bg-gray-100"
      title="공유하기"
    >
      <Share2 className="size-4" />
    </button>
  );
}
