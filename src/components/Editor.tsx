import React, { memo, useEffect, useRef } from "react";
import { View } from "../models/view.model";
import { viewStyle } from "../styles";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
  ViewUpdate,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {} from "@codemirror/highlight";
import {
  bracketMatching,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { useDebouncedCallback } from "use-debounce";
import { customHighlight, customTheme } from "../styles";
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  Highlight,
  InlineCode,
  MarkStylingExtension,
  Strikethrough,
  SubScript,
  SuperScript,
  Underline,
} from "../custom/codemirror.custom";
import { lintKeymap } from "@codemirror/lint";

interface EditorProps extends View {
  data: string;
  onDataChange: (s: string) => void;
}

function Editor({
  data,
  onDataChange,
  width,
  height,
  containerStyle,
}: EditorProps) {
  const editorRef = useRef(null);

  const handleDocChange = useDebouncedCallback(
    (update: ViewUpdate) => {
      if (update.changes) {
        const newContent = update.state.doc.toString();

        onDataChange(newContent);
      }
    },
    666,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: data,
        extensions: [
          syntaxHighlighting(customHighlight),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          history(),
          drawSelection(),
          dropCursor(),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          crosshairCursor(),
          highlightSelectionMatches(),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          lineNumbers(),

          markdown({
            base: markdownLanguage,
            codeLanguages: (info) => {
              const searchLg = /(.+):|\.(.+)/.exec(info);
              let filterLgName = !searchLg ? info : searchLg[1] ?? searchLg[2];
              if (filterLgName == "php") {
                filterLgName = "javascript";
              }
              const matchLg =
                languages.find((language) =>
                  language.alias.find((alias) => alias === filterLgName)
                ) ?? null;

              return matchLg;
            },
            addKeymap: true,
            extensions: [
              MarkStylingExtension,
              Highlight,
              Underline,
              SubScript,
              SuperScript,
              InlineCode,
              Strikethrough,
            ],
          }),
          // customTheme,

          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...completionKeymap,
            ...lintKeymap,
            indentWithTab,
            ...markdownKeymap,
            ...searchKeymap,
          ]),

          EditorView.updateListener.of(handleDocChange),
        ],
      });

      const view = new EditorView({
        state: state,
        parent: editorRef.current,
      });

      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: data },
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

  return <div className={viewStyle.view} ref={editorRef} />;
}

export default memo(Editor);
