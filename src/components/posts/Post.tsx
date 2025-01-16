// // chatgpt 요구사항 : 모달창 생성, 여러 사진 게시물의 경우 클릭하면 과도한 크기제한, 모달 창 외부 클릭시 닫히기

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, Eye, MessageSquareText, X } from "lucide-react";
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
// import CommentButton from "../comments/CommentButton";
// import ShareButton from "../ShareButton";

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
//             <Link href={user ? `/users/${post.user.username}` : "/login"}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <UserTooltip user={post.user}>
//               <Link
//                 href={user ? `/users/${post.user.username}` : "/login"}
//                 className="block font-medium text-sm hover:underline"
//               >
//                 {post.user.displayName}
//               </Link>
//             </UserTooltip>
//             {/* <Link
//               href={`/posts/${post.id}`}
//               className="block text-sm text-muted-foreground hover:underline"
//               suppressHydrationWarning
//             > */}
//             <div className="block text-xs text-muted-foreground">
//               {formatRelativeDate(post.createdAt)}
//             </div>
//             {/* </Link> */}
//           </div>
//         </div>
//         {post.user.id === user?.id && (
//           <PostMoreButton
//             post={post}
//             className="opacity-0 transition-opacity group-hover/post:opacity-100"
//           />
//         )}
//       </div>
//       <Link
//         href={user ? `/posts/${post.id}` : "/login"}
//         className="block text-sm"
//         // className="block text-sm text-muted-foreground hover:underline"
//         suppressHydrationWarning
//       >
//         <Linkify>
//           <div className="whitespace-pre-line break-words">{post.content}</div>
//         </Linkify>
//       </Link>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5 ">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some(
//                 (like) => like.userId === user?.id,
//               ),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//           {/* 조회수 */}
//           <div className="flex items-center gap-2">
//             <Eye className="size-4" />
//             <div className="text-xs font-medium tabular-nums">
//               {post.viewCount}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {" "}
//           {/* 수정된 부분 */}
//           <ShareButton postId={post.id} />
//           <BookmarkButton
//             postId={post.id}
//             initialState={{
//               isBookmarkedByUser: post.bookmarks.some(
//                 (bookmark) => bookmark.userId === user?.id,
//               ),
//             }}
//           />
//         </div>
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

//   const handleMediaClick = (media: Media) => {
//     setSelectedMedia(media);
//   };

//   const handleCloseModal = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-1 overflow-x-auto scrollbar-hide",
//           // attachments.length === 2 && "flex-wrap justify-between",
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
//       {attachments.length >= 2 && showRightButton && (
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
//     width = 543;
//     height = 300;
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
//           "rounded-2xl object-cover cursor-pointer",
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
//           "rounded-2xl object-cover cursor-pointer",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//         onClick={onClick}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// function MediaModal({ media, onClose }: MediaModalProps) {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <Image
//             src={media.url}
//             alt="Attachment"
//             width={640}
//             height={640}
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//         {media.type === "VIDEO" && (
//           <video src={media.url} controls className="max-w-full max-h-full" />
//         )}
//       </div>
//     </div>
//   );
// }

// 250113 책,저자 추가 //
// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, Eye, MessageSquareText, X } from "lucide-react";
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
// import CommentButton from "../comments/CommentButton";
// import ShareButton from "../ShareButton";

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
//             <Link href={user ? `/users/${post.user.username}` : "/login"}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <div className="flex items-center gap-3">
//               <UserTooltip user={post.user}>
//                 <Link
//                   href={user ? `/users/${post.user.username}` : "/login"}
//                   className="block font-medium text-sm hover:underline"
//                 >
//                   {post.user.displayName}
//                 </Link>
//               </UserTooltip>
//             </div>
//             <div className="block text-xs text-muted-foreground">
//               {formatRelativeDate(post.createdAt)}
//             </div>
//           </div>
//         </div>
//         {/* <div className="flex items-center gap-3">
//           <div className="flex flex-col items-end">
//             {post.booktitle && (
//               <Link
//                 href={`/books/${encodeURIComponent(post.booktitle)}`}
//                 className="text-sm hover:underline text-muted-foreground"
//               >
//                 &ldquo;{post.booktitle}&ldquo;
//               </Link>
//             )}
//             {post.bookauthor && (
//               <Link
//                 href={`/authors/${encodeURIComponent(post.bookauthor)}`}
//                 className="text-xs hover:underline text-muted-foreground"
//               >
//                 -{post.bookauthor}-
//               </Link>
//             )} */}
//         <div className="flex items-center gap-3">
//           <div className="flex flex-col items-end">
//             {post.booktitle && (
//               <div className="text-sm text-muted-foreground">
//                 &ldquo;{post.booktitle}&rdquo;
//               </div>
//             )}
//             {post.bookauthor && (
//               <div className="text-xs text-muted-foreground">
//                 -{post.bookauthor}-
//               </div>
//             )}
//           </div>
//           {post.user.id === user?.id && (
//             <PostMoreButton
//               post={post}
//               className="opacity-0 transition-opacity group-hover/post:opacity-100"
//             />
//           )}
//         </div>
//       </div>
//       <Link
//         href={user ? `/posts/${post.id}` : "/login"}
//         className="block text-sm"
//         suppressHydrationWarning
//       >
//         <Linkify>
//           <div className="whitespace-pre-line break-words">{post.content}</div>
//         </Linkify>
//       </Link>
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5 ">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some(
//                 (like) => like.userId === user?.id,
//               ),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//           <div className="flex items-center gap-2">
//             <Eye className="size-4" />
//             <div className="text-xs font-medium tabular-nums">
//               {post.viewCount}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ShareButton postId={post.id} />
//           <BookmarkButton
//             postId={post.id}
//             initialState={{
//               isBookmarkedByUser: post.bookmarks.some(
//                 (bookmark) => bookmark.userId === user?.id,
//               ),
//             }}
//           />
//         </div>
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

//   const handleMediaClick = (media: Media) => {
//     setSelectedMedia(media);
//   };

//   const handleCloseModal = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-1 overflow-x-auto scrollbar-hide",
//           // attachments.length === 2 && "flex-wrap justify-between",
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
//       {attachments.length >= 2 && showRightButton && (
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
//     width = 543;
//     height = 300;
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
//           "rounded-2xl object-cover cursor-pointer",
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
//           "rounded-2xl object-cover cursor-pointer",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//         onClick={onClick}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// function MediaModal({ media, onClose }: MediaModalProps) {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <Image
//             src={media.url}
//             alt="Attachment"
//             width={640}
//             height={640}
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//         {media.type === "VIDEO" && (
//           <video src={media.url} controls className="max-w-full max-h-full" />
//         )}
//       </div>
//     </div>
//   );
// }

// 더보기 기능 //

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, Eye, MessageSquareText, X } from "lucide-react";
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
// import CommentButton from "../comments/CommentButton";
// import ShareButton from "../ShareButton";

// interface PostProps {
//   post: PostData;
// }

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();
//   const [showComments, setShowComments] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);

//   // 800자 초과 여부 확인
//   const isContentLong = post.content.length > 400;
//   // 표시할 내용 계산
//   const displayContent = isExpanded ? post.content : post.content.slice(0, 400);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={user ? `/users/${post.user.username}` : "/login"}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <div className="flex items-center gap-3">
//               <UserTooltip user={post.user}>
//                 <Link
//                   href={user ? `/users/${post.user.username}` : "/login"}
//                   className="block font-medium text-sm hover:underline"
//                 >
//                   {post.user.displayName}
//                 </Link>
//               </UserTooltip>
//             </div>
//             <div className="block text-xs text-muted-foreground">
//               {formatRelativeDate(post.createdAt)}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="flex flex-col items-end">
//             {post.booktitle && (
//               <div className="text-sm text-muted-foreground">
//                 &ldquo;{post.booktitle}&rdquo;
//               </div>
//             )}
//             {post.bookauthor && (
//               <div className="text-xs text-muted-foreground">
//                 -{post.bookauthor}-
//               </div>
//             )}
//           </div>
//           {post.user.id === user?.id && (
//             <PostMoreButton
//               post={post}
//               className="opacity-0 transition-opacity group-hover/post:opacity-100"
//             />
//           )}
//         </div>
//       </div>
//       <Link
//         href={user ? `/posts/${post.id}` : "/login"}
//         className="block text-sm"
//         suppressHydrationWarning
//       >
//         <Linkify>
//           <div className="whitespace-pre-line break-words">
//             {displayContent}
//             {isContentLong && !isExpanded && "..."}
//           </div>
//         </Linkify>
//       </Link>
//       {isContentLong && (
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="text-sm text-muted-foreground hover:underline"
//         >
//           {isExpanded ? "접기" : "더보기"}
//         </button>
//       )}
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5 ">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some(
//                 (like) => like.userId === user?.id,
//               ),
//             }}
//           />
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//           <div className="flex items-center gap-2">
//             <Eye className="size-4" />
//             <div className="text-xs font-medium tabular-nums">
//               {post.viewCount}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ShareButton postId={post.id} />
//           <BookmarkButton
//             postId={post.id}
//             initialState={{
//               isBookmarkedByUser: post.bookmarks.some(
//                 (bookmark) => bookmark.userId === user?.id,
//               ),
//             }}
//           />
//         </div>
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

//   const handleMediaClick = (media: Media) => {
//     setSelectedMedia(media);
//   };

//   const handleCloseModal = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-1 overflow-x-auto scrollbar-hide",
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
//       {attachments.length >= 2 && showRightButton && (
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
//     width = 543;
//     height = 300;
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
//           "rounded-2xl object-cover cursor-pointer",
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
//           "rounded-2xl object-cover cursor-pointer",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//         onClick={onClick}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// function MediaModal({ media, onClose }: MediaModalProps) {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <Image
//             src={media.url}
//             alt="Attachment"
//             width={640}
//             height={640}
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//         {media.type === "VIDEO" && (
//           <video src={media.url} controls className="max-w-full max-h-full" />
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, Eye, MessageSquareText, X } from "lucide-react";
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
// import CommentButton from "../comments/CommentButton"; // 새로 추가된 import
// import ShareButton from "../ShareButton";

// interface PostProps {
//   post: PostData;
// }

// export default function Post({ post }: PostProps) {
//   const { user } = useSession();
//   const [showComments, setShowComments] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);

//   // 800자 초과 여부 확인
//   const isContentLong = post.content.length > 400;
//   // 표시할 내용 계산
//   const displayContent = isExpanded ? post.content : post.content.slice(0, 400);

//   return (
//     <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex justify-between gap-3">
//         <div className="flex flex-wrap gap-3">
//           <UserTooltip user={post.user}>
//             <Link href={user ? `/users/${post.user.username}` : "/login"}>
//               <UserAvatar avatarUrl={post.user.avatarUrl} />
//             </Link>
//           </UserTooltip>
//           <div>
//             <div className="flex items-center gap-3">
//               <UserTooltip user={post.user}>
//                 <Link
//                   href={user ? `/users/${post.user.username}` : "/login"}
//                   className="block font-medium text-sm hover:underline"
//                 >
//                   {post.user.displayName}
//                 </Link>
//               </UserTooltip>
//             </div>
//             <div className="block text-xs text-muted-foreground">
//               {formatRelativeDate(post.createdAt)}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="flex flex-col items-end">
//             {post.booktitle && (
//               <div className="text-sm text-muted-foreground">
//                 &ldquo;{post.booktitle}&rdquo;
//               </div>
//             )}
//             {post.bookauthor && (
//               <div className="text-xs text-muted-foreground">
//                 -{post.bookauthor}-
//               </div>
//             )}
//           </div>
//           {post.user.id === user?.id && (
//             <PostMoreButton
//               post={post}
//               className="opacity-0 transition-opacity group-hover/post:opacity-100"
//             />
//           )}
//         </div>
//       </div>
//       <Link
//         href={user ? `/posts/${post.id}` : "/login"}
//         className="block text-sm"
//         suppressHydrationWarning
//       >
//         <Linkify>
//           <div className="whitespace-pre-line break-words">
//             {displayContent}
//             {isContentLong && !isExpanded && "..."}
//           </div>
//         </Linkify>
//       </Link>
//       {isContentLong && (
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="text-sm text-muted-foreground hover:underline"
//         >
//           {isExpanded ? "접기" : "더보기"}
//         </button>
//       )}
//       {!!post.attachments.length && (
//         <MediaPreviews attachments={post.attachments} />
//       )}
//       <hr className="text-muted-foreground" />

//       {/* 댓글 버튼과 관련 기능 수정 */}
//       <div className="flex justify-between gap-5">
//         <div className="flex items-center gap-5">
//           <LikeButton
//             postId={post.id}
//             initialState={{
//               likes: post._count.likes,
//               isLikedByUser: post.likes.some(
//                 (like) => like.userId === user?.id,
//               ),
//             }}
//           />
//           {/* CommentButton 컴포넌트로 변경 */}
//           <CommentButton
//             post={post}
//             onClick={() => setShowComments(!showComments)}
//           />
//           <div className="flex items-center gap-2">
//             <Eye className="size-4" />
//             <div className="text-xs font-medium tabular-nums">
//               {post.viewCount}
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ShareButton postId={post.id} />
//           <BookmarkButton
//             postId={post.id}
//             initialState={{
//               isBookmarkedByUser: post.bookmarks.some(
//                 (bookmark) => bookmark.userId === user?.id,
//               ),
//             }}
//           />
//         </div>
//       </div>

//       {/* 댓글 섹션 수정 */}
//       {showComments && (
//         <div className="border-t pt-3">
//           <Comments post={post} />
//         </div>
//       )}
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

//   const handleMediaClick = (media: Media) => {
//     setSelectedMedia(media);
//   };

//   const handleCloseModal = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <div className="relative">
//       <div
//         ref={containerRef}
//         className={cn(
//           "flex gap-1 overflow-x-auto scrollbar-hide",
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
//       {attachments.length >= 2 && showRightButton && (
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
//     width = 543;
//     height = 300;
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
//           "rounded-2xl object-cover cursor-pointer",
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
//           "rounded-2xl object-cover cursor-pointer",
//           totalCount >= 3 && "flex-shrink-0",
//         )}
//         style={{ width, height }}
//         onClick={onClick}
//       />
//     );
//   }

//   return <p className="text-destructive">Unsupported media type</p>;
// }

// interface MediaModalProps {
//   media: Media;
//   onClose: () => void;
// }

// function MediaModal({ media, onClose }: MediaModalProps) {
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
//       onClick={onClose}
//     >
//       <div
//         className="relative max-w-3xl max-h-[90vh] p-4 bg-white rounded-lg shadow-lg overflow-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-2 right-2 text-black bg-white rounded-full p-1"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {media.type === "IMAGE" && (
//           <Image
//             src={media.url}
//             alt="Attachment"
//             width={640}
//             height={640}
//             className="max-w-full max-h-full object-contain"
//           />
//         )}
//         {media.type === "VIDEO" && (
//           <video src={media.url} controls className="max-w-full max-h-full" />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { PostData } from "@/lib/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Media } from "@prisma/client";
import { ChevronRight, Eye, MessageSquareText, X } from "lucide-react";
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
import ShareButton from "../ShareButton";

// YouTube 링크 추출 함수
function extractYouTubeVideoId(url: string): string | null {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 800자 초과 여부 확인
  const isContentLong = post.content.length > 400;
  // 표시할 내용 계산
  const displayContent = isExpanded ? post.content : post.content.slice(0, 400);

  // YouTube 링크 추출
  const youtubeLinks = (
    post.content.match(
      /https?:\/\/(?:www\.)?(?:youtube\.com\/\S+|youtu\.be\/\S+)/g,
    ) || []
  )
    .map(extractYouTubeVideoId)
    .filter(Boolean) as string[];

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={user ? `/users/${post.user.username}` : "/login"}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <div className="flex items-center gap-3">
              <UserTooltip user={post.user}>
                <Link
                  href={user ? `/users/${post.user.username}` : "/login"}
                  className="block font-medium text-sm hover:underline"
                >
                  {post.user.displayName}
                </Link>
              </UserTooltip>
            </div>
            <div className="block text-xs text-muted-foreground">
              {formatRelativeDate(post.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            {post.booktitle && (
              <div className="text-sm text-muted-foreground">
                &ldquo;{post.booktitle}&rdquo;
              </div>
            )}
            {post.bookauthor && (
              <div className="text-xs text-muted-foreground">
                -{post.bookauthor}-
              </div>
            )}
          </div>
          {post.user.id === user?.id && (
            <PostMoreButton
              post={post}
              className="opacity-0 transition-opacity group-hover/post:opacity-100"
            />
          )}
        </div>
      </div>
      <Link
        href={user ? `/posts/${post.id}` : "/login"}
        className="block text-sm"
        suppressHydrationWarning
      >
        <Linkify>
          <div className="whitespace-pre-line break-words">
            {displayContent}
            {isContentLong && !isExpanded && "..."}
          </div>
        </Linkify>
      </Link>
      {youtubeLinks.map((videoId) => (
        <div
          key={videoId}
          className="w-full max-w-3xl mx-auto aspect-w-16 aspect-h-9 my-4"
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[540px] rounded-2xl"
          />
        </div>
      ))}

      {isContentLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-muted-foreground hover:underline"
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      )}
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />

      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
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
          <div className="flex items-center gap-2">
            {/* view 카운트 숨김 */}
            {/* <Eye className="size-4" />
            <div className="text-xs font-medium tabular-nums">
              {post.viewCount}
            </div> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton postId={post.id} />
          <BookmarkButton
            postId={post.id}
            initialState={{
              isBookmarkedByUser: post.bookmarks.some(
                (bookmark) => bookmark.userId === user?.id,
              ),
            }}
          />
        </div>
      </div>

      {showComments && (
        <div className="border-t pt-3">
          <Comments post={post} />
        </div>
      )}
    </article>
  );
}

// 이하 기존의 MediaPreviews, MediaPreview, MediaModal 컴포넌트들은 그대로 유지
// ... (이전 코드의 나머지 부분)
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
