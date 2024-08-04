import {
  AIHighlight,
  CharacterCount,
  CodeBlockLowlight,
  Color,
  CustomKeymap,
  HighlightExtension,
  HorizontalRule,
  MarkdownExtension,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  Youtube,
  Mathematics,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";
import { Document as TiptapDocument } from "@tiptap/extension-document";
import TableOfContents from "@tiptap-pro/extension-table-of-contents";
import { TextAlign } from "@tiptap/extension-text-align";

import { cx } from "class-variance-authority";
import { common, createLowlight } from "lowlight";

import { TableOfContentsNode } from "./table-of-contents/table-of-contents-node";
import SlashCommand from "./slash-commands/slash-command";
import Column from "./multi-column/column";
import Columns from "./multi-column/columns";
import { Table } from "./table/table";
import { TableHeader } from "./table/header";
import { TableRow } from "./table/row";
import { TableCell } from "./table/cell";
import { Selection } from "./selection/selection";
import { TrailingNode } from "./trailing-node/trailing-node";
import Dropcursor from "@tiptap/extension-dropcursor";

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder.configure({
  includeChildren: true,
  showOnlyCurrent: false,
});
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx("link", "no-underline  hover:underline"),
  },
});

const tableOfContents = TableOfContents;
const tableOfContentsNode = TableOfContentsNode;

const document = TiptapDocument.extend({
  content: "(block|columns)+",
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-2"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.extend({
  renderHTML() {
    return [
      "div",
      (this.options.HTMLAttributes, { "data-type": this.name }),
      ["hr"],
    ];
  },
});

const starterKit = StarterKit.configure({
  document: false,
  dropcursor: false,
  code: false,
  blockquote: false,
  horizontalRule: false,
  codeBlock: false,
  gapcursor: false,
  history: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
  // common: covers 37 language grammars which should be good enough in most cases
  lowlight: createLowlight(common),
});

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
  inline: false,
});

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cx("text-foreground rounded p-1 hover:bg-accent cursor-pointer"),
  },
  katexOptions: {
    throwOnError: false,
  },
});

const characterCount = CharacterCount.configure();

const textAlign = TextAlign.extend({
  addKeyboardShortcuts() {
    return {};
  },
}).configure({
  types: ["heading", "paragraph"],
});

const dropcursor = Dropcursor.configure({
  width: 2,
  class: "ProseMirror-dropcursor border-black",
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  youtube,
  mathematics,
  characterCount,
  TiptapUnderline,
  MarkdownExtension,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  tableOfContents,
  tableOfContentsNode,
  SlashCommand,
  Column,
  Columns,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  textAlign,
  document,
  Selection,
  TrailingNode,
  dropcursor,
];
