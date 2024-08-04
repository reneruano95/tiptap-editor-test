"use client";

import { useEffect, useRef, useState } from "react";
import { EditorRoot, EditorContent } from "novel";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react";
import * as Y from "yjs";

import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { uploadFn } from "./image-upload";
import { defaultExtensions } from "./extensions/extensions";
import { ContentItemMenu } from "./drag-handle-menu/content-item-menu";
import ColumnsMenu from "./extensions/multi-column/column-menu";
import TableRowMenu from "./extensions/table/table-row/table-row";
import TableColumnMenu from "./extensions/table/table-column/table-column";
import { BubbleMenu } from "./bubble-menu";

const hljs = require("highlight.js");

export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <Editor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

const Editor = ({ doc, provider }: EditorProps) => {
  const menuContainerRef = useRef(null);

  const [charsCount, setCharsCount] = useState<number>();
  const [wordsCount, setWordsCount] = useState<number>();

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  return (
    <div className="relative w-full max-w-screen-lg" ref={menuContainerRef}>
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        {/* <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
          {saveStatus}
        </div> */}
        <div
          className={
            charsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount} characters
        </div>
        <div
          className={
            wordsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          } // Hide the word count if it's not available
        >
          {wordsCount} words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          className="ease-in-out duration-300 transition-all"
          extensions={[
            ...defaultExtensions,
            // Register the document with Tiptap
            Collaboration.configure({
              document: doc,
              fragment: doc.getXmlFragment("content"),
            }),
            // Attach provider and user info
            CollaborationCursor.configure({
              provider: provider,
            }),
          ]}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          slotAfter={<ImageResizer />}
          onUpdate={({ editor }) => {
            const content = editor.getHTML();
            const highlightedContent = highlightCodeblocks(content);
            const charCount = editor.storage.characterCount.characters();
            const wordCount = editor.storage.characterCount.words();

            setWordsCount(wordCount);
            setCharsCount(charCount);
          }}
        >
          <ContentItemMenu />
          <ColumnsMenu appendTo={menuContainerRef} />
          <TableRowMenu appendTo={menuContainerRef} />
          <TableColumnMenu appendTo={menuContainerRef} />

          <BubbleMenu />
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
