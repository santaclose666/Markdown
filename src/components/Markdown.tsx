import React, { useState } from "react";
import Editor from "./Editor";
import Preview from "./Preview";

function Markdown() {
  const [data, setData] = useState("");

  const handleChange = (s: string) => {
    setData(s);
  };

  return (
    <div className="flex w-full h-full">
      <Editor data={data} onDataChange={handleChange} />
      <Preview data={data} />
    </div>
  );
}

export default Markdown;
