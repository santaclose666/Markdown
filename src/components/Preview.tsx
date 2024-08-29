import React, { memo, useRef } from "react";
import { View } from "../models/view.model";
import { viewStyle } from "../styles";
import parser from "../custom/markdownParser.custom";
import "../styles/previewCustom.styles.css";

interface PreviewProps extends View {
  data: string;
}

function Preview({ data, width, height }: PreviewProps) {
  const previewRef = useRef(null);
  const contentRender = parser.render(data);

  return (
    <div
      ref={previewRef}
      className={viewStyle.view}
      dangerouslySetInnerHTML={{ __html: contentRender }}
    />
  );
}

export default memo(Preview);
