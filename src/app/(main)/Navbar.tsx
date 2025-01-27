// import SearchField from "@/components/SearchField";
// import UserButton from "@/components/UserButton";
// import Image from "next/image";
// import Link from "next/link";
// import hashlogo from "@/assets/QQ.png";

// export default function Navbar() {
//   return (
//     <header className="sticky top-0 z-10 bg-card shadow-sm">
//       <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-3">
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-2xl font-bold text-primary"
//         >
//           <Image src={hashlogo} alt="Logo" width={50} height={50} priority />
//           {/* <span>Q2Q.kr</span> */}
//           <span>Community</span>
//         </Link>
//         <SearchField />
//         {/* <Link href="/admin">
//           <div>admin</div>
//         </Link> */}

//         <UserButton className="sm:ms-auto" />
//       </div>
//     </header>
//   );
// }

// import { validateRequest } from "@/auth";
// import SearchField from "@/components/SearchField";
// import { Button } from "@/components/ui/button";
// import UserButton from "@/components/UserButton";
// import Image from "next/image";
// import Link from "next/link";
// import hashlogo from "@/assets/QQ.png";
// import { BookmarkPlus, Home, Mail } from "lucide-react";

// import prisma from "@/lib/prisma";
// import NotificationsButton from "./NotificationsButton";

// export default async function Navbar() {
//   const { user } = await validateRequest();
//   const unreadNotificationCount = user
//     ? await prisma.notification.count({
//         where: {
//           recipientId: user?.id,
//           read: false,
//         },
//       })
//     : 0;

//   return (
//     <header className="sticky top-0 z-10 bg-card shadow-sm">
//       <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-3">
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-2xl font-bold text-primary"
//         >
//           <Image src={hashlogo} alt="Logo" width={50} height={50} priority />
//           <span>Community</span>
//         </Link>
//         <SearchField />

//         {/* PC에서만 보이는 메뉴 아이템들 */}
//         <div className="hidden lg:flex items-center gap-2">
//           <Button
//             variant="ghost"
//             className="flex items-center justify-start gap-3"
//             title="Home"
//             asChild
//           >
//             <Link href="/">
//               <Home />
//             </Link>
//           </Button>

//           <NotificationsButton
//             initialState={{ unreadCount: unreadNotificationCount }}
//             isLoggedIn={!!user}
//           />

//           {/* 채팅기능 숨기기_나중에 구현 */}
//           <Button
//             variant="ghost"
//             className="flex items-center justify-start gap-3"
//             title="Messages"
//             asChild
//           >
//             <Link href={user ? "/messages" : "/login"}>
//               <Mail />
//             </Link>
//           </Button>

//           <Button
//             variant="ghost"
//             className="flex items-center justify-start gap-3"
//             title="Bookmarks"
//             asChild
//           >
//             <Link href={user ? "/bookmarks" : "/login"}>
//               <BookmarkPlus />
//             </Link>
//           </Button>
//         </div>

//         <UserButton className="sm:ms-auto" />
//       </div>
//     </header>
//   );
// }

import { validateRequest } from "@/auth";
import SearchField from "@/components/UnifiedSearch";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";
import hashlogo from "@/assets/mebook.png";
import prisma from "@/lib/prisma";
import NotificationsButton from "./NotificationsButton";
import UnifiedSearch from "@/components/UnifiedSearch";

export default async function Navbar() {
  const { user } = await validateRequest();
  const unreadNotificationCount = user
    ? await prisma.notification.count({
        where: {
          recipientId: user?.id,
          read: false,
        },
      })
    : 0;

  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src={hashlogo} alt="Logo" width={40} height={40} priority />
          <div className="flex items-center">
            <span className="text-sm text-black ml-1">
              『내생각과 책이 만나는 순간』
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {/* <UnifiedSearch /> */}

          <NotificationsButton
            initialState={{ unreadCount: unreadNotificationCount }}
            isLoggedIn={!!user}
          />

          <UserButton className="sm:ms-auto" />
        </div>
      </div>
    </header>
  );
}
