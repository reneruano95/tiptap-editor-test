import { memo, useEffect, useState } from "react";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { useEditor } from "novel";

import {
  Clipboard,
  Copy,
  GripVertical,
  Plus,
  RemoveFormatting,
  Trash2,
} from "lucide-react";

import { MenubarSeparator } from "@/components/ui/menubar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useContentItemActions } from "../drag-handle-menu/hooks/useContentItemActions";
import { useData } from "../drag-handle-menu/hooks/useData";

export const ContentItemMenu = memo(() => {
  const { editor } = useEditor();

  const [menuOpen, setMenuOpen] = useState(false);

  const data = useData();
  const actions = useContentItemActions(
    editor!,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen) {
      editor?.commands.setMeta("lockDragHandle", true);
    } else {
      editor?.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor!}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          onClick={actions.handleAdd}
          className="w-auto gap-1 min-w-[2rem] h-8 p-1 text-muted-foreground"
        >
          <Plus size={16} />
        </Button>

        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              className="w-auto gap-1 min-w-[2rem] h-8 p-1 text-muted-foreground"
            >
              <GripVertical size={16} />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="p-0"
            asChild
          >
            <div className="p-2 flex flex-col max-w-[16rem] bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800 ">
              <Button
                variant={"ghost"}
                onClick={actions.resetTextFormatting}
                className="flex items-center justify-start h-8  gap-2 p-1.5 text-sm font-medium text-left text-muted-foreground"
              >
                <RemoveFormatting size={18} />
                Clear formatting
              </Button>
              <Button
                variant={"ghost"}
                onClick={actions.copyNodeToClipboard}
                className="flex items-center justify-start h-8  gap-2 p-1.5 text-sm font-medium text-left text-muted-foreground"
              >
                <Clipboard size={18} />
                <span>Copy to clipboard</span>
              </Button>

              <Button
                variant={"ghost"}
                onClick={actions.duplicateNode}
                className="flex items-center justify-start h-8  gap-2 p-1.5 text-sm font-medium text-left text-muted-foreground"
              >
                <Copy size={18} />
                Duplicate
              </Button>
              <MenubarSeparator />
              <Button
                onClick={actions.deleteNode}
                className="flex items-center justify-start h-8  gap-2 p-1.5 text-sm font-medium text-left text-muted-foreground text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
              >
                <Trash2 size={18} />
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DragHandle>
  );
});

ContentItemMenu.displayName = "ContentItemMenu";
