"use client";

import { useEffect, useState } from "react";
import { EditorRoot, EditorContent, EditorBubble, useEditor } from "novel";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react";
import * as Y from "yjs";

import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { uploadFn } from "./image-upload";
import { defaultExtensions } from "./extensions/extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { Separator } from "../ui/separator";
import { MathSelector } from "./selectors/math-selector";
import { ContentItemMenu } from "./drag-handle-menu/content-item-menu";

import "@/styles/index.css";

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
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

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
    <div className="relative w-full max-w-screen-lg">
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
              onFirstRender: () => {
                // Scroll to the bottom of the editor
                const { editor } = useEditor();
                editor?.view.dispatch(editor.view.state.tr.scrollIntoView());
              },
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

          <EditorBubble
            tippyOptions={{
              placement: "top",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
          >
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <MathSelector />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
