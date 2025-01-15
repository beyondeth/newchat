// import { PostData } from "@/lib/types";
// import { Loader2, SendHorizonal } from "lucide-react";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useSubmitCommentMutation } from "./mutations";

// interface CommentInputProps {
//   post: PostData;
// }

// export default function CommentInput({ post }: CommentInputProps) {
//   const [input, setInput] = useState("");

//   const mutation = useSubmitCommentMutation(post.id);

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!input) return;

//     mutation.mutate(
//       {
//         post,
//         content: input,
//       },
//       {
//         onSuccess: () => setInput(""),
//       },
//     );
//   }

//   return (
//     <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
//       <Input
//         placeholder="댓글을 남겨보세요..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         autoFocus
//       />
//       <Button
//         type="submit"
//         variant="ghost"
//         size="icon"
//         disabled={!input.trim() || mutation.isPending}
//       >
//         {!mutation.isPending ? (
//           <SendHorizonal />
//         ) : (
//           <Loader2 className="animate-spin" />
//         )}
//       </Button>
//     </form>
//   );
// }

// import { PostData } from "@/lib/types";
// import { Loader2, SendHorizonal } from "lucide-react";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useSubmitCommentMutation } from "./mutations";

// interface CommentInputProps {
//   post: PostData;
//   parentId?: string;
//   onSuccess?: () => void;
//   onCancel?: () => void;
//   placeholder?: string;
// }

// export default function CommentInput({
//   post,
//   parentId,
//   onSuccess,
//   onCancel,
//   placeholder = "댓글을 입력하세요...",
// }: CommentInputProps) {
//   const [content, setContent] = useState("");
//   const mutation = useSubmitCommentMutation(post.id);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!content.trim()) return;

//     mutation.mutate(
//       {
//         post,
//         content,
//         parentId,
//       },
//       {
//         onSuccess: () => {
//           setContent("");
//           onSuccess?.();
//         },
//       },
//     );
//   };

//   return (
//     <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
//       <Input
//         placeholder={placeholder}
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         autoFocus
//       />
//       <Button
//         type="submit"
//         variant="ghost"
//         size="icon"
//         disabled={!content.trim() || mutation.isPending}
//       >
//         {mutation.isPending ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <SendHorizonal className="h-4 w-4" />
//         )}
//       </Button>
//     </form>
//   );
// }

import { PostData } from "@/lib/types";
import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSubmitCommentMutation } from "./mutations";

interface CommentInputProps {
  post: PostData;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

export default function CommentInput({
  post,
  parentId,
  onSuccess,
  onCancel,
  placeholder = "댓글을 입력하세요...",
}: CommentInputProps) {
  const [content, setContent] = useState("");
  const mutation = useSubmitCommentMutation(post.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutation.mutate(
      {
        post,
        content,
        parentId,
      },
      {
        onSuccess: () => {
          setContent(""); // 입력 필드 초기화
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!content.trim() || mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SendHorizonal className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
