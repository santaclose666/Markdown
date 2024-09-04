import React, { useState, useRef } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import { EditorView } from "@codemirror/view";

function Markdown() {
  const editorRef = useRef<EditorView | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState("");

  const handleChangeDoc = (s: string) => {
    setData(s);
  };

  const handleEditorScroll = (scroll?: number) => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight * scroll!;
    }
  };

  const handlePreviewScroll = () => {
    const { scrollTop, scrollHeight }: HTMLDivElement = previewRef.current!;

    const scrollRatio = scrollTop / scrollHeight;

    if (editorRef.current) {
      editorRef.current.scrollDOM.scrollTop =
        scrollRatio * editorRef.current.scrollDOM.scrollHeight;
    }
  };

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <Editor
        editorViewRef={editorRef}
        data={data}
        onDataChange={handleChangeDoc}
        onScroll={handleEditorScroll}
      />
      <Preview ref={previewRef} data={data} onScroll={handlePreviewScroll} />
    </div>
  );
}

export default Markdown;
