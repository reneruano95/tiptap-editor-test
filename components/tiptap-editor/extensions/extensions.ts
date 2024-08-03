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
  Twitter,
  UpdatedImage,
  Youtube,
  Mathematics,
} from "novel/extensions";
import { UploadImagesPlugin } from "novel/plugins";
import AutoJoiner from "tiptap-extension-auto-joiner";

import TableOfContents from "@tiptap-pro/extension-table-of-contents";
import { TextAlign } from "@tiptap/extension-text-align";
import { cx } from "class-variance-authority";
import { common, createLowlight } from "lowlight";

import { TableOfContentsNode } from "./table-of-contents/table-of-contents-node";
import SlashCommand from "./slash-commands/slash-command";
import Column from "./multi-column/column";
import Columns from "./multi-column/columns";
import Table from "./table/table";
import TableHeader from "./table/header";
import TableRow from "./table/row";
import { TableCell } from "./table/cell";

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

const autoJoiner = AutoJoiner.configure({
  elementsToJoin: ["bulletList", "orderedList"], // default
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
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },

  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  heading: {
    HTMLAttributes: {
      class: cx("font-title font-bold"),
    },
  },

  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
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
  autoJoiner,
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
];
