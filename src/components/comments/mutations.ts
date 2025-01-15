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

import { CommentsPage, PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deleteComment, submitComment, editComment } from "./actions";

// InfiniteData 타입 정의
type CommentsInfiniteData = InfiniteData<CommentsPage>;

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];
      const postQueryKey: QueryKey = ["post-feed"];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page) => {
          const newComments = page.comments.map((comment) => {
            if (newComment.parentId === comment.id) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }
            return comment;
          });

          return {
            ...page,
            comments: newComment.parentId
              ? newComments
              : [newComment, ...newComments],
          };
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });

      // 포스트 댓글 수 업데이트
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
                      _count: { ...p._count, comments: p._count.comments + 1 },
                    }
                  : p,
              ),
            })),
          };
        },
      );

      toast({ description: "Comment created" });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit comment. Please try again.",
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

      queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            ...page,
            comments: page.comments
              .map((comment) => {
                if (
                  deletedComment.parentId &&
                  comment.id === deletedComment.parentId
                ) {
                  return {
                    ...comment,
                    replies:
                      comment.replies?.filter(
                        (reply) => reply.id !== deletedComment.id,
                      ) || [],
                  };
                }
                return comment.id === deletedComment.id ? null : comment;
              })
              .filter(Boolean),
          })),
        } as InfiniteData<CommentsPage>;
      });

      // 포스트 댓글 수 업데이트
      queryClient.setQueriesData<InfiniteData<PostsPage>>(
        { queryKey: postQueryKey },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            pageParams: oldData.pageParams,
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

      toast({ description: "Comment deleted" });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete comment. Please try again.",
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

      queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
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
              return comment.id === editedComment.id ? editedComment : comment;
            }),
          })),
        };
      });

      toast({ description: "Comment updated" });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update comment. Please try again.",
      });
    },
  });
}
