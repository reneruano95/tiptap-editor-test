import { memo } from "react";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  Code,
  CheckSquare,
  Quote,
  Pilcrow,
} from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components//ui/popover";
import { Button } from "@/components//ui/button";
import { SelectorItem } from "./types";

const items: SelectorItem[] = [
  {
    name: "Text",
    icon: Pilcrow,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .lift("taskItem")
        .liftListItem("listItem")
        .setParagraph()
        .run(),
    isActive: (editor) =>
      editor.isActive("paragraph") &&
      !editor.isActive("orderedList") &&
      !editor.isActive("bulletList") &&
      !editor.isActive("taskList"),
  },
  {
    name: "Heading 1",
    icon: Heading1,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .lift("taskItem")
        .liftListItem("listItem")
        .setHeading({ level: 1 })
        .run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    name: "Heading 2",
    icon: Heading2,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .lift("taskItem")
        .liftListItem("listItem")
        .setHeading({ level: 2 })
        .run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    name: "Heading 3",
    icon: Heading3,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .lift("taskItem")
        .liftListItem("listItem")
        .setHeading({ level: 3 })
        .run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    name: "To-do List",
    icon: CheckSquare,
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskItem"),
  },
  {
    name: "Bullet List",
    icon: ListOrdered,
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  // {
  //   name: "Blockquote",
  //   icon: Quote,
  //   command: (editor) =>
  //     editor.chain().focus().clearNodes().setBlockquote().run(),
  //   isActive: (editor) => editor.isActive("blockquote"),
  // },
  // {
  //   name: "Code BLock",
  //   icon: Code,
  //   command: (editor) =>
  //     editor.chain().focus().clearNodes().toggleCodeBlock().run(),
  //   isActive: (editor) => editor.isActive("codeBlock"),
  // },
];
interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeSelector = memo(
  ({ open, onOpenChange }: NodeSelectorProps) => {
    const { editor } = useEditor();
    if (!editor) return null;

    const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
      name: "Multiple",
    };

    return (
      <Popover modal={true} open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger
          asChild
          className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0"
        >
          <Button size="sm" variant="ghost" className="gap-2 px-2 py-1">
            <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={5} align="start" className="w-48 p-1">
          {items.map((item, index) => (
            <EditorBubbleItem
              key={index}
              onSelect={(editor) => {
                item.command(editor);
                onOpenChange(false);
              }}
              className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </EditorBubbleItem>
          ))}
        </PopoverContent>
      </Popover>
    );
  }
);

NodeSelector.displayName = "NodeSelector";
