import React, { memo, useRef } from "react";
import { View } from "../models/view.model";
import { viewStyle } from "../styles";
import parser from "../custom/markdownParser.custom";
import "../styles/preview.styles.css";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/atom-one-light.css";

interface PreviewProps extends View {
  data: string;
}

function Preview({ data, width, height }: PreviewProps) {
  const previewRef = useRef(null);
  const contentRender = parser.render(data);

  return (
    <div
      className={`markdown-body editor-preview ${viewStyle.view}`}
      ref={previewRef}
      dangerouslySetInnerHTML={{ __html: contentRender }}
    />
  );
}

export default memo(Preview);
