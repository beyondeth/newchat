// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import Link from "next/link";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentMoreButton from "./CommentMoreButton";

// interface CommentProps {
//   comment: CommentData;
//   level?: number;
// }

// export default function Comment({ comment }: CommentProps) {
//   const { user } = useSession();

//   return (
//     <div className="group/comment flex gap-3 py-3">
//       <span className="hidden sm:inline">
//         <UserTooltip user={comment.user}>
//           <Link href={`/users/${comment.user.username}`}>
//             <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
//           </Link>
//         </UserTooltip>
//       </span>
//       <div>
//         <div className="flex items-center gap-1 text-sm">
//           <UserTooltip user={comment.user}>
//             <Link
//               href={`/users/${comment.user.username}`}
//               className="font-medium text-sm hover:underline"
//             >
//               {comment.user.displayName}
//             </Link>
//           </UserTooltip>
//           <span className="text-xs text-muted-foreground">
//             {formatRelativeDate(comment.createdAt)}
//           </span>
//           {/* <span>답글</span> */}
//         </div>
//         <div>{comment.content}</div>
//       </div>
//       {comment.user.id === user?.id && (
//         <CommentMoreButton
//           comment={comment}
//           className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
//         />
//       )}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// // 수정된 타입 정의
// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);

//   const MAX_DEPTH = 100;
//   const canReply = level < MAX_DEPTH && user;

//   return (
//     <div className="py-3">
//       <div
//         className={`group/comment flex gap-3 ${
//           level > 0 ? "ml-8 pl-4 border-l-2 border-muted" : ""
//         }`}
//       >
//         <div className="flex-shrink-0">
//           <UserTooltip user={comment.user}>
//             <Link href={`/users/${comment.user.username}`}>
//               <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
//             </Link>
//           </UserTooltip>
//         </div>

//         <div className="flex-1 space-y-1">
//           <div className="flex items-center gap-2">
//             <UserTooltip user={comment.user}>
//               <Link
//                 href={`/users/${comment.user.username}`}
//                 className="font-medium hover:underline"
//               >
//                 {comment.user.displayName}
//               </Link>
//             </UserTooltip>
//             <span className="text-sm text-muted-foreground">
//               {formatRelativeDate(comment.createdAt)}
//             </span>
//           </div>

//           <div className="text-sm">{comment.content}</div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//             >
//               <MessageSquare className="h-3 w-3" />
//               답글달기
//             </button>
//           )}
//         </div>

//         {user?.id === comment.user.id && (
//           <CommentMoreButton
//             comment={comment}
//             className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//           />
//         )}
//       </div>

//       {showReplyInput && (
//         <div className="ml-8 mt-2">
//           <CommentInput
//             post={post}
//             parentId={comment.id}
//             onSuccess={() => setShowReplyInput(false)}
//           />
//         </div>
//       )}

//       {comment.replies?.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply as CommentWithoutPost} // 타입 단언 추가
//           post={post}
//           level={level + 1}
//         />
//       ))}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);

//   const MAX_DEPTH = 5;
//   const canReply = level < MAX_DEPTH && user;

//   return (
//     <div style={{ paddingLeft: `${level * 20}px` }} className="py-3">
//       <div className="group/comment flex gap-3 py-3">
//         <div className="flex-shrink-0">
//           <UserTooltip user={comment.user}>
//             <Link href={`/users/${comment.user.username}`}>
//               <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
//             </Link>
//           </UserTooltip>
//         </div>

//         <div className="flex-1 space-y-1">
//           <div className="flex items-center gap-2">
//             <UserTooltip user={comment.user}>
//               <Link
//                 href={`/users/${comment.user.username}`}
//                 className="font-medium hover:underline"
//               >
//                 {comment.user.displayName}
//               </Link>
//             </UserTooltip>
//             <span className="text-sm text-muted-foreground">
//               {formatRelativeDate(comment.createdAt)}
//             </span>
//           </div>

//           <div className="text-sm">{comment.content}</div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//             >
//               <MessageSquare className="h-3 w-3" />
//               답글달기
//             </button>
//           )}
//         </div>

//         {user?.id === comment.user.id && (
//           <CommentMoreButton
//             comment={comment}
//             className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//           />
//         )}
//       </div>

//       {showReplyInput && (
//         <div className="ml-8">
//           <CommentInput
//             post={post}
//             parentId={comment.id}
//             onSuccess={() => setShowReplyInput(false)}
//           />
//         </div>
//       )}

//       {comment.replies?.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply as CommentWithoutPost}
//           post={post}
//           level={level + 1}
//         />
//       ))}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// const MAX_DEPTH = 4;

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // level이 MAX_DEPTH 이상일 때는 부모 댓글의 replies에 추가되도록
//   const parentId = level >= MAX_DEPTH ? comment.parentId : comment.id;
//   const canReply = !!user; // 로그인한 사용자만 답글 가능

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       // 답글 처리 로직
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         paddingLeft: `${Math.min(level, MAX_DEPTH) * 20}px`,
//       }}
//       className="py-3"
//     >
//       <div className="group/comment flex gap-3">
//         <div className="flex-shrink-0">
//           <UserTooltip user={comment.user}>
//             <Link href={`/users/${comment.user.username}`}>
//               <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
//             </Link>
//           </UserTooltip>
//         </div>

//         <div className="flex-1 space-y-1">
//           <div className="flex items-center gap-2">
//             <UserTooltip user={comment.user}>
//               <Link
//                 href={`/users/${comment.user.username}`}
//                 className="font-medium hover:underline"
//               >
//                 {comment.user.displayName}
//               </Link>
//             </UserTooltip>
//             <span className="text-sm text-muted-foreground">
//               {formatRelativeDate(comment.createdAt)}
//             </span>
//           </div>

//           <div className="text-sm">
//             {comment.content ? comment.content : "댓글이 삭제되었습니다"}
//           </div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//               disabled={isLoading}
//             >
//               <MessageSquare className="h-3 w-3" />
//               {isLoading ? "처리 중..." : "답글달기"}
//             </button>
//           )}
//         </div>

//         {user?.id === comment.user.id && (
//           <CommentMoreButton
//             comment={comment}
//             className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//           />
//         )}
//       </div>

//       {showReplyInput && (
//         <div className="ml-8">
//           <CommentInput
//             post={post}
//             parentId={parentId} // MAX_DEPTH에 도달하면 부모 댓글의 ID를 사용
//             onSuccess={handleReplySubmit}
//           />
//         </div>
//       )}

//       {comment.replies?.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply as CommentWithoutPost}
//           post={post}
//           level={level + 1}
//         />
//       ))}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // 4단계부터는 모두 같은 레벨(3)로 표시
//   const displayLevel = Math.min(level, 3);
//   const canReply = !!user;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   return (
//     <div className="py-3">
//       <div style={{ paddingLeft: `12px` }}>
//         <div
//           className={`group/comment flex gap-3 ${
//             displayLevel > 0 ? "pl-4" : ""
//           }`}
//         >
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div className="text-sm">
//               {comment.content ? comment.content : "댓글이 삭제되었습니다"}
//             </div>

//             {canReply && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {showReplyInput && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {comment.replies?.map((reply) => (
//           <Comment
//             key={reply.id}
//             comment={reply as CommentWithoutPost}
//             post={post}
//             level={level + 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // 4단계부터는 모두 같은 레벨(3)로 표시
//   const displayLevel = Math.min(level, 3);
//   const canReply = !!user;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 삭제된 댓글 여부 확인
//   const isDeleted = comment.deleted || !comment.content;

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   // 자식 댓글 중 삭제되지 않은 댓글이 있는지 확인
//   const hasVisibleReplies = comment.replies?.some((reply) => !reply.deleted);

//   // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
//   if (isDeleted && !hasVisibleReplies) {
//     return null;
//   }

//   return (
//     <div className="py-3">
//       <div style={{ paddingLeft: `12px` }}>
//         <div
//           className={`group/comment flex gap-3 ${
//             displayLevel > 0 ? "pl-4" : ""
//           }`}
//         >
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div
//               className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
//             >
//               {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
//             </div>

//             {canReply && !isDeleted && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && !isDeleted && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {showReplyInput && !isDeleted && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {comment.replies
//           ?.filter(
//             (reply) =>
//               !reply.deleted ||
//               (reply.deleted && reply.replies && reply.replies.length > 0),
//           )
//           .map((reply) => (
//             <Comment
//               key={reply.id}
//               comment={reply as CommentWithoutPost}
//               post={post}
//               level={level + 1}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [showReplies, setShowReplies] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const canReply = !!user;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 삭제된 댓글 여부 확인
//   const isDeleted = comment.deleted || !comment.content;

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   // 보여줄 수 있는 답글 개수 계산
//   const visibleRepliesCount =
//     comment.replies?.filter(
//       (reply) => !reply.deleted || (reply.deleted && reply.replies?.length > 0),
//     ).length || 0;

//   // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
//   if (isDeleted && !visibleRepliesCount) {
//     return null;
//   }

//   return (
//     <div className="py-3">
//       <div style={{ paddingLeft: `${level * 20}px` }}>
//         <div className="group/comment flex gap-3">
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div
//               className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
//             >
//               {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
//             </div>

//             <div className="flex items-center gap-4">
//               {canReply && !isDeleted && (
//                 <button
//                   onClick={() => setShowReplyInput(!showReplyInput)}
//                   className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                   disabled={isLoading}
//                 >
//                   <MessageSquare className="h-3 w-3" />
//                   {isLoading ? "처리 중..." : "답글달기"}
//                 </button>
//               )}
//             </div>
//           </div>

//           {user?.id === commentUser.id && !isDeleted && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {showReplyInput && !isDeleted && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {/* 답글 더보기 버튼 */}
//         {visibleRepliesCount > 0 && !isDeleted && (
//           <div className="ml-8 mt-2">
//             <button
//               onClick={() => setShowReplies(!showReplies)}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
//             >
//               <svg
//                 className={`h-4 w-4 transform transition-transform ${
//                   showReplies ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={showReplies ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//                 />
//               </svg>
//               {showReplies
//                 ? "답글 숨기기"
//                 : `답글 ${visibleRepliesCount}개 보기`}
//             </button>
//           </div>
//         )}

//         {/* 답글 목록 */}
//         {showReplies && comment.replies && (
//           <div className="mt-2 space-y-3">
//             {comment.replies
//               .filter(
//                 (reply) =>
//                   !reply.deleted ||
//                   (reply.deleted && reply.replies?.length > 0),
//               )
//               .map((reply) => (
//                 <Comment
//                   key={reply.id}
//                   comment={reply as CommentWithoutPost}
//                   post={post}
//                   level={level + 1}
//                 />
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";
// import avatarPlaceholder from "@/assets/avatar-placeholder.png";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [showReplies, setShowReplies] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // parent가 null인 경우에만 부모 댓글로 간주
//   const isParentComment = !comment.parent;
//   const canReply = !!user && isParentComment;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 삭제된 댓글 여부 확인
//   const isDeleted = comment.deleted || !comment.content;

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: avatarPlaceholder,
//   };

//   // 보여줄 수 있는 답글 개수 계산
//   const visibleRepliesCount =
//     comment.replies?.filter(
//       (reply) => !reply.deleted || (reply.deleted && reply.replies?.length > 0),
//     ).length || 0;

//   // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
//   if (isDeleted && !visibleRepliesCount) {
//     return null;
//   }

//   return (
//     <div className="py-3">
//       <div className={`${isParentComment ? "" : "ml-12"}`}>
//         <div className="group/comment flex gap-3">
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div
//               className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
//             >
//               {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
//             </div>

//             {/* 부모 댓글에만 답글달기 버튼 표시 */}
//             {canReply && !isDeleted && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && !isDeleted && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {/* 답글 입력 폼 (부모 댓글에만 표시) */}
//         {showReplyInput && !isDeleted && isParentComment && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {/* 부모 댓글이고 답글이 있는 경우에만 답글 더보기 버튼 표시 */}
//         {isParentComment && visibleRepliesCount > 0 && !isDeleted && (
//           <div className="ml-8 mt-2">
//             <button
//               onClick={() => setShowReplies(!showReplies)}
//               className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
//             >
//               <svg
//                 className={`h-4 w-4 transform transition-transform ${
//                   showReplies ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={showReplies ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//                 />
//               </svg>
//               {showReplies
//                 ? "답글 숨기기"
//                 : `답글 ${visibleRepliesCount}개 보기`}
//             </button>
//           </div>
//         )}

//         {/* 답글 목록 */}
//         {showReplies && comment.replies && isParentComment && (
//           <div className="mt-2 space-y-3">
//             {comment.replies
//               .filter(
//                 (reply) =>
//                   !reply.deleted ||
//                   (reply.deleted && reply.replies?.length > 0),
//               )
//               .map((reply) => (
//                 <Comment
//                   key={reply.id}
//                   comment={reply as CommentWithoutPost}
//                   post={post}
//                   level={1} // 자식 댓글은 항상 level 1
//                 />
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ### //
// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [showReplies, setShowReplies] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // 부모 댓글인지 확인 (parentId가 없는 경우가 부모 댓글)
//   const isParentComment = !comment.parent;
//   const canReply = !!user && isParentComment; // 부모 댓글에만 답글 달기 허용

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//       setShowReplies(true); // 답글 입력 후 자동으로 답글 목록 표시
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 삭제된 댓글 여부 확인
//   const isDeleted = comment.deleted || !comment.content;

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   // 보여줄 수 있는 답글 개수 계산
//   const visibleRepliesCount =
//     comment.replies?.filter(
//       (reply) => !reply.deleted || (reply.deleted && reply.replies?.length > 0),
//     ).length || 0;

//   // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
//   if (isDeleted && !visibleRepliesCount) {
//     return null;
//   }

//   return (
//     <div className="py-3" data-comment-id={comment.id}>
//       <div style={{ paddingLeft: `${level * 20}px` }}>
//         <div className="group/comment flex gap-3">
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div
//               className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
//             >
//               {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
//             </div>

//             {/* 부모 댓글에만 답글달기 버튼 표시 */}
//             {canReply && !isDeleted && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && !isDeleted && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {/* 답글 입력 폼 (부모 댓글에만 표시) */}
//         {showReplyInput && !isDeleted && isParentComment && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {/* 답글이 있는 경우에만 답글 더보기 버튼 표시 */}
//         {visibleRepliesCount > 0 && (
//           <div className="ml-8 mt-2">
//             <button
//               onClick={() => setShowReplies(!showReplies)}
//               className="show-replies-button flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
//             >
//               <svg
//                 className={`h-4 w-4 transform transition-transform ${
//                   showReplies ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={showReplies ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
//                 />
//               </svg>
//               {showReplies
//                 ? "답글 숨기기"
//                 : `답글 ${visibleRepliesCount}개 보기`}
//             </button>
//           </div>
//         )}

//         {/* 답글 목록 */}
//         {showReplies && comment.replies && (
//           <div className="mt-2 space-y-3">
//             {comment.replies
//               .filter(
//                 (reply) =>
//                   !reply.deleted ||
//                   (reply.deleted && reply.replies?.length > 0),
//               )
//               .map((reply) => (
//                 <Comment
//                   key={reply.id}
//                   comment={reply as CommentWithoutPost}
//                   post={post}
//                   level={level + 1}
//                 />
//               ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// Comment.tsx
import { useSession } from "@/app/(main)/SessionProvider";
import { CommentData, PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import CommentInput from "./CommentInput";
import CommentMoreButton from "./CommentMoreButton";

type CommentWithoutPost = Omit<CommentData, "post">;

interface CommentProps {
  comment: CommentWithoutPost;
  post: PostData;
  level: number;
}

export default function Comment({ comment, post, level }: CommentProps) {
  const { user } = useSession();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 부모 댓글인지 확인 (parentId가 없는 경우가 부모 댓글)
  const isParentComment = !comment.parent;
  const canReply = !!user && isParentComment;

  const handleReplySubmit = async () => {
    setIsLoading(true);
    try {
      setShowReplyInput(false);
      setShowReplies(true); // 답글 입력 후 자동으로 답글 목록 표시
    } finally {
      setIsLoading(false);
    }
  };

  // 삭제된 댓글 여부 확인
  const isDeleted = comment.deleted || !comment.content;

  // 사용자 정보가 없는 경우 기본값 제공
  const commentUser = comment.user || {
    username: "unknown",
    displayName: "알 수 없는 사용자",
    avatarUrl: "/default-avatar.png",
  };

  // 보여줄 수 있는 답글 개수 계산
  const visibleRepliesCount =
    comment.replies?.filter(
      (reply) => !reply.deleted || (reply.deleted && reply.replies?.length > 0),
    ).length || 0;

  // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
  if (isDeleted && !visibleRepliesCount) {
    return null;
  }

  return (
    <div className="py-3" data-comment-id={comment.id}>
      <div style={{ paddingLeft: `${level * 20}px` }}>
        <div className="group/comment flex gap-3">
          <div className="flex-shrink-0">
            <UserTooltip user={commentUser}>
              <Link href={`/users/${commentUser.username}`}>
                <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
              </Link>
            </UserTooltip>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <UserTooltip user={commentUser}>
                <Link
                  href={`/users/${commentUser.username}`}
                  className="text-sm hover:underline"
                >
                  {commentUser.displayName}
                </Link>
              </UserTooltip>
              <span className="text-sm text-muted-foreground">
                {formatRelativeDate(comment.createdAt)}
              </span>
            </div>

            <div
              className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
            >
              {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
            </div>

            {/* 부모 댓글이면서 삭제되지 않았거나, 삭제되었지만 자식 댓글이 있는 경우 답글달기 버튼 표시 */}
            {canReply && (isDeleted ? visibleRepliesCount > 0 : true) && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                disabled={isLoading}
              >
                <MessageSquare className="h-3 w-3" />
                {isLoading ? "처리 중..." : "답글달기"}
              </button>
            )}
          </div>

          {user?.id === commentUser.id && !isDeleted && (
            <CommentMoreButton
              comment={comment}
              className="opacity-0 transition-opacity group-hover/comment:opacity-100"
            />
          )}
        </div>

        {/* 답글 입력 폼 (부모 댓글에만 표시) */}
        {showReplyInput && isParentComment && (
          <div className="ml-8 mt-2">
            <CommentInput
              post={post}
              parentId={comment.id}
              onSuccess={handleReplySubmit}
              placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
            />
          </div>
        )}

        {/* 답글이 있는 경우에만 답글 더보기 버튼 표시 */}
        {visibleRepliesCount > 0 && (
          <div className="ml-8 mt-2">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="show-replies-button flex items-center gap-2 text-sm"
            >
              <svg
                className={`h-4 w-4 transform transition-transform ${
                  showReplies ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={showReplies ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
              {showReplies
                ? "답글 숨기기"
                : `답글 ${visibleRepliesCount}개 보기`}
            </button>
          </div>
        )}

        {/* 답글 목록 */}
        {showReplies && comment.replies && (
          <div className="mt-2 space-y-3">
            {comment.replies
              .filter(
                (reply) =>
                  !reply.deleted ||
                  (reply.deleted && reply.replies?.length > 0),
              )
              .map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply as CommentWithoutPost}
                  post={post}
                  level={level + 1}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
