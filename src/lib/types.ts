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

import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
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
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
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
