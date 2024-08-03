import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { useEditor } from "novel";

import * as PopoverMenu from "@/components/global/popover-menu";

import { Toolbar } from "@/components/global/toolbar";
import { isRowGripSelected } from "./utils";
import { Icon } from "@/components/global/icon";
import { MenuProps, ShouldShowProps } from "../types";

export const TableRowMenu = React.memo(
  ({ appendTo }: MenuProps): JSX.Element => {
    const { editor } = useEditor();

    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !from || !editor) {
          return false;
        }

        return isRowGripSelected({ editor, view, state, from });
      },
      [editor]
    );

    const onAddRowBefore = useCallback(() => {
      editor?.chain().focus().addRowBefore().run();
    }, [editor]);

    const onAddRowAfter = useCallback(() => {
      editor?.chain().focus().addRowAfter().run();
    }, [editor]);

    const onDeleteRow = useCallback(() => {
      editor?.chain().focus().deleteRow().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableRowMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          placement: "left",
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper isVertical>
          <div className="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-2 bg-white rounded-lg dark:bg-black shadow-sm border border-neutral-200 dark:border-neutral-800">
            <PopoverMenu.Item
              iconComponent={<Icon name="ArrowUpToLine" />}
              close={false}
              label="Add row before"
              onClick={onAddRowBefore}
            />
            <PopoverMenu.Item
              iconComponent={<Icon name="ArrowDownToLine" />}
              close={false}
              label="Add row after"
              onClick={onAddRowAfter}
            />
            <PopoverMenu.Item
              icon="Trash"
              close={false}
              label="Delete row"
              onClick={onDeleteRow}
            />
          </div>
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  }
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
