import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { useEditor } from "novel";
import { useCallback } from "react";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { getRenderContainer } from "@/lib/utils/getRenderContainer";

import { ColumnLayout } from "./columns";
import { Icon } from "@/components/global/icon";
import { Toolbar } from "@/components/global/toolbar";

interface MenuProps {
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

export const ColumnsMenu = ({ appendTo }: MenuProps) => {
  const { editor } = useEditor();

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor!, "columns");
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor?.isActive("columns");
    return isColumns!;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button
          tooltip="Sidebar left"
          active={
            editor?.isActive("columns", {
              layout: ColumnLayout.SidebarLeft,
            })
              ? true
              : undefined
          }
          onClick={onColumnLeft}
        >
          <Icon name="PanelLeft" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Two columns"
          active={
            editor?.isActive("columns", {
              layout: ColumnLayout.TwoColumn,
            })
              ? true
              : undefined
          }
          onClick={onColumnTwo}
        >
          <Icon name="Columns2" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Sidebar right"
          active={
            editor?.isActive("columns", {
              layout: ColumnLayout.SidebarRight,
            })
              ? true
              : undefined
          }
          onClick={onColumnRight}
        >
          <Icon name="PanelRight" />
        </Toolbar.Button>
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
