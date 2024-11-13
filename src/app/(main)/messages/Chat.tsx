"use client";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useInitializeChatClient from "./useInitializeChatClient";

export default function Chat() {
  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
}

// "use client";

// import { Loader2 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useState } from "react";
// import { Chat as StreamChat } from "stream-chat-react";
// import ChatChannel from "./ChatChannel";
// import ChatSidebar from "./ChatSidebar";
// import useInitializeChatClient from "./useInitializeChatClient";

// export default function Chat() {
//   const chatClient = useInitializeChatClient();
//   const { resolvedTheme } = useTheme();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [selectedChannel, setSelectedChannel] = useState(false);

//   if (!chatClient) {
//     return <Loader2 className="mx-auto my-3 animate-spin" />;
//   }

//   return (
//     <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
//       <div className="absolute bottom-0 top-0 flex w-full">
//         <StreamChat
//           client={chatClient}
//           theme={
//             resolvedTheme === "dark"
//               ? "str-chat__theme-dark"
//               : "str-chat__theme-light"
//           }
//         >
//           <div className="flex h-full w-full flex-col md:flex-row">
//             <ChatSidebar
//               open={sidebarOpen && !selectedChannel}
//               onClose={() => setSidebarOpen(false)}
//               onChannelSelect={() => {
//                 setSelectedChannel(true);
//                 setSidebarOpen(false);
//               }}
//             />
//             <ChatChannel
//               open={!sidebarOpen || selectedChannel}
//               openSidebar={() => {
//                 setSidebarOpen(true);
//                 setSelectedChannel(false);
//               }}
//             />
//           </div>
//         </StreamChat>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { Loader2 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useState } from "react";
// import { Chat as StreamChat } from "stream-chat-react";
// import ChatChannel from "./ChatChannel";
// import ChatSidebar from "./ChatSidebar";
// import useInitializeChatClient from "./useInitializeChatClient";

// export default function Chat() {
//   const chatClient = useInitializeChatClient();
//   const { resolvedTheme } = useTheme();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [selectedChannel, setSelectedChannel] = useState(false);

//   if (!chatClient) {
//     return <Loader2 className="mx-auto my-3 animate-spin" />;
//   }

//   return (
//     <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
//       <div className="absolute bottom-0 top-0 flex w-full">
//         <StreamChat
//           client={chatClient}
//           theme={
//             resolvedTheme === "dark"
//               ? "str-chat__theme-dark"
//               : "str-chat__theme-light"
//           }
//         >
//           <div className="flex h-full w-full flex-col md:flex-row">
//             <ChatSidebar
//               open={!selectedChannel}
//               onClose={() => setSidebarOpen(false)}
//               onChannelSelect={() => {
//                 setSelectedChannel(true);
//                 setSidebarOpen(false);
//               }}
//             />
//             <ChatChannel
//               open={selectedChannel}
//               openSidebar={() => {
//                 setSidebarOpen(true);
//                 setSelectedChannel(false);
//               }}
//             />
//           </div>
//         </StreamChat>
//       </div>
//     </main>
//   );
// }
