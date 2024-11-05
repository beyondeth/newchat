npm i lucia @lucia-auth/adapter-prisma prisma @prisma/client @tanstack/react-query @tanstack/react-query-devtools @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm uploadthing @uploadthing/react arctic date-fns ky next-themes react-cropper react-image-file-resizer react-intersection-observer react-linkify-it stream-chat stream-chat-react --legacy-peer-deps

npm i -D prettier eslint-config-prettier prettier-plugin-tailwindcss --legacy-peer-deps

npx --legacy-peer-deps shadcn-ui@latest init

shadcn custom file youbute download (global.css)
https://github.com/codinginflow/nextjs-15-social-media-app/blob/0-Starting-point/src/app/globals.css

npx --legacy-peer-deps shadcn-ui@latest add button dialog dropdown-menu form input label skeleton tabs textarea toast tooltip

prettier.config.js

module.exports = {
plugin: ["prettier-plugin-tailwindcss"],
}

setting -> default for -> prettier code formatter

.eslintrc.json
{
"extends": ["next/core-web-vitals", "prettier"]
}

next.config.mjs

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
experimental: {
staleTimes: {
dynamic: 30,
},
},
};

export default nextConfig;

npx prisma init
vercel env, prisma db setting
// generator client {
provider = "prisma-client-js"
previewFeatures = ["fullTextSearch"]
}

+prisma.ts file

datasource db {
provider = "postgresql"
url = env("POSTGRES_PRISMA_URL") // uses connection pooling
directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
//

49:36~55:29 prisma modeling
55:29 [auth.ts] lucia setting

1:10:48 [validation.ts] zod
1:17:20 [next.config.mjs] serverExternalPackages: ["@node-rs/argon2"]
~2:35:51 login/signup page/action
2:35:51~ auth/layout.tsx
2:39:00 (main)/layout.tsx
2:50:00 (main)/layout.tsx if not user -> /login
2:51:00 [Navbar.tsx] (main) layout.tsx 에서 기본틀 flex 잡아주고... 디테일한것은 Navbar에서 잡는다.
3:17:49 Dark mode / dropdownmenu 에 theme 추가하기.
3:22:33 theme check
3:24:17 [MenuBar.tsx]
3:34:30 prisma model Post -> app layout -> validation post -> editor action.ts post create -> PostEditor.tsx @tiptap -> util.ts formatRelativeDate -> Post post.tsx -> (main) page.tsx 에서 홈 메인에서 보여질 에디터 / 밑에는 에디터에서 작성된 목록을 await post 로 불러옴

3:55:00 front page 와 findmany, map 연관성
~4:34:59 TrendsSidebar.tsx / util.ts / types.ts /
4:35:23 query
4:38:10 app/api/posts/for-you/route.ts

4:40:58 api/route.ts GET() -> await prisma.post.findmany include postDataInclude

4:43:00 [ReactQueryProvider.tsx]
4:43:55 Root [layout.tsx]

auth.ts error -> session 자동만료 되었지만 브라우저에 올드 쿠키가 남아있어서 에러 발생. 해결책? 올드쿠키 삭제 자동으로 이로어지도록 방안 모색.

5:03:34 usequery -> useInfiniteQuery
5:09:16 load more 버튼 사용하고 싶으면 여기까지! 무한 스크롤 사용하려면 추가 코드 필요!

---

Part 2

35:33 uploadthing
38:55 [next.config.mjs]
41:00 [tailwind.config.ts]
1:37:00 upload image file ? .env name error
1:40:00 old avatar
1:43:00
1:47:00

1. prisma media setting
2. core.ts attachment (image, video)
3. validation(zod) - creatpostshema add mediaId
4. post - editor - actions.ts / input -> content, mediaIds types
   1. export async function submitPost(input: string)
      -> content, mediaId typescript declare !
   2. cratePostSchema.parse( input )
   3. post.create -> attachments add

1:54:00 components-posts-editor-useMediaUpload.ts
useuploadthings (https://docs.uploadthing.com/api-reference/react#generatereacthelpers)

2:10:00 PostEditor.tsx
2:30:00 media upload backend / prisma studio에서만 데이터 업로드된 것 확인가능 / 프론트 구현해야함

1. type.ts : getPostDataInclude -> attachments : true,
2. post.tsx

2:39:00 PostEditor.tsx :: useDropzone()
2:43:46 onPaste image
2:46:07 - Cron job to delete orphaned uploads (Vercel cron)

1. src 폴더가 아닌 동등한 곳에서 파일 생성 vercel.json //배포후 작동//
2. api/clear-uploads/route.ts 설정
3. postman

2:58:00 Post details page
#(main)/posts/[postId]/page.tsx

- getPost / generateMetada
  3:13:49 ### Hydration error which means that the server rendered HTML and client rendered HTML is different but from what i know in this situation it's fine. If we just suppress this error because it doesn't actually break anything so what do is we go into our post components again and we search for our format relative date function. And on the link that wrap it we add suppress hydration warning which we get rid of this warning.

# Post.tsx suppresshydrationWarning add.

3:14:58 - Likes feature (optimistic updates)

3:35:14 - Bookmarks feature
3:50:27 - Comments feature (with infinite loading)
schema , validation.ts, types.ts

components/comments/actions.ts
api/posts/[postId]/comments/route.ts
components/comments/comments.tsx

4:19:48

4:49:02 - Notifications feature (Prisma transactions)

1. schema
2. api/posts/[postId]/likes/route.ts
3. api/users/[userId]/followers/route.ts
4. comments/actions.ts
5. api/notifications/route.ts
6. lib/types
7. (main)/notifications/page.tsx (bookmarks)

5:23:50

1. unread-count
2. mark-as-read
3. (main) NotificationsButton.tsx
   refetchInterval: 60 \* 1000, (주의!!! 데이터 페치)
4. menuBar.tsx (async)
5. Notifications.tsx (알림 -> 읽음)
   const queryClient = useQueryClient();
   const { mutate } = useMutation({})

5:39:06 - Direct messages feature (Stream Chat)

1. app/api/get-token/route.ts
2. (main)/messages/useInitializeChatClient.ts
3. 6:03:00 global.css
4. 6:08:27 stream site messaging threads & replies
5. 6:10:13 (auth)/signup/actions.ts
6. 6:13:12 (main)/users/[username]/actions.ts
7. 6:14:24 api/uploadthing/core.ts

6:23:54
6:25:00 chatsidebar open/close
6:28:00 usecallback (channelpreviewcustom)
NewChatDialog / hooks/usedebounce.ts
7:10:00 unread-count.ts
7:12:00 (main)/MessagesButton.tsx
7:48:20 - Search feature (+ rewrites)

1. api/search/route.ts
2. (main)/search/page.tsx
3. (main)/search/SearchResults.tsx
4. next.config.mjs

(main)/navbar.tsx : bugbook logo title : 로고변경
posteditor.tsx : (placeholder) 당신의 생각을 기록하세요...
searchfield.tsx : search -> 검색
menubar.tsx : 홈, 알림, 메시지, 즐겨찾기
trendssidebar.tsx :
layout.tsx : bugbooks -> Engine ???
(main)/page.tsx :
<TabsTrigger value="for-you">For you</TabsTrigger>
<TabsTrigger value="following">Following</TabsTrigger>

<배포>
package.json

error -> uploadthings/route
export const runtime = "nodejs";

24.11.5
components/post/post.tsx -> 모달창 생성.
