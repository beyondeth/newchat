// import { CommentsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryKey,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useToast } from "../ui/use-toast";
// import { deleteComment, submitComment, editComment } from "./actions";

// export function useSubmitCommentMutation(postId: string) {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: submitComment,
//     onSuccess: async (newComment) => {
//       const queryKey: QueryKey = ["comments", postId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           const firstPage = oldData?.pages[0];

//           if (firstPage) {
//             return {
//               pageParams: oldData.pageParams,
//               pages: [
//                 {
//                   previousCursor: firstPage.previousCursor,
//                   comments: [...firstPage.comments, newComment],
//                 },
//                 ...oldData.pages.slice(1),
//               ],
//             };
//           }
//         },
//       );

//       queryClient.invalidateQueries({
//         queryKey,
//         predicate(query) {
//           return !query.state.data;
//         },
//       });

//       toast({
//         description: "Comment created",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to submit comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               previousCursor: page.previousCursor,
//               comments: page.comments.filter((c) => c.id !== deletedComment.id),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "Comment deleted",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to delete comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }

// // 새로 추가되는 edit mutation ⬇️
// export function useEditCommentMutation() {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: editComment,
//     onSuccess: async (editedComment) => {
//       const queryKey: QueryKey = ["comments", editedComment.postId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               previousCursor: page.previousCursor,
//               comments: page.comments.map((c) =>
//                 c.id === editedComment.id ? editedComment : c,
//               ),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "Comment updated",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to update comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }

// import { CommentsPage, PostsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryKey,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useToast } from "../ui/use-toast";
// import { deleteComment, submitComment, editComment } from "./actions";

// export function useSubmitCommentMutation(postId: string) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: submitComment,
//     onSuccess: async (newComment) => {
//       const queryKey: QueryKey = ["comments", postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       await queryClient.cancelQueries({ queryKey });

//       // 댓글 목록 업데이트
//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           const firstPage = oldData?.pages[0];

//           if (firstPage) {
//             return {
//               pageParams: oldData.pageParams,
//               pages: [
//                 {
//                   previousCursor: firstPage.previousCursor,
//                   comments: [...firstPage.comments, newComment],
//                 },
//                 ...oldData.pages.slice(1),
//               ],
//             };
//           }
//         },
//       );

//       // 포스트의 댓글 카운트 업데이트
//       queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               nextCursor: page.nextCursor,
//               posts: page.posts.map((p) =>
//                 p.id === postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments + 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       queryClient.invalidateQueries({
//         queryKey,
//         predicate(query) {
//           return !query.state.data;
//         },
//       });

//       toast({
//         description: "Comment created",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to submit comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       await queryClient.cancelQueries({ queryKey });

//       // 댓글 목록 업데이트
//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               previousCursor: page.previousCursor,
//               comments: page.comments.filter((c) => c.id !== deletedComment.id),
//             })),
//           };
//         },
//       );

//       // 포스트의 댓글 카운트 업데이트
//       queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               nextCursor: page.nextCursor,
//               posts: page.posts.map((p) =>
//                 p.id === deletedComment.postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments - 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "Comment deleted",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to delete comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }

// export function useEditCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: editComment,
//     onSuccess: async (editedComment) => {
//       const queryKey: QueryKey = ["comments", editedComment.postId];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
//         queryKey,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               previousCursor: page.previousCursor,
//               comments: page.comments.map((c) =>
//                 c.id === editedComment.id ? editedComment : c,
//               ),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "Comment updated",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "Failed to update comment. Please try again.",
//       });
//     },
//   });

//   return mutation;
// }
// mutations.ts
// import {
//   CommentsPage,
//   PostsPage,
//   CommentData,
//   UserData,
//   PostData,
// } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryKey,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useToast } from "../ui/use-toast";
// import { deleteComment, submitComment, editComment } from "./actions";

// interface Session {
//   user: UserData;
// }

// type CommentsInfiniteData = InfiniteData<CommentsPage>;

// export function useSubmitCommentMutation(postId: string) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: submitComment,
//     onMutate: async (newCommentData) => {
//       const queryKey: QueryKey = ["comments", postId];
//       await queryClient.cancelQueries({ queryKey });

//       const session = queryClient.getQueryData<Session>(["session"]);
//       if (!session?.user) return;

//       const tempUser: UserData = {
//         id: session.user.id,
//         username: session.user.username,
//         displayName: session.user.displayName,
//         googleId: session.user.googleId,
//         kakaoId: session.user.kakaoId,
//         avatarUrl: session.user.avatarUrl,
//         bio: session.user.bio,
//         createdAt: session.user.createdAt,
//         followers: [],
//         postViews: [],
//         _count: {
//           posts: 0,
//           followers: 0,
//           postViews: 0,
//         },
//       };

//       const tempComment: Partial<CommentData> = {
//         id: Date.now().toString(),
//         content: newCommentData.content,
//         createdAt: new Date(),
//         parentId: newCommentData.parentId,
//         user: tempUser,
//         replies: [],
//         deleted: false,
//         parent: null,
//       };

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (old) => {
//         if (!old) return old;

//         return {
//           pageParams: old.pageParams,
//           pages: old.pages.map((page) => ({
//             ...page,
//             comments: tempComment.parentId
//               ? page.comments.map((comment) =>
//                   comment.id === tempComment.parentId
//                     ? {
//                         ...comment,
//                         replies: [
//                           ...(comment.replies || []),
//                           tempComment as CommentData,
//                         ],
//                       }
//                     : comment,
//                 )
//               : [tempComment as CommentData, ...page.comments],
//           })),
//         };
//       });

//       return {
//         previousData: queryClient.getQueryData<CommentsInfiniteData>(queryKey),
//       };
//     },
//     onSuccess: async (newComment) => {
//       const queryKey: QueryKey = ["comments", postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       queryClient.setQueriesData<InfiniteData<PostsPage>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             pages: oldData.pages.map((page) => ({
//               ...page,
//               posts: page.posts.map((p) =>
//                 p.id === postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments + 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({ description: "댓글이 작성되었습니다." });
//     },
//     onError(error, variables, context) {
//       if (context?.previousData) {
//         const queryKey: QueryKey = ["comments", postId];
//         queryClient.setQueryData(queryKey, context.previousData);
//       }
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 작성에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments
//               .map((comment) => {
//                 if (
//                   deletedComment.parentId &&
//                   comment.id === deletedComment.parentId
//                 ) {
//                   return {
//                     ...comment,
//                     replies:
//                       comment.replies?.filter(
//                         (reply) => reply.id !== deletedComment.id,
//                       ) || [],
//                   };
//                 }
//                 return comment.id === deletedComment.id
//                   ? { ...comment, content: null, deleted: true }
//                   : comment;
//               })
//               .filter(Boolean),
//           })),
//         };
//       });

//       queryClient.setQueriesData<InfiniteData<PostsPage>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return oldData;
//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               ...page,
//               posts: page.posts.map((p) =>
//                 p.id === deletedComment.postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments - 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({ description: "댓글이 삭제되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useEditCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: editComment,
//     onSuccess: async (editedComment) => {
//       const queryKey: QueryKey = ["comments", editedComment.postId];
//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments.map((comment) => {
//               if (
//                 editedComment.parentId &&
//                 comment.id === editedComment.parentId
//               ) {
//                 return {
//                   ...comment,
//                   replies:
//                     comment.replies?.map((reply) =>
//                       reply.id === editedComment.id ? editedComment : reply,
//                     ) || [],
//                 };
//               }
//               return comment.id === editedComment.id ? editedComment : comment;
//             }),
//           })),
//         };
//       });

//       toast({ description: "댓글이 수정되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 수정에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// mutations.ts
// import { CommentsPage, PostsPage, CommentData, UserData } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryKey,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useToast } from "../ui/use-toast";
// import { deleteComment, submitComment, editComment } from "./actions";

// interface Session {
//   user: UserData;
// }

// type CommentsInfiniteData = InfiniteData<CommentsPage>;

// export function useSubmitCommentMutation(postId: string) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: submitComment,
//     onMutate: async (newCommentData) => {
//       const queryKey: QueryKey = ["comments", postId];
//       await queryClient.cancelQueries({ queryKey });

//       const session = queryClient.getQueryData<Session>(["session"]);
//       if (!session?.user) return;

//       const tempUser: UserData = {
//         id: session.user.id,
//         username: session.user.username,
//         displayName: session.user.displayName,
//         googleId: session.user.googleId,
//         kakaoId: session.user.kakaoId,
//         avatarUrl: session.user.avatarUrl,
//         bio: session.user.bio,
//         createdAt: session.user.createdAt,
//         followers: [],
//         postViews: [],
//         _count: {
//           posts: 0,
//           followers: 0,
//           postViews: 0,
//         },
//       };

//       // tempComment에 필요한 모든 필드 추가
//       const tempComment: Partial<CommentData> = {
//         id: Date.now().toString(),
//         content: newCommentData.content,
//         createdAt: new Date(),
//         parentId: newCommentData.parentId,
//         user: tempUser,
//         replies: [],
//         deleted: false,
//         parent: null,
//         post: newCommentData.post,
//       };

//       // 이전 데이터 백업
//       const previousData =
//         queryClient.getQueryData<CommentsInfiniteData>(queryKey);

//       // 낙관적 업데이트
//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (old) => {
//         if (!old) return old;

//         const updatedPages = old.pages.map((page) => ({
//           ...page,
//           comments: tempComment.parentId
//             ? page.comments.map((comment) =>
//                 comment.id === tempComment.parentId
//                   ? {
//                       ...comment,
//                       replies: [
//                         ...(comment.replies || []),
//                         tempComment as CommentData,
//                       ],
//                     }
//                   : comment,
//               )
//             : [tempComment as CommentData, ...page.comments],
//         }));

//         return {
//           ...old,
//           pages: updatedPages,
//         };
//       });

//       return { previousData };
//     },
//     onSuccess: async (newComment) => {
//       const queryKey: QueryKey = ["comments", postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       queryClient.setQueriesData<InfiniteData<PostsPage>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return oldData;
//           return {
//             ...oldData,
//             pages: oldData.pages.map((page) => ({
//               ...page,
//               posts: page.posts.map((p) =>
//                 p.id === postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments + 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({ description: "댓글이 작성되었습니다." });
//     },
//     onError(error, variables, context) {
//       if (context?.previousData) {
//         const queryKey: QueryKey = ["comments", postId];
//         queryClient.setQueryData(queryKey, context.previousData);
//       }
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 작성에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments.map((comment) => {
//               if (
//                 deletedComment.parentId &&
//                 comment.id === deletedComment.parentId
//               ) {
//                 return {
//                   ...comment,
//                   replies:
//                     comment.replies?.map((reply) =>
//                       reply.id === deletedComment.id
//                         ? { ...reply, content: null, deleted: true }
//                         : reply,
//                     ) || [],
//                 };
//               }
//               return comment.id === deletedComment.id
//                 ? { ...comment, content: null, deleted: true }
//                 : comment;
//             }),
//           })),
//         };
//       });

//       queryClient.setQueriesData<InfiniteData<PostsPage>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return oldData;
//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               ...page,
//               posts: page.posts.map((p) =>
//                 p.id === deletedComment.postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments - 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({ description: "댓글이 삭제되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useEditCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: editComment,
//     onSuccess: async (editedComment) => {
//       const queryKey: QueryKey = ["comments", editedComment.postId];
//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments.map((comment) => {
//               if (
//                 editedComment.parentId &&
//                 comment.id === editedComment.parentId
//               ) {
//                 return {
//                   ...comment,
//                   replies:
//                     comment.replies?.map((reply) =>
//                       reply.id === editedComment.id ? editedComment : reply,
//                     ) || [],
//                 };
//               }
//               return comment.id === editedComment.id ? editedComment : comment;
//             }),
//           })),
//         };
//       });

//       toast({ description: "댓글이 수정되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 수정에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

//###
// import { CommentsPage, PostsPage, CommentData, UserData } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryKey,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { useToast } from "../ui/use-toast";
// import { deleteComment, submitComment, editComment } from "./actions";

// interface Session {
//   user: UserData;
// }

// type CommentsInfiniteData = InfiniteData<CommentsPage>;

// export function useSubmitCommentMutation(postId: string) {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: submitComment,
//     onMutate: async (newCommentData) => {
//       const queryKey: QueryKey = ["comments", postId];
//       await queryClient.cancelQueries({ queryKey });

//       const session = queryClient.getQueryData<Session>(["session"]);
//       if (!session?.user) return;

//       // 간단한 임시 댓글 생성
//       const tempComment: Partial<CommentData> = {
//         id: Date.now().toString(),
//         content: newCommentData.content,
//         createdAt: new Date(),
//         parentId: newCommentData.parentId,
//         user: session.user, // 세션의 사용자 정보를 직접 사용
//         replies: [],
//         deleted: false,
//         parent: null,
//         post: newCommentData.post,
//       };

//       // 이전 데이터 백업
//       const previousData =
//         queryClient.getQueryData<CommentsInfiniteData>(queryKey);

//       // 첫 번째 코드의 방식을 활용한 효율적인 업데이트
//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (old) => {
//         if (!old?.pages[0]) return old;

//         return {
//           pageParams: old.pageParams,
//           pages: [
//             {
//               ...old.pages[0],
//               comments: tempComment.parentId
//                 ? old.pages[0].comments.map((comment) =>
//                     comment.id === tempComment.parentId
//                       ? {
//                           ...comment,
//                           replies: [
//                             ...(comment.replies || []),
//                             tempComment as CommentData,
//                           ],
//                         }
//                       : comment,
//                   )
//                 : [tempComment as CommentData, ...old.pages[0].comments],
//             },
//             ...old.pages.slice(1),
//           ],
//         };
//       });

//       return { previousData };
//     },
//     onSuccess: async (newComment) => {
//       const queryKey: QueryKey = ["comments", postId];

//       // 성공 시 댓글 수 업데이트만 수행
//       if (!newComment.parentId) {
//         queryClient.setQueriesData<InfiniteData<PostsPage>>(
//           { queryKey: ["post-feed"] },
//           (oldData) => {
//             if (!oldData) return oldData;
//             return {
//               ...oldData,
//               pages: oldData.pages.map((page) => ({
//                 ...page,
//                 posts: page.posts.map((p) =>
//                   p.id === postId
//                     ? {
//                         ...p,
//                         _count: {
//                           ...p._count,
//                           comments: p._count.comments + 1,
//                         },
//                       }
//                     : p,
//                 ),
//               })),
//             };
//           },
//         );
//       }

//       toast({ description: "댓글이 작성되었습니다." });
//     },
//     onError(error, variables, context) {
//       if (context?.previousData) {
//         queryClient.setQueryData(["comments", postId], context.previousData);
//       }
//       toast({
//         variant: "destructive",
//         description: "댓글 작성에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useDeleteCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteComment,
//     onSuccess: async (deletedComment) => {
//       const queryKey: QueryKey = ["comments", deletedComment.postId];
//       const postQueryKey: QueryKey = ["post-feed"];

//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments.map((comment) => {
//               if (
//                 deletedComment.parentId &&
//                 comment.id === deletedComment.parentId
//               ) {
//                 return {
//                   ...comment,
//                   replies:
//                     comment.replies?.map((reply) =>
//                       reply.id === deletedComment.id
//                         ? { ...reply, content: null, deleted: true }
//                         : reply,
//                     ) || [],
//                 };
//               }
//               return comment.id === deletedComment.id
//                 ? { ...comment, content: null, deleted: true }
//                 : comment;
//             }),
//           })),
//         };
//       });

//       queryClient.setQueriesData<InfiniteData<PostsPage>>(
//         { queryKey: postQueryKey },
//         (oldData) => {
//           if (!oldData) return oldData;
//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               ...page,
//               posts: page.posts.map((p) =>
//                 p.id === deletedComment.postId
//                   ? {
//                       ...p,
//                       _count: { ...p._count, comments: p._count.comments - 1 },
//                     }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({ description: "댓글이 삭제되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

// export function useEditCommentMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: editComment,
//     onSuccess: async (editedComment) => {
//       const queryKey: QueryKey = ["comments", editedComment.postId];
//       await queryClient.cancelQueries({ queryKey });

//       queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
//         if (!oldData) return oldData;

//         return {
//           pageParams: oldData.pageParams,
//           pages: oldData.pages.map((page) => ({
//             ...page,
//             comments: page.comments.map((comment) => {
//               if (
//                 editedComment.parentId &&
//                 comment.id === editedComment.parentId
//               ) {
//                 return {
//                   ...comment,
//                   replies:
//                     comment.replies?.map((reply) =>
//                       reply.id === editedComment.id ? editedComment : reply,
//                     ) || [],
//                 };
//               }
//               return comment.id === editedComment.id ? editedComment : comment;
//             }),
//           })),
//         };
//       });

//       toast({ description: "댓글이 수정되었습니다." });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "댓글 수정에 실패했습니다. 다시 시도해주세요.",
//       });
//     },
//   });
// }

import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deleteComment, submitComment, editComment } from "./actions";
import { CommentsPage, PostsPage, UserData, CommentData } from "@/lib/types";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitComment,
    onMutate: async (newCommentData) => {
      // 낙관적 업데이트를 위한 쿼리 취소
      const queryKey: QueryKey = ["comments", postId];
      await queryClient.cancelQueries({ queryKey });

      // 현재 세션의 사용자 정보 가져오기
      const session = queryClient.getQueryData<{ user: UserData }>(["session"]);
      if (!session?.user) return;

      // 임시 댓글 객체 생성
      const tempComment: Partial<CommentData> = {
        id: Date.now().toString(),
        content: newCommentData.content,
        createdAt: new Date(),
        parentId: newCommentData.parentId,
        user: session.user,
        replies: [],
        deleted: false,
        post: newCommentData.post,
      };

      // 이전 데이터 백업
      const previousData =
        queryClient.getQueryData<InfiniteData<CommentsPage>>(queryKey);

      // 낙관적 업데이트 수행
      queryClient.setQueryData<InfiniteData<CommentsPage>>(queryKey, (old) => {
        if (!old?.pages[0]) return old;

        return {
          pageParams: old.pageParams,
          pages: [
            {
              ...old.pages[0],
              comments: tempComment.parentId
                ? old.pages[0].comments.map((comment) =>
                    comment.id === tempComment.parentId
                      ? {
                          ...comment,
                          // replies: [
                          //   ...(comment.replies || []),
                          //   tempComment as CommentData,
                          // ],
                          replies: [
                            tempComment as CommentData,
                            ...(comment.replies || []),
                          ],
                        }
                      : comment,
                  )
                : [tempComment as CommentData, ...old.pages[0].comments],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousData };
    },
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];
      const postQueryKey: QueryKey = ["post-feed"];

      // 성공 시 실제 데이터로 업데이트
      queryClient.setQueryData<InfiniteData<CommentsPage>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                ...oldData.pages[0],
                comments: newComment.parentId
                  ? oldData.pages[0].comments.map((comment) =>
                      comment.id === newComment.parentId
                        ? {
                            ...comment,
                            // replies: [...(comment.replies || []), newComment],
                            replies: [newComment, ...(comment.replies || [])],
                          }
                        : comment,
                    )
                  : [newComment, ...oldData.pages[0].comments],
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      // 포스트의 댓글 카운트 업데이트
      if (!newComment.parentId) {
        queryClient.setQueriesData<InfiniteData<PostsPage>>(
          { queryKey: postQueryKey },
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                posts: page.posts.map((p) =>
                  p.id === postId
                    ? {
                        ...p,
                        _count: {
                          ...p._count,
                          comments: p._count.comments + 1,
                        },
                      }
                    : p,
                ),
              })),
            };
          },
        );
      }

      toast({ description: "댓글이 작성되었습니다." });
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["comments", postId], context.previousData);
      }
      toast({
        variant: "destructive",
        description: "댓글 작성에 실패했습니다. 다시 시도해주세요.",
      });
    },
  });
}

export function useEditCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editComment,
    onSuccess: async (editedComment) => {
      const queryKey: QueryKey = ["comments", editedComment.postId];
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((comment) => {
                if (
                  editedComment.parentId &&
                  comment.id === editedComment.parentId
                ) {
                  return {
                    ...comment,
                    replies:
                      comment.replies?.map((reply) =>
                        reply.id === editedComment.id ? editedComment : reply,
                      ) || [],
                  };
                }
                return comment.id === editedComment.id
                  ? editedComment
                  : comment;
              }),
            })),
          };
        },
      );

      toast({ description: "댓글이 수정되었습니다." });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "댓글 수정에 실패했습니다. 다시 시도해주세요.",
      });
    },
  });
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];
      const postQueryKey: QueryKey = ["post-feed"];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((comment) => {
                if (
                  deletedComment.parentId &&
                  comment.id === deletedComment.parentId
                ) {
                  return {
                    ...comment,
                    replies:
                      comment.replies?.map((reply) =>
                        reply.id === deletedComment.id
                          ? { ...reply, content: null, deleted: true }
                          : reply,
                      ) || [],
                  };
                }
                return comment.id === deletedComment.id
                  ? { ...comment, content: null, deleted: true }
                  : comment;
              }),
            })),
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<PostsPage>>(
        { queryKey: postQueryKey },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((p) =>
                p.id === deletedComment.postId
                  ? {
                      ...p,
                      _count: { ...p._count, comments: p._count.comments - 1 },
                    }
                  : p,
              ),
            })),
          };
        },
      );

      toast({ description: "댓글이 삭제되었습니다." });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "댓글 삭제에 실패했습니다. 다시 시도해주세요.",
      });
    },
  });
}
