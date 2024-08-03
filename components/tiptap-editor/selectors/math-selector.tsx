import { memo } from "react";
import { useEditor } from "novel";
import { SigmaIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const MathSelector = memo(() => {
  const { editor } = useEditor();
  if (!editor) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-none px-2 py-1"
      onClick={(evt) => {
        if (editor.isActive("math")) {
          editor.chain().focus().unsetLatex().run();
        } else {
          const { from, to } = editor.state.selection;
          const latex = editor.state.doc.textBetween(from, to);

          if (!latex) return;

          editor.chain().focus().setLatex({ latex }).run();
        }
      }}
    >
      <SigmaIcon
        className={cn("size-4", { "text-blue-500": editor.isActive("math") })}
        strokeWidth={2.3}
      />
    </Button>
  );
});

MathSelector.displayName = "MathSelector";
