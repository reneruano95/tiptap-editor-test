import { cx } from "class-variance-authority";
import { UploadImagesPlugin } from "novel/plugins";

import { TiptapImage } from "novel/extensions";

export const Image = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
  group: "block",
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});
