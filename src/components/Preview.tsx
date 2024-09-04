import React, { forwardRef, LegacyRef, memo, UIEventHandler } from "react";
import { View } from "../models/view.model";
import { viewStyle } from "../styles";
import parser from "../custom/markdownParser.custom";

interface PreviewProps extends View {
  data: string;
}

function Preview(
  { data, width, height, onScroll }: PreviewProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const contentRender = parser.render(data);

  return (
    <div
      ref={ref}
      className={`markdown-body editor-preview ${viewStyle.view}`}
      dangerouslySetInnerHTML={{ __html: contentRender }}
      onScroll={onScroll}
    />
  );
}

export default memo(forwardRef(Preview));
