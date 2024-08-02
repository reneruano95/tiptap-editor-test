import { useEffect, useState } from "react";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import { useEditor } from "novel";

import {
  Clipboard,
  Copy,
  GripVertical,
  Plus,
  RemoveFormatting,
} from "lucide-react";

import { MenubarSeparator } from "@/components/ui/menubar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useContentItemActions } from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";

export const ContentItemMenu = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-0.5">
        <Button onClick={actions.handleAdd}>
          <Plus size={18} />
        </Button>

        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger>
            <GripVertical size={18} />
          </PopoverTrigger>

          <PopoverContent side="bottom" align="start" sideOffset={8}>
            <div className="p-2 flex flex-col min-w-[16rem]">
              <Button onClick={actions.resetTextFormatting}>
                <RemoveFormatting size={18} />
                Clear formatting
              </Button>
              <Button onClick={actions.copyNodeToClipboard}>
                <Clipboard size={18} />
                Copy to clipboard
              </Button>

              <Button onClick={actions.duplicateNode}>
                <Copy size={18} />
                Duplicate
              </Button>
              <MenubarSeparator />
              <Button
                onClick={actions.deleteNode}
                className="text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
              >
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DragHandle>
  );
};
