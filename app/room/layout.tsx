"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { LiveblocksLoader } from "@/components/global/liveblocks-loader";

interface RoomLayout {
  children: React.ReactNode;
  roomId: string;
}
export default function RoomLayout({ children, roomId }: RoomLayout) {
  return (
    <div className="min-h-screen h-full">
      <RoomProvider id={"new-room"}>
        <ClientSideSuspense fallback={<LiveblocksLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
}
