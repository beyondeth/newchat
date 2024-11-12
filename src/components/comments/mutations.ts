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

import { CommentsPage, PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deleteComment, submitComment, editComment } from "./actions";

export function useSubmitCommentMutation(postId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];
      const postQueryKey: QueryKey = ["post-feed"];

      await queryClient.cancelQueries({ queryKey });

      // 댓글 목록 업데이트
      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  comments: [...firstPage.comments, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      // 포스트의 댓글 카운트 업데이트
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: postQueryKey },
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
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

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Comment created",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to submit comment. Please try again.",
      });
    },
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];
      const postQueryKey: QueryKey = ["post-feed"];

      await queryClient.cancelQueries({ queryKey });

      // 댓글 목록 업데이트
      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor,
              comments: page.comments.filter((c) => c.id !== deletedComment.id),
            })),
          };
        },
      );

      // 포스트의 댓글 카운트 업데이트
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: postQueryKey },
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
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

      toast({
        description: "Comment deleted",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete comment. Please try again.",
      });
    },
  });

  return mutation;
}

export function useEditCommentMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editComment,
    onSuccess: async (editedComment) => {
      const queryKey: QueryKey = ["comments", editedComment.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor,
              comments: page.comments.map((c) =>
                c.id === editedComment.id ? editedComment : c,
              ),
            })),
          };
        },
      );

      toast({
        description: "Comment updated",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to update comment. Please try again.",
      });
    },
  });

  return mutation;
}
