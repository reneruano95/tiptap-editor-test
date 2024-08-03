import { EditorInstance } from "novel";
import { TableOfContentsNode } from "@/components/tiptap-editor/extensions/table-of-contents/table-of-contents-node";
import {
  CodeBlockLowlight,
  HorizontalRule,
  TiptapImage,
  TiptapLink,
} from "novel/extensions";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-column.selected");
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (
  editor: EditorInstance,
  node: HTMLElement
) => {
  const customNodes = [
    HorizontalRule.name,
    CodeBlockLowlight.name,
    TiptapImage.name,
    TiptapLink.name,
    TableOfContentsNode.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};

export default isCustomNodeSelected;
