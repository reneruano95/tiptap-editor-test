"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider as Provider,
} from "@liveblocks/react";
import { LiveblocksLoader } from "@/components/global/liveblocks-loader";

interface LiveblocksProviderProps {
  children: React.ReactNode;
}

export const LiveblocksProvider = ({ children }: LiveblocksProviderProps) => {
  return (
    <Provider publicApiKey={"pk_dev_jB5fH…hZ39AH"}>
      <ClientSideSuspense fallback={<LiveblocksLoader />}>
        {children}
      </ClientSideSuspense>
    </Provider>
  );
};
