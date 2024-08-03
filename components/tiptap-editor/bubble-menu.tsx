import { EditorBubble } from "novel";
import { memo, useState } from "react";

import { NodeSelector } from "./selectors/node-selector";
import { Separator } from "../ui/separator";
import { MathSelector } from "./selectors/math-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";
import { TextAlignmentButton } from "./selectors/text-alignment-button";
import { isTextSelected } from "@/lib/utils/isTextSelected";
import isCustomNodeSelected from "@/lib/utils/isCustomNodeSelected";

export const BubbleMenu = memo(() => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <EditorBubble
      shouldShow={({ editor }) => {
        const element = document.querySelector(".selectedCell");

        return (
          isTextSelected(editor) &&
          !isCustomNodeSelected(editor, element as HTMLElement)
        );
      }}
      tippyOptions={{
        placement: "top",
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      <NodeSelector open={openNode} onOpenChange={setOpenNode} />

      <Separator orientation="vertical" />
      <MathSelector />

      <Separator orientation="vertical" />
      <LinkSelector open={openLink} onOpenChange={setOpenLink} />

      <Separator orientation="vertical" />
      <TextButtons />

      <Separator orientation="vertical" />
      <ColorSelector open={openColor} onOpenChange={setOpenColor} />

      <Separator orientation="vertical" />
      <TextAlignmentButton />
    </EditorBubble>
  );
});
