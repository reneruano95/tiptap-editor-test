import { memo, useCallback } from "react";
import { EditorBubbleItem, useEditor } from "novel";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SelectorItem } from "./types";

export const TextButtons = memo(() => {
  const { editor } = useEditor();

  const onBold = useCallback(
    () => editor?.chain().focus().toggleBold().run(),
    [editor]
  );
  const onItalic = useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor]
  );
  const onStrike = useCallback(
    () => editor?.chain().focus().toggleStrike().run(),
    [editor]
  );
  const onUnderline = useCallback(
    () => editor?.chain().focus().toggleUnderline().run(),
    [editor]
  );
  const onCode = useCallback(
    () => editor?.chain().focus().toggleCode().run(),
    [editor]
  );

  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: onBold,
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: onItalic,
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: onUnderline,
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: onStrike,
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: (editor) => editor.isActive("code"),
      command: onCode,
      icon: CodeIcon,
    },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="sm" className="rounded-none px-2 py-1" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor!),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
});

TextButtons.displayName = "TextButtons";
