// import { useSession } from "@/app/(main)/SessionProvider";
// import { useToast } from "@/components/ui/use-toast";
// import { PostsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryFilters,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { submitPost } from "./actions";

// export function useSubmitPostMutation() {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();

//   const { user } = useSession();
//   const endpoint = user ? "/api/posts/for-you" : "/api/posts";

//   const mutation = useMutation({
//     mutationFn: submitPost,
//     onSuccess: async (newPost) => {
//       const queryFilter = {
//         queryKey: ["post-feed", endpoint],
//         predicate(query) {
//           return (
//             query.queryKey.includes(endpoint) ||
//             (query.queryKey.includes("user-posts") &&
//               query.queryKey.includes(user!.id))
//           );
//         },
//       } satisfies QueryFilters;

//       await queryClient.cancelQueries(queryFilter);

//       queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//         queryFilter,
//         (oldData) => {
//           const firstPage = oldData?.pages[0];

//           if (firstPage) {
//             return {
//               pageParams: oldData.pageParams,
//               pages: [
//                 {
//                   posts: [newPost, ...firstPage.posts],
//                   nextCursor: firstPage.nextCursor,
//                 },
//                 ...oldData.pages.slice(1),
//               ],
//             };
//           }
//         },
//       );

//       queryClient.invalidateQueries({
//         queryKey: queryFilter.queryKey,
//         predicate(query) {
//           return queryFilter.predicate(query) && !query.state.data;
//         },
//       });

//       toast({
//         description: "포스팅 성공!",
//       });
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "포스팅 실패, 다시 시도해주세요",
//       });
//     },
//   });

//   return mutation;
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { useToast } from "@/components/ui/use-toast";
// import { PostsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryFilters,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { submitPost } from "./actions";

// export function useSubmitPostMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const { user } = useSession();
//   const endpoint = user ? "/api/posts/for-you" : "/api/posts";

//   const mutation = useMutation({
//     mutationFn: submitPost,
//     onMutate: async () => {
//       // 백그라운드 리페치 방지를 위해 진행 중인 쿼리 취소
//       await queryClient.cancelQueries({
//         queryKey: ["post-feed", endpoint],
//       });
//     },
//     onSuccess: async (newPost) => {
//       const queryFilter = {
//         queryKey: ["post-feed", endpoint],
//         predicate(query) {
//           return (
//             query.queryKey.includes(endpoint) ||
//             (query.queryKey.includes("user-posts") &&
//               query.queryKey.includes(user!.id))
//           );
//         },
//       } satisfies QueryFilters;

//       // debounce를 통한 불필요한 리페치 방지
//       const debouncedQueries = setTimeout(() => {
//         queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//           queryFilter,
//           (oldData) => {
//             const firstPage = oldData?.pages[0];

//             if (firstPage) {
//               return {
//                 pageParams: oldData.pageParams,
//                 pages: [
//                   {
//                     posts: [newPost, ...firstPage.posts],
//                     nextCursor: firstPage.nextCursor,
//                   },
//                   ...oldData.pages.slice(1),
//                 ],
//               };
//             }
//           },
//         );

//         queryClient.invalidateQueries({
//           queryKey: queryFilter.queryKey,
//           predicate(query) {
//             return queryFilter.predicate(query) && !query.state.data;
//           },
//         });
//       }, 0);

//       toast({
//         description: "포스팅 성공!",
//       });

//       return () => clearTimeout(debouncedQueries);
//     },
//     onError(error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: "포스팅 실패, 다시 시도해주세요",
//       });
//     },
//     // 캐시 설정 추가
//     gcTime: 1000 * 60 * 5, // 5분
//     networkMode: "online",
//     retry: 1, // 재시도 횟수 제한
//   });

//   return mutation;
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { useToast } from "@/components/ui/use-toast";
// import { PostsPage } from "@/lib/types";
// import {
//   InfiniteData,
//   QueryFilters,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { submitPost } from "./actions";

// export function useSubmitPostMutation() {
//   const { toast } = useToast();
//   const queryClient = useQueryClient();
//   const { user } = useSession();
//   const endpoint = user ? "/api/posts/for-you" : "/api/posts";

//   const mutation = useMutation({
//     mutationFn: submitPost,
//     onMutate: async () => {
//       // 백그라운드 리페치 방지를 위해 진행 중인 쿼리 취소
//       await queryClient.cancelQueries({
//         queryKey: ["post-feed", endpoint],
//       });
//     },
//     onSuccess: async (newPost) => {
//       const queryFilter = {
//         queryKey: ["post-feed", endpoint],
//         predicate(query) {
//           return (
//             query.queryKey.includes(endpoint) ||
//             (query.queryKey.includes("user-posts") &&
//               query.queryKey.includes(user!.id))
//           );
//         },
//       } satisfies QueryFilters;

//       // debounce를 통한 불필요한 리페치 방지
//       const debouncedQueries = setTimeout(() => {
//         queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
//           queryFilter,
//           (oldData) => {
//             const firstPage = oldData?.pages[0];

//             if (firstPage) {
//               return {
//                 pageParams: oldData.pageParams,
//                 pages: [
//                   {
//                     posts: [newPost, ...firstPage.posts],
//                     nextCursor: firstPage.nextCursor,
//                   },
//                   ...oldData.pages.slice(1),
//                 ],
//               };
//             }
//           },
//         );

//         queryClient.invalidateQueries({
//           queryKey: queryFilter.queryKey,
//           predicate(query) {
//             return queryFilter.predicate(query) && !query.state.data;
//           },
//         });
//       }, 0);

//       toast({
//         description: "포스팅 성공!",
//       });

//       return () => clearTimeout(debouncedQueries);
//     },
//     onError(error: Error) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         description: error.message || "포스팅 실패, 다시 시도해주세요",
//       });
//     },
//     // 캐시 설정 추가
//     gcTime: 1000 * 60 * 5, // 5분
//     networkMode: "online",
//     retry: 1, // 재시도 횟수 제한
//   });

//   return mutation;
// }

import { useSession } from "@/app/(main)/SessionProvider";
import { useToast } from "@/components/ui/use-toast";
import { PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { submitPost } from "./actions";

export function useSubmitPostMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useSession();
  const endpoint = user ? "/api/posts/for-you" : "/api/posts";

  const mutation = useMutation({
    mutationFn: submitPost,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["post-feed", endpoint],
      });
    },
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["post-feed", endpoint],
        predicate(query) {
          return (
            query.queryKey.includes(endpoint) ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user!.id))
          );
        },
      } satisfies QueryFilters;

      const debouncedQueries = setTimeout(() => {
        queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
          queryFilter,
          (oldData) => {
            if (!oldData) return oldData; // oldData가 없으면 그대로 반환

            const firstPage = oldData.pages[0];
            if (!firstPage) return oldData; // 첫 페이지가 없으면 그대로 반환

            // 데이터가 있을 때의 처리
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          },
        );

        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
          predicate(query) {
            return queryFilter.predicate(query) && !query.state.data;
          },
        });
      }, 0);

      toast({
        description: "포스팅 성공!",
      });

      return () => clearTimeout(debouncedQueries);
    },
    onError(error: Error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: error.message || "포스팅 실패, 다시 시도해주세요",
      });
    },
    gcTime: 1000 * 60 * 5,
    networkMode: "online",
    retry: 1,
  });

  return mutation;
}
