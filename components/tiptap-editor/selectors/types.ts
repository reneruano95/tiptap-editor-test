import { LucideIcon } from "lucide-react";
import { EditorInstance } from "novel";

export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: EditorInstance) => void;
  isActive: (editor: EditorInstance) => boolean;
};

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}
