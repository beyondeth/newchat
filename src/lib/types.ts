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
//   // 재귀적으로 replies를 포함하는 함수
//   const getReplyIncludes = () => ({
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
//             // 더 깊은 단계의 replies도 포함
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
