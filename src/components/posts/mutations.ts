// import { PostsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryFilters,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { usePathname, useRouter } from "next/navigation";
// import { useToast } from "../ui/use-toast";
// import { deletePost, editPost } from "./actions"; // editPost import 추가

// export function useDeletePostMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const pathname = usePathname();

//   const mutation = useMutation({
//     mutationFn: deletePost,
//     onSuccess: async (deletedPost) => {
//       const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

//       await queryClient.cancelQueries(queryFilter);

//       queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//         queryFilter,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               nextCursor: page.nextCursor,
//               posts: page.posts.filter((p) => p.id !== deletedPost.id),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "게시글이 삭제되었습니다",
//       });

//       if (pathname === `/posts/${deletedPost.id}`) {
//         router.push(`/users/${deletedPost.user.username}`);
//       }
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "게시글 삭제에 실패했습니다, 다시 시도해주세요.",
//       });
//     },
//   });

//   return mutation;
// }

// export function useEditPostMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: editPost, // fetch 대신 actions의 editPost 함수 사용
//     onSuccess: async (editedPost) => {
//       const queryFilter: QueryFilters = { queryKey: ["post-feed"] };

//       await queryClient.cancelQueries(queryFilter);

//       queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//         queryFilter,
//         (oldData) => {
//           if (!oldData) return;

//           return {
//             pageParams: oldData.pageParams,
//             pages: oldData.pages.map((page) => ({
//               nextCursor: page.nextCursor,
//               posts: page.posts.map((p) =>
//                 p.id === editedPost.id
//                   ? { ...p, content: editedPost.content }
//                   : p,
//               ),
//             })),
//           };
//         },
//       );

//       toast({
//         description: "게시글 수정이 완료되었습니다",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "게시글 수정이 실패했습니다, 다시 시도해주세요.",
//       });
//     },
//   });
// }

import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
  Query,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { deletePost, editPost } from "./actions";

type PostFeedQueryData = InfiniteData<PostsPage, string | null>;
type PostFeedQuery = Query<PostFeedQueryData, Error>;

export function useDeletePostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters<PostFeedQueryData, Error> = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<PostFeedQueryData>(queryFilter, (oldData) => {
        if (!oldData) return oldData;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            posts: page.posts.filter((p) => p.id !== deletedPost.id),
          })),
        };
      });

      toast({
        description: "게시글이 삭제되었습니다",
      });

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.username}`);
      }
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "게시글 삭제에 실패했습니다, 다시 시도해주세요.",
      });
    },
  });

  return mutation;
}

export function useEditPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPost,
    onSuccess: async (editedPost) => {
      const queryFilter: QueryFilters<PostFeedQueryData, Error> = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<PostFeedQueryData>(queryFilter, (oldData) => {
        if (!oldData) return oldData;

        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            posts: page.posts.map((p) =>
              p.id === editedPost.id
                ? {
                    ...p,
                    content: editedPost.content,
                    booktitle: editedPost.booktitle,
                    bookauthor: editedPost.bookauthor,
                  }
                : p,
            ),
          })),
        };
      });

      toast({
        description: "게시글 수정이 완료되었습니다",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "게시글 수정이 실패했습니다, 다시 시도해주세요.",
      });
    },
  });
}
