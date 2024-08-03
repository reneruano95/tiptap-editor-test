import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback } from "react";
import * as PopoverMenu from "@/components/global/popover-menu";

import { Toolbar } from "@/components/global/toolbar";
import { isColumnGripSelected } from "./utils";
import { Icon } from "@/components/global/icon";
import { MenuProps, ShouldShowProps } from "../types";
import { useEditor } from "novel";

export const TableColumnMenu = React.memo(
  ({ appendTo }: MenuProps): JSX.Element => {
    const { editor } = useEditor();

    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !editor) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor]
    );

    const onAddColumnBefore = useCallback(() => {
      editor?.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor?.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor?.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 8],
          placement: "top",
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper isVertical>
          <div className="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap p-2 bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800">
            <PopoverMenu.Item
              iconComponent={<Icon name="ArrowLeftToLine" />}
              close={false}
              label="Add column before"
              onClick={onAddColumnBefore}
            />
            <PopoverMenu.Item
              iconComponent={<Icon name="ArrowRightToLine" />}
              close={false}
              label="Add column after"
              onClick={onAddColumnAfter}
            />
            <PopoverMenu.Item
              icon="Trash"
              close={false}
              label="Delete column"
              onClick={onDeleteColumn}
            />
          </div>
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  }
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
