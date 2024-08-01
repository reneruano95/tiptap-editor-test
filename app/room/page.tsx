"use client";
import { CollaborativeEditor } from "@/components/tiptap-editor/editor";

export default function RoomPage() {
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center p-4">
      <CollaborativeEditor />
    </div>
  );
}
