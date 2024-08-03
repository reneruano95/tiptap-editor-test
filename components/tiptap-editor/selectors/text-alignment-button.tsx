import { EditorBubbleItem, useEditor } from "novel";
import { memo, useCallback } from "react";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SelectorItem } from "./types";

export const TextAlignmentButton = memo(() => {
  const { editor } = useEditor();

  const onAlignLeft = useCallback(
    () => editor?.chain().focus().setTextAlign("left").run(),
    [editor]
  );
  const onAlignCenter = useCallback(
    () => editor?.chain().focus().setTextAlign("center").run(),
    [editor]
  );
  const onAlignRight = useCallback(
    () => editor?.chain().focus().setTextAlign("right").run(),
    [editor]
  );
  const onAlignJustify = useCallback(
    () => editor?.chain().focus().setTextAlign("justify").run(),
    [editor]
  );

  const items: SelectorItem[] = [
    {
      name: "align-left",
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
      command: onAlignLeft,
      icon: AlignLeftIcon,
    },
    {
      name: "align-center",
      isActive: (editor) => editor.isActive({ textAlign: "center" }),
      command: onAlignCenter,
      icon: AlignCenterIcon,
    },
    {
      name: "align-right",
      isActive: (editor) => editor.isActive({ textAlign: "right" }),
      command: onAlignRight,
      icon: AlignRightIcon,
    },
    {
      name: "align-justify",
      isActive: (editor) => editor.isActive({ textAlign: "justify" }),
      command: onAlignJustify,
      icon: AlignJustifyIcon,
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

TextAlignmentButton.displayName = "TextAlignmentButton";
