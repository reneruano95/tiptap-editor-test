"use client";

import { CollaborativeEditor } from "@/components/tiptap-editor/advance-editor";

export default function RoomPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex flex-col p-6 border max-w-xl w-full gap-6 rounded-md bg-card">
        <CollaborativeEditor />
      </div>
    </main>
  );
}
