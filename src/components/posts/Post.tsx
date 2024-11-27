// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { MessageSquare } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import Comments from "../comments/Comments";
// import Linkify from "../Linkify";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import BookmarkButton from "./BookmarkButton";
// import LikeButton from "./LikeButton";
// import PostMoreButton from "./PostMoreButton";

// interface PostProps {
//   post: PostData;
// }

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();

//   const [showComments, setShowComments] = useState(false);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={`/users/${post.user.username}`}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={`/users/${post.user.username}`}
//                 className="block font-medium hover:underline"
//               >
//                 {post.user.displayName}
//               </Link>
//             </UserTooltip>
//             <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             >
//               {formatRelativeDate(post.createdAt)}
//             </Link>
//           </div>
//         </div>
//         {post.user.id === user.id && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Linkify>
//         <div className="whitespace-pre-line break-words">{post.content}</div>
//       </Linkify>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some((like) => like.userId === user.id),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser: post.bookmarks.some(
//               (bookmark) => bookmark.userId === user.id,
//             ),
//           }}
//         />
//       </div>
//       {showComments && <Comments post={post} />}
//     </article>
//   );
// }

// interface MediaPreviewsProps {
//   attachments: Media[];
// }

// function MediaPreviews({ attachments }: MediaPreviewsProps) {
//   return (
//     <div
//       className={cn(
//         "flex flex-col gap-3",
//         attachments.length > 1 && "sm:grid sm:grid-cols-2",
//       )}
//     >
//       {attachments.map((m) => (
//         <MediaPreview key={m.id} media={m} />
//       ))}
//     </div>
//   );
// }

// interface MediaPreviewProps {
//   media: Media;
// }

// function MediaPreview({ media }: MediaPreviewProps) {
//   if (media.type === "IMAGE") {
//     return (
//       <Image
//         src={media.url}
//         alt="Attachment"
//         width={500}
//         height={500}
//         className="mx-auto size-fit max-h-[30rem] rounded-2xl"
//       />
//     );
//   }

//   if (media.type === "VIDEO") {
//     return (
//       <div>
//         <video
//           src={media.url}
//           controls
//           className="mx-auto size-fit max-h-[30rem] rounded-2xl"
//         />
//       </div>
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// function CommentButton({ post, onClick }: CommentButtonProps) {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquare className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}{" "}
//         <span className="hidden sm:inline">comments</span>
//       </span>
//     </button>
//   );
// }

// 아래는 원래 코드 11/5 (화)

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, MessageSquare } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef } from "react";
// import Comments from "../comments/Comments";
// import Linkify from "../Linkify";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import BookmarkButton from "./BookmarkButton";
// import LikeButton from "./LikeButton";
// import PostMoreButton from "./PostMoreButton";

// interface PostProps {
//   post: PostData;
// }

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();

//   const [showComments, setShowComments] = useState(false);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={`/users/${post.user.username}`}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={`/users/${post.user.username}`}
//                 className="block font-medium hover:underline"
//               >
//                 {post.user.displayName}
//               </Link>
//             </UserTooltip>
//             <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             >
//               {formatRelativeDate(post.createdAt)}
//             </Link>
//           </div>
//         </div>
//         {post.user.id === user.id && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Linkify>
//         <div className="whitespace-pre-line break-words">{post.content}</div>
//       </Linkify>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some((like) => like.userId === user.id),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser: post.bookmarks.some(
//               (bookmark) => bookmark.userId === user.id,
//             ),
//           }}
//         />
//       </div>
//       {showComments && <Comments post={post} />}
//     </article>
//   );
// }

// interface MediaPreviewsProps {
//   attachments: Media[];
// }

// function MediaPreviews({ attachments }: MediaPreviewsProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showRightButton, setShowRightButton] = useState(false);

//   const handleScroll = () => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 210, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-3 overflow-x-auto scrollbar-hide",
//           attachments.length === 2 && "flex-wrap justify-between",
//           attachments.length >= 3 && "flex-nowrap",
//         )}
//         onScroll={handleScroll}
//       >
//         {attachments.map((m, index) => (
//           <MediaPreview
//             key={m.id}
//             media={m}
//             totalCount={attachments.length}
//             index={index}
//           />
//         ))}
//       </div>
//       {attachments.length >= 3 && showRightButton && (
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         >
//           <ChevronRight size={24} />
//         </button>
//       )}
//     </div>
//   );
// }

// interface MediaPreviewProps {
//   media: Media;
//   totalCount: number;
//   index: number;
// }

// function MediaPreview({ media, totalCount, index }: MediaPreviewProps) {
//   let width, height;
//   if (totalCount === 1) {
//     width = 543;
//     height = 300;
//   } else if (totalCount === 2) {
//     width = 250;
//     height = 330;
//   } else {
//     width = 210;
//     height = 280;
//   }

//   if (media.type === "IMAGE") {
//     return (
//       <Image
//         src={media.url}
//         alt={`Attachment ${index + 1}`}
//         width={width}
//         height={height}
//         className={cn(
//           "rounded-2xl object-cover",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//       />
//     );
//   }

//   if (media.type === "VIDEO") {
//     return (
//       <video
//         src={media.url}
//         controls
//         className={cn(
//           "rounded-2xl object-cover",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// function CommentButton({ post, onClick }: CommentButtonProps) {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquare className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}{" "}
//         <span className="hidden sm:inline">comments</span>
//       </span>
//     </button>
//   );
// }

// chatgpt 모달창 코드 1 //
// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, MessageSquare, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef } from "react";
// import Comments from "../comments/Comments";
// import Linkify from "../Linkify";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import BookmarkButton from "./BookmarkButton";
// import LikeButton from "./LikeButton";
// import PostMoreButton from "./PostMoreButton";

// // Modal 컴포넌트 정의
// function Modal({
//   isOpen,
//   onClose,
//   children,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative bg-white rounded-lg p-5 max-w-3xl mx-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           <X size={24} />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }

// interface PostProps {
//   post: PostData;
// }

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();
//   const [showComments, setShowComments] = useState(false);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={`/users/${post.user.username}`}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={`/users/${post.user.username}`}
//                 className="block font-medium hover:underline"
//               >
//                 {post.user.displayName}
//               </Link>
//             </UserTooltip>
//             <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             >
//               {formatRelativeDate(post.createdAt)}
//             </Link>
//           </div>
//         </div>
//         {post.user.id === user.id && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Linkify>
//         <div className="whitespace-pre-line break-words">{post.content}</div>
//       </Linkify>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some((like) => like.userId === user.id),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser: post.bookmarks.some(
//               (bookmark) => bookmark.userId === user.id,
//             ),
//           }}
//         />
//       </div>
//       {showComments && <Comments post={post} />}
//     </article>
//   );
// }

// interface MediaPreviewsProps {
//   attachments: Media[];
// }

// function MediaPreviews({ attachments }: MediaPreviewsProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showRightButton, setShowRightButton] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

//   const handleScroll = () => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 210, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-3 overflow-x-auto scrollbar-hide",
//           attachments.length === 2 && "flex-wrap justify-between",
//           attachments.length >= 3 && "flex-nowrap",
//         )}
//         onScroll={handleScroll}
//       >
//         {attachments.map((m, index) => (
//           <MediaPreview
//             key={m.id}
//             media={m}
//             totalCount={attachments.length}
//             index={index}
//             onClick={() => setSelectedMedia(m)}
//           />
//         ))}
//       </div>
//       {attachments.length >= 3 && showRightButton && (
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         >
//           <ChevronRight size={24} />
//         </button>
//       )}
//       <Modal isOpen={!!selectedMedia} onClose={() => setSelectedMedia(null)}>
//         {selectedMedia && (
//           <Image
//             src={selectedMedia.url}
//             alt="Enlarged media"
//             width={800}
//             height={800}
//             className="rounded-lg"
//           />
//         )}
//       </Modal>
//     </div>
//   );
// }

// interface MediaPreviewProps {
//   media: Media;
//   totalCount: number;
//   index: number;
//   onClick: () => void;
// }

// function MediaPreview({
//   media,
//   totalCount,
//   index,
//   onClick,
// }: MediaPreviewProps) {
//   let width, height;
//   if (totalCount === 1) {
//     width = 543;
//     height = 300;
//   } else if (totalCount === 2) {
//     width = 250;
//     height = 330;
//   } else {
//     width = 210;
//     height = 280;
//   }

//   if (media.type === "IMAGE") {
//     return (
//       <Image
//         src={media.url}
//         alt={`Attachment ${index + 1}`}
//         width={width}
//         height={height}
//         className={cn(
//           "rounded-2xl object-cover",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//         onClick={onClick}
//       />
//     );
//   }

//   if (media.type === "VIDEO") {
//     return (
//       <video
//         src={media.url}
//         controls
//         className={cn(
//           "rounded-2xl object-cover",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// function CommentButton({ post, onClick }: CommentButtonProps) {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquare className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}{" "}
//         <span className="hidden sm:inline">comments</span>
//       </span>
//     </button>
//   );
// }

// chatgpt 요구사항 : 모달창 생성, 여러 사진 게시물의 경우 클릭하면 과도한 크기제한, 모달 창 외부 클릭시 닫히기

"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { PostData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import { ChevronRight, MessageSquareText, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Comments from "../comments/Comments";
import Linkify from "../Linkify";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import PostMoreButton from "./PostMoreButton";
import CommentButton from "../comments/CommentButton";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium text-sm hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            {/* <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            > */}
            <div className="block text-xs text-muted-foreground">
              {formatRelativeDate(post.createdAt)}
            </div>
            {/* </Link> */}
          </div>
        </div>
        {post.user.id === user?.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Link
        href={`/posts/${post.id}`}
        className="block text-sm"
        // className="block text-sm text-muted-foreground hover:underline"
        suppressHydrationWarning
      >
        <Linkify>
          <div className="whitespace-pre-line break-words">{post.content}</div>
        </Linkify>
      </Link>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5 ">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some(
                (like) => like.userId === user?.id,
              ),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
          {/* <ViewCounter
            postId={post.id}
            initialState={{
              views: post._count.views,
              hasViewedByUser: post.views.some(
                (view) => view.userId === user.id,
              ),
            }}
          /> */}
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user?.id,
            ),
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showRightButton, setShowRightButton] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 210, behavior: "smooth" });
    }
  };

  const handleMediaClick = (media: Media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={cn(
          "flex gap-1 overflow-x-auto scrollbar-hide",
          // attachments.length === 2 && "flex-wrap justify-between",
          attachments.length >= 3 && "flex-nowrap",
        )}
        onScroll={handleScroll}
      >
        {attachments.map((m, index) => (
          <MediaPreview
            key={m.id}
            media={m}
            totalCount={attachments.length}
            index={index}
            onClick={() => handleMediaClick(m)}
          />
        ))}
      </div>
      {attachments.length >= 2 && showRightButton && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      )}
      {selectedMedia && (
        <MediaModal media={selectedMedia} onClose={handleCloseModal} />
      )}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
  totalCount: number;
  index: number;
  onClick: () => void;
}

function MediaPreview({
  media,
  totalCount,
  index,
  onClick,
}: MediaPreviewProps) {
  let width, height;
  if (totalCount === 1) {
    width = 543;
    height = 300;
  } else if (totalCount === 2) {
    width = 543;
    height = 300;
  } else {
    width = 210;
    height = 280;
  }

  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt={`Attachment ${index + 1}`}
        width={width}
        height={height}
        className={cn(
          "rounded-2xl object-cover cursor-pointer",
          totalCount >= 3 && "flex-shrink-0",
        )}
        style={{ width, height }}
        onClick={onClick}
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <video
        src={media.url}
        controls
        className={cn(
          "rounded-2xl object-cover cursor-pointer",
          totalCount >= 3 && "flex-shrink-0",
        )}
        style={{ width, height }}
        onClick={onClick}
      />
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

interface MediaModalProps {
  media: Media;
  onClose: () => void;
}

function MediaModal({ media, onClose }: MediaModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {media.type === "IMAGE" && (
          <Image
            src={media.url}
            alt="Attachment"
            width={640}
            height={640}
            className="max-w-full max-h-full object-contain"
          />
        )}
        {media.type === "VIDEO" && (
          <video src={media.url} controls className="max-w-full max-h-full" />
        )}
      </div>
    </div>
  );
}

// cluade 24/11/16(토) post 속도 개선 파트 1
// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, MessageSquareText, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef, memo, useCallback, useEffect } from "react";
// import Comments from "../comments/Comments";
// import Linkify from "../Linkify";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import BookmarkButton from "./BookmarkButton";
// import LikeButton from "./LikeButton";
// import PostMoreButton from "./PostMoreButton";

// interface PostProps {
//   post: PostData;
// }

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// interface MediaPreviewProps {
//   media: Media;
//   totalCount: number;
//   index: number;
//   onClick: () => void;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// interface MediaPreviewsProps {
//   attachments: Media[];
// }

// const CommentButton = memo(({ post, onClick }: CommentButtonProps) => {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquareText className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}
//         <span className="hidden sm:inline"></span>
//       </span>
//     </button>
//   );
// });
// CommentButton.displayName = "CommentButton";

// const MediaPreview = memo(
//   ({ media, totalCount, index, onClick }: MediaPreviewProps) => {
//     let dimensions;
//     if (totalCount === 1) {
//       dimensions = { width: 543, height: 300 };
//     } else if (totalCount === 2) {
//       dimensions = { width: 250, height: 330 };
//     } else {
//       dimensions = { width: 210, height: 280 };
//     }

//     if (media.type === "IMAGE") {
//       return (
//         <div
//           className={cn(
//             "relative rounded-2xl overflow-hidden cursor-pointer",
//             totalCount >= 3 && "flex-shrink-0",
//           )}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           onClick={onClick}
//         >
//           <Image
//             src={media.url}
//             alt={`Attachment ${index + 1}`}
//             fill
//             sizes={`(max-width: 768px) 100vw, ${dimensions.width}px`}
//             className="object-cover"
//             priority={index === 0}
//             loading={index === 0 ? "eager" : "lazy"}
//           />
//         </div>
//       );
//     }

//     if (media.type === "VIDEO") {
//       return (
//         <video
//           src={media.url}
//           controls
//           className={cn(
//             "rounded-2xl object-cover cursor-pointer",
//             totalCount >= 3 && "flex-shrink-0",
//           )}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           onClick={onClick}
//         />
//       );
//     }

//     return <p className="text-destructive">Unsupported media type</p>;
//   },
// );
// MediaPreview.displayName = "MediaPreview";

// const MediaModal = memo(({ media, onClose }: MediaModalProps) => {
//   const handleContentClick = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={handleContentClick}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <div className="relative w-full h-[80vh]">
//             <Image
//               src={media.url}
//               alt="Attachment"
//               fill
//               className="object-contain"
//               sizes="(max-width: 1200px) 100vw, 1200px"
//               priority
//             />
//           </div>
//         )}
//         {media.type === "VIDEO" && (
//           <video
//             src={media.url}
//             controls
//             className="max-w-full max-h-full"
//             preload="metadata"
//           />
//         )}
//       </div>
//     </div>
//   );
// });
// MediaModal.displayName = "MediaModal";

// const MediaPreviews = memo(({ attachments }: MediaPreviewsProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showRightButton, setShowRightButton] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   }, [attachments]);

//   const handleScroll = useCallback(() => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   }, []);

//   const scrollRight = useCallback(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 210, behavior: "smooth" });
//     }
//   }, []);

//   const handleMediaClick = useCallback((media: Media) => {
//     setSelectedMedia(media);
//   }, []);

//   const handleCloseModal = useCallback(() => {
//     setSelectedMedia(null);
//   }, []);

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-3 overflow-x-auto scrollbar-hide",
//           attachments.length === 2 && "flex-wrap justify-between",
//           attachments.length >= 3 && "flex-nowrap",
//         )}
//         onScroll={handleScroll}
//       >
//         {attachments.map((m, index) => (
//           <MediaPreview
//             key={m.id}
//             media={m}
//             totalCount={attachments.length}
//             index={index}
//             onClick={() => handleMediaClick(m)}
//           />
//         ))}
//       </div>
//       {attachments.length >= 3 && showRightButton && (
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         >
//           <ChevronRight size={24} />
//         </button>
//       )}
//       {selectedMedia && (
//         <MediaModal media={selectedMedia} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// });
// MediaPreviews.displayName = "MediaPreviews";

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();
//   const [showComments, setShowComments] = useState(false);

//   const toggleComments = useCallback(() => {
//     setShowComments((prev) => !prev);
//   }, []);

//   const isPostOwner = post.user.id === user.id;
//   const isLikedByUser = post.likes.some((like) => like.userId === user.id);
//   const isBookmarkedByUser = post.bookmarks.some(
//     (bookmark) => bookmark.userId === user.id,
//   );

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={`/users/${post.user.username}`}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={`/users/${post.user.username}`}
//                 className="block font-medium hover:underline"
//               >
//                 {post.user.displayName}
//               </Link>
//             </UserTooltip>
//             <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             >
//               {formatRelativeDate(post.createdAt)}
//             </Link>
//           </div>
//         </div>
//         {isPostOwner && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Linkify>
//         <div className="whitespace-pre-line break-words">{post.content}</div>
//       </Linkify>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser,
//             }}
//           />
//           <CommentButton post={post} onClick={toggleComments} />
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser,
//           }}
//         />
//       </div>
//       {showComments && <Comments post={post} />}
//     </article>
//   );
// }

// claude 24/11/16(토) 응답속도 개선
// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, MessageSquareText, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef, memo, useCallback, useEffect, useMemo } from "react";
// import Comments from "../comments/Comments";
// import Linkify from "../Linkify";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import BookmarkButton from "./BookmarkButton";
// import LikeButton from "./LikeButton";
// import PostMoreButton from "./PostMoreButton";

// interface PostProps {
//   post: PostData;
// }

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// interface MediaPreviewProps {
//   media: Media;
//   totalCount: number;
//   index: number;
//   onClick: () => void;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// interface MediaPreviewsProps {
//   attachments: Media[];
// }

// const CommentButton = memo(({ post, onClick }: CommentButtonProps) => {
//   return (
//     <button onClick={onClick} className="flex items-center gap-2">
//       <MessageSquareText className="size-5" />
//       <span className="text-sm font-medium tabular-nums">
//         {post._count.comments}
//         <span className="hidden sm:inline"></span>
//       </span>
//     </button>
//   );
// });
// CommentButton.displayName = "CommentButton";

// const MediaPreview = memo(
//   ({ media, totalCount, index, onClick }: MediaPreviewProps) => {
//     const dimensions =
//       totalCount === 1
//         ? { width: 543, height: 300 }
//         : totalCount === 2
//           ? { width: 250, height: 330 }
//           : { width: 210, height: 280 };

//     if (media.type === "IMAGE") {
//       return (
//         <div
//           className={cn(
//             "relative rounded-2xl overflow-hidden cursor-pointer",
//             totalCount >= 3 && "flex-shrink-0",
//           )}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           onClick={onClick}
//         >
//           <Image
//             src={media.url}
//             alt={`Attachment ${index + 1}`}
//             fill
//             sizes={`(max-width: 768px) 100vw, ${dimensions.width}px`}
//             className="object-cover"
//             priority={index === 0}
//             loading={index === 0 ? "eager" : "lazy"}
//           />
//         </div>
//       );
//     }

//     if (media.type === "VIDEO") {
//       return (
//         <video
//           src={media.url}
//           controls
//           className={cn(
//             "rounded-2xl object-cover cursor-pointer",
//             totalCount >= 3 && "flex-shrink-0",
//           )}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           onClick={onClick}
//           preload="metadata"
//         />
//       );
//     }

//     return <p className="text-destructive">Unsupported media type</p>;
//   },
// );
// MediaPreview.displayName = "MediaPreview";

// const MediaModal = memo(({ media, onClose }: MediaModalProps) => {
//   const handleContentClick = useCallback((e: React.MouseEvent) => {
//     e.stopPropagation();
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={handleContentClick}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <div className="relative w-full h-[80vh]">
//             <Image
//               src={media.url}
//               alt="Attachment"
//               fill
//               className="object-contain"
//               sizes="(max-width: 1200px) 100vw, 1200px"
//               priority
//             />
//           </div>
//         )}
//         {media.type === "VIDEO" && (
//           <video
//             src={media.url}
//             controls
//             className="max-w-full max-h-full"
//             preload="metadata"
//           />
//         )}
//       </div>
//     </div>
//   );
// });
// MediaModal.displayName = "MediaModal";

// const MediaPreviews = memo(({ attachments }: MediaPreviewsProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [showRightButton, setShowRightButton] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

//   const containerClasses = useMemo(
//     () =>
//       cn(
//         "flex gap-3 overflow-x-auto scrollbar-hide",
//         attachments.length === 2 && "flex-wrap justify-between",
//         attachments.length >= 3 && "flex-nowrap",
//       ),
//     [attachments.length],
//   );

//   useEffect(() => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   }, [attachments]);

//   const handleScroll = useCallback(() => {
//     if (containerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
//       setShowRightButton(scrollLeft + clientWidth < scrollWidth);
//     }
//   }, []);

//   const scrollRight = useCallback(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 210, behavior: "smooth" });
//     }
//   }, []);

//   const handleMediaClick = useCallback((media: Media) => {
//     setSelectedMedia(media);
//   }, []);

//   const handleCloseModal = useCallback(() => {
//     setSelectedMedia(null);
//   }, []);

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={containerClasses}
//         onScroll={handleScroll}
//       >
//         {attachments.map((m, index) => (
//           <MediaPreview
//             key={m.id}
//             media={m}
//             totalCount={attachments.length}
//             index={index}
//             onClick={() => handleMediaClick(m)}
//           />
//         ))}
//       </div>
//       {attachments.length >= 3 && showRightButton && (
//         <button
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//         >
//           <ChevronRight size={24} />
//         </button>
//       )}
//       {selectedMedia && (
//         <MediaModal media={selectedMedia} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// });
// MediaPreviews.displayName = "MediaPreviews";

// // Post cache for optimizing data fetching
// const postCache = new Map<string, PostData>();

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();
//   const [showComments, setShowComments] = useState(false);

//   // Memoize frequently accessed user-related data
//   const userRelatedData = useMemo(
//     () => ({
//       isPostOwner: post.user.id === user.id,
//       isLikedByUser: post.likes.some((like) => like.userId === user.id),
//       isBookmarkedByUser: post.bookmarks.some(
//         (bookmark) => bookmark.userId === user.id,
//       ),
//     }),
//     [post.user.id, user.id, post.likes, post.bookmarks],
//   );

//   // Memoize post metadata that's used in multiple places
//   const postMetadata = useMemo(
//     () => ({
//       formattedDate: formatRelativeDate(post.createdAt),
//       userDisplayName: post.user.displayName,
//       username: post.user.username,
//     }),
//     [post.createdAt, post.user.displayName, post.user.username],
//   );

//   const toggleComments = useCallback(() => {
//     setShowComments((prev) => !prev);
//   }, []);

//   // Cache the post data for future use
//   useEffect(() => {
//     if (!postCache.has(post.id)) {
//       postCache.set(post.id, post);
//     }
//   }, [post]);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={`/users/${postMetadata.username}`}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={`/users/${postMetadata.username}`}
//                 className="block font-medium hover:underline"
//               >
//                 {postMetadata.userDisplayName}
//               </Link>
//             </UserTooltip>
//             <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             >
//               {postMetadata.formattedDate}
//             </Link>
//           </div>
//         </div>
//         {userRelatedData.isPostOwner && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Linkify>
//         <div className="whitespace-pre-line break-words">{post.content}</div>
//       </Linkify>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: userRelatedData.isLikedByUser,
//             }}
//           />
//           <CommentButton post={post} onClick={toggleComments} />
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser: userRelatedData.isBookmarkedByUser,
//           }}
//         />
//       </div>
//       {showComments && <Comments post={post} />}
//     </article>
//   );
// }
