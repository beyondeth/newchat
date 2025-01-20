// // components/chat/ChatRoomList.tsx
// import React from "react";
// import Image from "next/image";
// import { formatDistanceToNow } from "date-fns";
// import { ko } from "date-fns/locale";

// import Link from "next/link";
// import { ChatRoomData } from "@/lib/chattypes";

// interface ChatRoomListProps {
//   rooms: ChatRoomData[];
//   currentUserId: string;
// }

// export default function ChatRoomList({
//   rooms,
//   currentUserId,
// }: ChatRoomListProps) {
//   // 채팅방의 다른 참여자 정보 가져오기
//   const getOtherParticipant = (room: ChatRoomData) => {
//     return room.participants.find((p) => p.user.id !== currentUserId)?.user;
//   };

//   // 마지막 메시지 가져오기
//   const getLastMessage = (room: ChatRoomData) => {
//     if (room.messages && room.messages.length > 0) {
//       return room.messages[0];
//     }
//     return null;
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-semibold">채팅</h2>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {rooms.length === 0 ? (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             채팅방이 없습니다
//           </div>
//         ) : (
//           rooms.map((room) => {
//             const otherUser = getOtherParticipant(room);
//             const lastMessage = getLastMessage(room);

//             return (
//               //   <Link
//               //     key={room.id}
//               //     href={`/chat/${room.id}`}
//               //     className="block hover:bg-gray-50 transition-colors"
//               //   >
//               // ChatRoomList.tsx에서 링크 수정
//               <Link
//                 key={room.id}
//                 href={`/messages/${room.id}`} // /chat/ 대신 /messages/
//                 className="block hover:bg-gray-50 transition-colors"
//               >
//                 <div className="flex items-center p-4 border-b">
//                   {/* 프로필 이미지 */}
//                   <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
//                     {otherUser?.avatarUrl ? (
//                       <Image
//                         src={otherUser.avatarUrl}
//                         alt={otherUser.displayName}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-500">
//                         {otherUser?.displayName[0]}
//                       </div>
//                     )}
//                   </div>

//                   {/* 채팅방 정보 */}
//                   <div className="ml-4 flex-1 min-w-0">
//                     <div className="flex justify-between items-baseline">
//                       <h3 className="text-sm font-medium truncate">
//                         {otherUser?.displayName}
//                       </h3>
//                       {lastMessage && (
//                         <span className="text-xs text-gray-500">
//                           {formatDistanceToNow(
//                             new Date(lastMessage.createdAt),
//                             {
//                               addSuffix: true,
//                               locale: ko,
//                             },
//                           )}
//                         </span>
//                       )}
//                     </div>
//                     {lastMessage && (
//                       <p className="text-sm text-gray-500 truncate">
//                         {lastMessage.content}
//                       </p>
//                     )}
//                   </div>

//                   {/* 채팅방 상태 */}
//                   {room.isBlocked && (
//                     <div className="ml-2 px-2 py-1 text-xs text-red-500 bg-red-50 rounded">
//                       차단됨
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

"use client"; // 이 줄 추가
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { ChatRoomData } from "@/lib/chattypes";

interface ChatRoomListProps {
  rooms: ChatRoomData[];
  currentUserId: string;
}

export default function ChatRoomList({
  rooms,
  currentUserId,
}: ChatRoomListProps) {
  const getOtherParticipant = (room: ChatRoomData) => {
    return room.participants.find((p) => p.user.id !== currentUserId)?.user;
  };

  const getLastMessage = (room: ChatRoomData) => {
    return room.messages?.[0] || null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">채팅</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            채팅방이 없습니다
          </div>
        ) : (
          rooms.map((room) => {
            const otherUser = getOtherParticipant(room);
            const lastMessage = getLastMessage(room);

            return (
              <Link
                key={room.id}
                href={`/messages/${room.id}`}
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center p-4 border-b">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {otherUser?.avatarUrl ? (
                      <Image
                        src={otherUser.avatarUrl}
                        alt={otherUser.displayName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        {otherUser?.displayName[0]}
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium truncate">
                        {otherUser?.displayName}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(lastMessage.createdAt),
                            {
                              addSuffix: true,
                              locale: ko,
                            },
                          )}
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-gray-500 truncate">
                        {lastMessage.content}
                      </p>
                    )}
                  </div>

                  {room.isBlocked && (
                    <div className="ml-2 px-2 py-1 text-xs text-red-500 bg-red-50 rounded">
                      차단됨
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
