// import { Prisma } from "@prisma/client";

// export function getUserDataSelect(loggedInUserId: string) {
//   return {
//     id: true,
//     username: true,
//     displayName: true,
//     avatarUrl: true,
//     bio: true,
//     createdAt: true,
//     followers: {
//       where: {
//         followerId: loggedInUserId,
//       },
//       select: {
//         followerId: true,
//       },
//     },
//     postViews: {
//       select: {
//         postId: true,
//       },
//     },
//     _count: {
//       select: {
//         posts: true,
//         followers: true,
//         postViews: true,
//       },
//     },
//   } satisfies Prisma.UserSelect;
// }

// export type UserData = Prisma.UserGetPayload<{
//   select: ReturnType<typeof getUserDataSelect>;
// }>;

// export function getPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.PostInclude;
// }

// export type PostData = Prisma.PostGetPayload<{
//   include: ReturnType<typeof getPostDataInclude>;
// }>;

// export interface PostsPage {
//   posts: PostData[];
//   nextCursor: string | null;
// }

// export function getCommentDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//   } satisfies Prisma.CommentInclude;
// }

// export type CommentData = Prisma.CommentGetPayload<{
//   include: ReturnType<typeof getCommentDataInclude>;
// }>;

// export interface CommentsPage {
//   comments: CommentData[];
//   previousCursor: string | null;
// }

// export const notificationsInclude = {
//   issuer: {
//     select: {
//       username: true,
//       displayName: true,
//       avatarUrl: true,
//     },
//   },
//   post: {
//     select: {
//       content: true,
//     },
//   },
// } satisfies Prisma.NotificationInclude;

// export type NotificationData = Prisma.NotificationGetPayload<{
//   include: typeof notificationsInclude;
// }>;

// export interface NotificationsPage {
//   notifications: NotificationData[];
//   nextCursor: string | null;
// }

// export interface ViewInfo {
//   views: number;
//   hasViewedByUser: boolean;
// }

// export interface FollowerInfo {
//   followers: number;
//   isFollowedByUser: boolean;
// }

// export interface LikeInfo {
//   likes: number;
//   isLikedByUser: boolean;
// }

// export interface BookmarkInfo {
//   isBookmarkedByUser: boolean;
// }

// export interface NotificationCountInfo {
//   unreadCount: number;
// }

// export interface MessageCountInfo {
//   unreadCount: number;
// }

// import { Prisma } from "@prisma/client";

// export function getUserDataSelect(loggedInUserId: string) {
//   return {
//     id: true,
//     username: true,
//     displayName: true,
//     avatarUrl: true,
//     bio: true,
//     createdAt: true,
//     googleId: true,
//     kakaoId: true,
//     followers: {
//       where: {
//         followerId: loggedInUserId,
//       },
//       select: {
//         followerId: true,
//       },
//     },
//     postViews: {
//       select: {
//         postId: true,
//       },
//     },
//     _count: {
//       select: {
//         posts: true,
//         followers: true,
//         postViews: true,
//       },
//     },
//   } satisfies Prisma.UserSelect;
// }

// export type UserData = Prisma.UserGetPayload<{
//   select: ReturnType<typeof getUserDataSelect>;
// }>;

// export function getPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.PostInclude;
// }

// export type PostData = Prisma.PostGetPayload<{
//   include: ReturnType<typeof getPostDataInclude>;
// }>;

// export interface PostsPage {
//   posts: PostData[];
//   nextCursor: string | null;
// }

// export function getBlogPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.BlogPostInclude;
// }

// export type BlogPostData = Prisma.BlogPostGetPayload<{
//   include: ReturnType<typeof getBlogPostDataInclude>;
// }>;

// export interface BlogPostsPage {
//   blogPosts: BlogPostData[];
//   nextCursor: string | null;
// }

// export function getCommentDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//   } satisfies Prisma.CommentInclude;
// }

// export type CommentData = Prisma.CommentGetPayload<{
//   include: ReturnType<typeof getCommentDataInclude>;
// }>;

// export interface CommentsPage {
//   comments: CommentData[];
//   previousCursor: string | null;
// }

// export const notificationsInclude = {
//   issuer: {
//     select: {
//       username: true,
//       displayName: true,
//       avatarUrl: true,
//     },
//   },
//   post: {
//     select: {
//       id: true,
//       content: true,
//     },
//   },
//   blogPost: {
//     select: {
//       id: true,
//       title: true,
//       content: true,
//       slug: true,
//     },
//   },
// } satisfies Prisma.NotificationInclude;

// export type NotificationData = Prisma.NotificationGetPayload<{
//   include: typeof notificationsInclude;
// }>;

// export interface NotificationsPage {
//   notifications: NotificationData[];
//   nextCursor: string | null;
// }

// export interface ViewInfo {
//   views: number;
//   hasViewedByUser: boolean;
// }

// export interface FollowerInfo {
//   followers: number;
//   isFollowedByUser: boolean;
// }

// export interface LikeInfo {
//   likes: number;
//   isLikedByUser: boolean;
// }

// export interface BookmarkInfo {
//   isBookmarkedByUser: boolean;
// }

// export interface NotificationCountInfo {
//   unreadCount: number;
// }

// export interface MessageCountInfo {
//   unreadCount: number;
// }

// import { Prisma } from "@prisma/client";

// export function getUserDataSelect(loggedInUserId: string) {
//   return {
//     id: true,
//     username: true,
//     displayName: true,
//     avatarUrl: true,
//     bio: true,
//     createdAt: true,
//     googleId: true,
//     kakaoId: true,
//     followers: {
//       where: {
//         followerId: loggedInUserId,
//       },
//       select: {
//         followerId: true,
//       },
//     },
//     postViews: {
//       select: {
//         postId: true,
//       },
//     },
//     _count: {
//       select: {
//         posts: true,
//         followers: true,
//         postViews: true,
//       },
//     },
//   } satisfies Prisma.UserSelect;
// }

// export type UserData = Prisma.UserGetPayload<{
//   select: ReturnType<typeof getUserDataSelect>;
// }>;

// export function getPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.PostInclude;
// }

// export type PostData = Prisma.PostGetPayload<{
//   include: ReturnType<typeof getPostDataInclude>;
// }>;

// export interface PostsPage {
//   posts: PostData[];
//   nextCursor: string | null;
// }

// export function getBlogPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.BlogPostInclude;
// }

// export type BlogPostData = Prisma.BlogPostGetPayload<{
//   include: ReturnType<typeof getBlogPostDataInclude>;
// }>;

// export interface BlogPostsPage {
//   blogPosts: BlogPostData[];
//   nextCursor: string | null;
// }

// export function getCommentDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     replies: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//         replies: {
//           include: {
//             user: {
//               select: getUserDataSelect(loggedInUserId),
//             },
//           },
//         },
//       },
//     },
//     parent: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//       },
//     },
//     post: {
//       include: getPostDataInclude(loggedInUserId),
//     },
//   } satisfies Prisma.CommentInclude;
// }

// export type CommentData = Prisma.CommentGetPayload<{
//   include: ReturnType<typeof getCommentDataInclude> & {
//     parent?: Prisma.CommentGetPayload<{
//       include: {
//         user: {
//           select: ReturnType<typeof getUserDataSelect>;
//         };
//       };
//     }>;
//     post: Prisma.PostGetPayload<{
//       include: ReturnType<typeof getPostDataInclude>;
//     }>;
//   };
// }>;

// export interface CommentsPage {
//   comments: CommentData[];
//   previousCursor: string | null;
// }

// export function getBlogCommentDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     replies: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//         replies: {
//           include: {
//             user: {
//               select: getUserDataSelect(loggedInUserId),
//             },
//           },
//         },
//       },
//     },
//     parent: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//       },
//     },
//     post: {
//       include: getBlogPostDataInclude(loggedInUserId),
//     },
//   } satisfies Prisma.BlogCommentInclude;
// }

// export type BlogCommentData = Prisma.BlogCommentGetPayload<{
//   include: ReturnType<typeof getBlogCommentDataInclude> & {
//     parent?: Prisma.BlogCommentGetPayload<{
//       include: {
//         user: {
//           select: ReturnType<typeof getUserDataSelect>;
//         };
//       };
//     }>;
//     post: Prisma.BlogPostGetPayload<{
//       include: ReturnType<typeof getBlogPostDataInclude>;
//     }>;
//   };
// }>;

// export interface BlogCommentsPage {
//   comments: BlogCommentData[];
//   previousCursor: string | null;
// }

// export const notificationsInclude = {
//   issuer: {
//     select: {
//       username: true,
//       displayName: true,
//       avatarUrl: true,
//     },
//   },
//   post: {
//     select: {
//       id: true,
//       content: true,
//     },
//   },
//   blogPost: {
//     select: {
//       id: true,
//       title: true,
//       content: true,
//       slug: true,
//     },
//   },
// } satisfies Prisma.NotificationInclude;

// export type NotificationData = Prisma.NotificationGetPayload<{
//   include: typeof notificationsInclude;
// }>;

// export interface NotificationsPage {
//   notifications: NotificationData[];
//   nextCursor: string | null;
// }

// export interface ViewInfo {
//   views: number;
//   hasViewedByUser: boolean;
// }

// export interface FollowerInfo {
//   followers: number;
//   isFollowedByUser: boolean;
// }

// export interface LikeInfo {
//   likes: number;
//   isLikedByUser: boolean;
// }

// export interface BookmarkInfo {
//   isBookmarkedByUser: boolean;
// }

// export interface NotificationCountInfo {
//   unreadCount: number;
// }

// export interface MessageCountInfo {
//   unreadCount: number;
// }

// export type CommentWithoutPost = Omit<CommentData, "post">;

import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    googleId: true,
    kakaoId: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    postViews: {
      select: {
        postId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
        postViews: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    views: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
        views: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export interface BookInfo {
  id?: string; // DB에 저장될 때 필요
  title: string;
  author: string;
  image: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
  link?: string | null; // undefined 대신 null로 변경 // 선택적 필드
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export function getBlogPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    views: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
        views: true,
      },
    },
  } satisfies Prisma.BlogPostInclude;
}

export type BlogPostData = Prisma.BlogPostGetPayload<{
  include: ReturnType<typeof getBlogPostDataInclude>;
}>;

export interface BlogPostsPage {
  blogPosts: BlogPostData[];
  nextCursor: string | null;
}

export function getCommentDataInclude(loggedInUserId: string) {
  // 재귀적으로 replies를 포함하는 함수
  const getReplyIncludes = () => ({
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    replies: {
      include: {
        user: {
          select: getUserDataSelect(loggedInUserId),
        },
        replies: {
          include: {
            user: {
              select: getUserDataSelect(loggedInUserId),
            },
            // 더 깊은 단계의 replies도 포함
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc" as const,
      },
    },
    parent: {
      include: {
        user: {
          select: getUserDataSelect(loggedInUserId),
        },
      },
    },
  });

  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    replies: {
      include: getReplyIncludes(),
      orderBy: {
        createdAt: "asc" as const,
      },
    },
    parent: {
      include: {
        user: {
          select: getUserDataSelect(loggedInUserId),
        },
      },
    },
    post: {
      include: getPostDataInclude(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export type CommentWithoutPost = Omit<CommentData, "post">;

// 나머지 코드는 그대로 유지...
export const notificationsInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      id: true,
      content: true,
    },
  },
  blogPost: {
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

export interface ViewInfo {
  views: number;
  hasViewedByUser: boolean;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface MessageCountInfo {
  unreadCount: number;
}

// 인기게시물 탑10 //
// lib/types.ts
export type TopPost = {
  id: string;
  content: string;
  user_id: string;
  viewCount: number;
  likes_count: bigint; // SQL COUNT 결과는 bigint
  comments_count: bigint;
  bookmarks_count: bigint;
  score: number;
  createdAt: Date;

  // JOIN으로 가져오는 user 관련 필드들
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

// 변환된 결과 타입
export type ProcessedTopPost = {
  id: string;
  content: string;
  viewCount: number;
  likes: number;
  comments: number;
  bookmarks: number;
  score: number;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

// import { Prisma } from "@prisma/client";

// export function getUserDataSelect(loggedInUserId: string) {
//   return {
//     id: true,
//     username: true,
//     displayName: true,
//     avatarUrl: true,
//     bio: true,
//     createdAt: true,
//     googleId: true,
//     kakaoId: true,
//     followers: {
//       where: {
//         followerId: loggedInUserId,
//       },
//       select: {
//         followerId: true,
//       },
//     },
//     postViews: {
//       select: {
//         postId: true,
//       },
//     },
//     _count: {
//       select: {
//         posts: true,
//         followers: true,
//         postViews: true,
//       },
//     },
//   } satisfies Prisma.UserSelect;
// }

// export type UserData = Prisma.UserGetPayload<{
//   select: ReturnType<typeof getUserDataSelect>;
// }>;

// export function getPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     bookInfo: true, // bookInfo로 이름 변경
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.PostInclude;
// }

// export type BookInfoData = BookInfo;

// export type PostData = Prisma.PostGetPayload<{
//   include: ReturnType<typeof getPostDataInclude>;
// }> & {
//   bookInfo: {
//     id: string;
//     title: string;
//     author: string;
//     image: string;
//     publisher: string;
//     pubdate: string;
//     isbn: string;
//     description: string;
//     link: string | null; // null 허용으로 변경
//     createdAt: Date; // 필수 필드 추가
//     updatedAt: Date; // 필수 필드 추가
//     postId: string; // 필수 필드 추가
//   } | null; // nullable로 변경
// };

// export interface BookInfo {
//   id?: string; // DB에 저장될 때 필요
//   title: string;
//   author: string;
//   image: string;
//   publisher: string;
//   pubdate: string;
//   isbn: string;
//   description: string;
//   link?: string | null; // undefined 대신 null로 변경 // 선택적 필드
// }

// export interface PostsPage {
//   posts: PostData[];
//   nextCursor: string | null;
// }

// export function getBlogPostDataInclude(loggedInUserId: string) {
//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     attachments: true,
//     likes: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     bookmarks: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     views: {
//       where: {
//         userId: loggedInUserId,
//       },
//       select: {
//         userId: true,
//       },
//     },
//     _count: {
//       select: {
//         likes: true,
//         comments: true,
//         views: true,
//       },
//     },
//   } satisfies Prisma.BlogPostInclude;
// }

// export type BlogPostData = Prisma.BlogPostGetPayload<{
//   include: ReturnType<typeof getBlogPostDataInclude>;
// }>;

// export interface BlogPostsPage {
//   blogPosts: BlogPostData[];
//   nextCursor: string | null;
// }

// export function getCommentDataInclude(loggedInUserId: string) {
//   // 재귀적으로 replies를 포함하는 함수
//   const getReplyIncludes = () => ({
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     replies: {
//       where: {
//         // 여기에 deleted 조건 추가
//         deleted: false,
//       },
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//         replies: {
//           where: {
//             // 중첩된 replies에도 조건 추가
//             deleted: false,
//           },
//           include: {
//             user: {
//               select: getUserDataSelect(loggedInUserId),
//             },
//             replies: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "asc" as const,
//       },
//     },
//     parent: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//       },
//     },
//   });

//   return {
//     user: {
//       select: getUserDataSelect(loggedInUserId),
//     },
//     replies: {
//       where: {
//         // 최상위 레벨의 replies에도 조건 추가
//         deleted: false,
//       },
//       include: getReplyIncludes(),
//       orderBy: {
//         createdAt: "asc" as const,
//       },
//     },
//     parent: {
//       include: {
//         user: {
//           select: getUserDataSelect(loggedInUserId),
//         },
//       },
//     },
//     post: {
//       include: getPostDataInclude(loggedInUserId),
//     },
//   } satisfies Prisma.CommentInclude;
// }

// export type CommentData = Prisma.CommentGetPayload<{
//   include: ReturnType<typeof getCommentDataInclude>;
// }>;

// export interface CommentsPage {
//   comments: CommentData[];
//   previousCursor: string | null;
// }

// export type CommentWithoutPost = Omit<CommentData, "post">;

// // 나머지 코드는 그대로 유지...
// export const notificationsInclude = {
//   issuer: {
//     select: {
//       username: true,
//       displayName: true,
//       avatarUrl: true,
//     },
//   },
//   post: {
//     select: {
//       id: true,
//       content: true,
//     },
//   },
//   blogPost: {
//     select: {
//       id: true,
//       title: true,
//       content: true,
//       slug: true,
//     },
//   },
// } satisfies Prisma.NotificationInclude;

// export type NotificationData = Prisma.NotificationGetPayload<{
//   include: typeof notificationsInclude;
// }>;

// export interface NotificationsPage {
//   notifications: NotificationData[];
//   nextCursor: string | null;
// }

// export interface ViewInfo {
//   views: number;
//   hasViewedByUser: boolean;
// }

// export interface FollowerInfo {
//   followers: number;
//   isFollowedByUser: boolean;
// }

// export interface LikeInfo {
//   likes: number;
//   isLikedByUser: boolean;
// }

// export interface BookmarkInfo {
//   isBookmarkedByUser: boolean;
// }

// export interface NotificationCountInfo {
//   unreadCount: number;
// }

// export interface MessageCountInfo {
//   unreadCount: number;
// }

// // 인기게시물 탑10 //
// // lib/types.ts
// export type TopPost = {
//   id: string;
//   content: string;
//   user_id: string;
//   viewCount: number;
//   likes_count: bigint; // SQL COUNT 결과는 bigint
//   comments_count: bigint;
//   bookmarks_count: bigint;
//   score: number;
//   createdAt: Date;

//   // JOIN으로 가져오는 user 관련 필드들
//   userId: string;
//   username: string;
//   displayName: string;
//   avatarUrl: string | null;
// };

// // 변환된 결과 타입
// export type ProcessedTopPost = {
//   id: string;
//   content: string;
//   viewCount: number;
//   likes: number;
//   comments: number;
//   bookmarks: number;
//   score: number;
//   createdAt: Date;
//   user: {
//     id: string;
//     username: string;
//     displayName: string;
//     avatarUrl: string | null;
//   };
// };
