// // chatgpt 요구사항 : 모달창 생성, 여러 사진 게시물의 경우 클릭하면 과도한 크기제한, 모달 창 외부 클릭시 닫히기

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn, formatRelativeDate } from "@/lib/utils";
// import { Media } from "@prisma/client";
// import { ChevronRight, MessageSquareText, X } from "lucide-react";
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
//           {/* <ViewCounter
//             postId={post.id}
//             initialState={{
//               views: post._count.views,
//               hasViewedByUser: post.views.some(
//                 (view) => view.userId === user.id,
//               ),
//             }}
//           /> */}
//         </div>
//         <BookmarkButton
//           postId={post.id}
//           initialState={{
//             isBookmarkedByUser: post.bookmarks.some(
//               (bookmark) => bookmark.userId === user?.id,
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

//서버에서 미디어 파일 임의 삭제시 웹사이트 마비되는 것을 방지. 241213//

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

  // 안전하게 attachments 배열 확인
  const safeAttachments =
    post?.attachments?.filter(
      (attachment) =>
        attachment && attachment.id && attachment.type && attachment.url,
    ) || [];

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
            <UserTooltip user={post.user}>
              <Link
                href={user ? `/users/${post.user.username}` : "/login"}
                className="block font-medium text-sm hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <div className="block text-xs text-muted-foreground">
              {formatRelativeDate(post.createdAt)}
            </div>
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
        href={user ? `/posts/${post.id}` : "/login"}
        className="block text-sm"
        suppressHydrationWarning
      >
        <Linkify>
          <div className="whitespace-pre-line break-words">{post.content}</div>
        </Linkify>
      </Link>
      {safeAttachments.length > 0 && (
        <MediaPreviews attachments={safeAttachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5 ">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count?.likes || 0,
              isLikedByUser:
                post.likes?.some((like) => like?.userId === user?.id) || false,
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser:
              post.bookmarks?.some(
                (bookmark) => bookmark?.userId === user?.id,
              ) || false,
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
    if (!media?.id || !media?.url || !media?.type) return;
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  // 유효한 미디어만 필터링
  const validAttachments = attachments.filter(
    (media) => media && media.id && media.url && media.type,
  );

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={cn(
          "flex gap-1 overflow-x-auto scrollbar-hide",
          validAttachments.length >= 3 && "flex-nowrap",
        )}
        onScroll={handleScroll}
      >
        {validAttachments.map((media, index) => (
          <MediaPreview
            key={media.id}
            media={media}
            totalCount={validAttachments.length}
            index={index}
            onClick={() => handleMediaClick(media)}
          />
        ))}
      </div>
      {validAttachments.length >= 2 && showRightButton && (
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
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // 미디어 데이터 유효성 검사
  if (!media?.url || !media?.type) {
    return (
      <div
        className="rounded-2xl bg-muted flex items-center justify-center"
        style={{ width: 210, height: 280 }}
      >
        <p className="text-sm text-muted-foreground">
          미디어를 불러올 수 없습니다
        </p>
      </div>
    );
  }

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
    if (imageError) {
      return (
        <div
          className={cn(
            "rounded-2xl bg-muted flex items-center justify-center",
            totalCount >= 3 && "flex-shrink-0",
          )}
          style={{ width, height }}
        >
          <p className="text-sm text-muted-foreground">
            이미지를 불러올 수 없습니다
          </p>
        </div>
      );
    }

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
        onError={() => setImageError(true)}
      />
    );
  }

  if (media.type === "VIDEO") {
    if (videoError) {
      return (
        <div
          className={cn(
            "rounded-2xl bg-muted flex items-center justify-center",
            totalCount >= 3 && "flex-shrink-0",
          )}
          style={{ width, height }}
        >
          <p className="text-sm text-muted-foreground">
            비디오를 불러올 수 없습니다
          </p>
        </div>
      );
    }

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
        onError={() => setVideoError(true)}
      />
    );
  }

  return <p className="text-destructive">지원하지 않는 미디어 형식입니다</p>;
}

interface MediaModalProps {
  media: Media;
  onClose: () => void;
}

function MediaModal({ media, onClose }: MediaModalProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // 미디어 데이터 유효성 검사
  if (!media?.url || !media?.type) {
    return null;
  }

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
        {media.type === "IMAGE" &&
          (imageError ? (
            <div
              className="flex items-center justify-center"
              style={{ width: 640, height: 640 }}
            >
              <p className="text-lg text-muted-foreground">
                이미지를 불러올 수 없습니다
              </p>
            </div>
          ) : (
            <Image
              src={media.url}
              alt="Attachment"
              width={640}
              height={640}
              className="max-w-full max-h-full object-contain"
              onError={() => setImageError(true)}
            />
          ))}
        {media.type === "VIDEO" &&
          (videoError ? (
            <div
              className="flex items-center justify-center"
              style={{ width: 640, height: 640 }}
            >
              <p className="text-lg text-muted-foreground">
                비디오를 불러올 수 없습니다
              </p>
            </div>
          ) : (
            <video
              src={media.url}
              controls
              className="max-w-full max-h-full"
              onError={() => setVideoError(true)}
            />
          ))}
      </div>
    </div>
  );
}
