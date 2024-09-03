import React, { useState, useRef } from "react";
import Editor from "./Editor";
import Preview from "./Preview";

function Markdown() {
  const previewRef = useRef(null);

  const [data, setData] = useState("");

  const handleChangeDoc = (s: string) => {
    setData(s);
  };

  const handleEditorScroll = (scroll: number) => {
    console.log(scroll);

    previewRef.current.scrollTop = scroll;
  };

  const handlePreviewScroll = () => {
    // console.log(previewRef.current);
  };

  const handleScroll = (scrollRatio: number) => {
    if (scrollRatio) {
      handleEditorScroll(scrollRatio);
    } else {
      handlePreviewScroll();
    }
  };

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <Editor
        data={data}
        onDataChange={handleChangeDoc}
        onScroll={handleScroll}
      />
      <Preview ref={previewRef} data={data} onScroll={handleScroll} />
    </div>
  );
}

export default Markdown;
