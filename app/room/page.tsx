"use client";

import { CollaborativeEditor } from "@/components/tiptap-editor/advance-editor";

export default function RoomPage() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-between p-6">
      <div className="flex h-full flex-col max-w-[800px] w-full rounded-md bg-card">
        <CollaborativeEditor />
      </div>
    </main>
  );
}
