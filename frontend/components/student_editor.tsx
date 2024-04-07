"use client";

import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  useCreateBlockNote,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEffect, useState } from "react";
import { Block, BlockNoteEditor } from "@blocknote/core";
import { useEditor } from "@tiptap/react";
import { useTheme } from "next-themes";
export default function Editor(props) {
  console.log(props.initial);

  const theme = useTheme();

  const editorTheme =
    theme.resolvedTheme == "dark" ? darkDefaultTheme : lightDefaultTheme;

  // Creates a new editor instance.
  const [blocks, setBlocks] = useState<Block[]>([]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: props.initial,
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      className="-mt-3"
      theme={editorTheme}
      onChange={() => {
        setBlocks(editor.document);
        localStorage.setItem("blocks", JSON.stringify(editor.document));
      }}
    />
  );
}
