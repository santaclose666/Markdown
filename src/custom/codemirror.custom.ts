import { styleTags, Tag, tags as defaultTags } from "@lezer/highlight";
import { MarkdownConfig } from "@lezer/markdown";
export const tags = {
  highlight: Tag.define(),
  underline: Tag.define(),
  subscript: Tag.define(),
  superscript: Tag.define(),
  inlineCode: Tag.define(),
  blockCode: Tag.define(),
  headingMark: Tag.define(),
  codeMark: Tag.define(),
  linkLabel: Tag.define(),
  linkMark: Tag.define(),
  linkTitle: Tag.define(),
  fencedCode: Tag.define(),
};
export const MarkStylingExtension: MarkdownConfig = {
  props: [
    styleTags({
      HeaderMark: tags.headingMark,
      LinkLabel: tags.linkLabel,
      LinkTitle: tags.linkTitle,
      LinkMark: tags.linkMark,
      CodeMark: tags.codeMark,
      FencedCode: tags.fencedCode,
    }),
  ],
};

const HighlightDelim = { resolve: "Highlight" };
export const Highlight = {
  defineNodes: ["Highlight"],
  parseInline: [
    {
      name: "Highlight",
      parse(cx, next, pos) {
        if (next != 61 /* '=' */ || cx.char(pos + 1) != 61) {
          return -1;
        }
        return cx.addDelimiter(HighlightDelim, pos, pos + 2, true, true);
      },
      after: "Emphasis",
    },
  ],
  props: [
    styleTags({
      HighlightMark: defaultTags.processingInstruction,
      "Highlight/...": tags.highlight,
    }),
  ],
} as MarkdownConfig;

const UnderlineDelim = { resolve: "Underline", mark: "UnderlineMark" };
export const Underline = {
  defineNodes: ["Underline", "UnderlineMark"],
  parseInline: [
    {
      name: "Underline",
      parse(cx, next, pos) {
        if (next != 43 /* '+' */ || cx.char(pos + 1) != 43) {
          return -1;
        }
        return cx.addDelimiter(UnderlineDelim, pos, pos + 2, true, true);
      },
      after: "Emphasis",
    },
  ],
  props: [
    styleTags({
      UnderlineMark: defaultTags.processingInstruction,
      "Underline/...": defaultTags.special(tags.underline),
    }),
  ],
} as MarkdownConfig;

const SubScriptDelim = { resolve: "SubScript", mark: "SubScriptMark" };
export const SubScript = {
  defineNodes: ["SubScript", "SubScriptMark"],
  parseInline: [
    {
      name: "SubScript",
      parse(cx, next, pos) {
        if (next != 126 /* '~' */ || cx.char(pos + 1) == 126) {
          return -1;
        }
        return cx.addDelimiter(SubScriptDelim, pos, pos + 1, true, true);
      },
      after: "Emphasis",
    },
  ],
  props: [
    styleTags({
      SubScriptMark: defaultTags.processingInstruction,
      "SubScript/...": defaultTags.special(tags.subscript),
    }),
  ],
} as MarkdownConfig;

const SuperScriptDelim = { resolve: "SuperScript", mark: "SuperScript" };
export const SuperScript = {
  defineNodes: ["SuperScript", "SuperScriptMark"],
  parseInline: [
    {
      name: "SuperScript",
      parse(cx, next, pos) {
        if (next != 94 /* '^' */) {
          return -1;
        }
        return cx.addDelimiter(SuperScriptDelim, pos, pos + 1, true, true);
      },
      after: "Emphasis",
    },
  ],
  props: [
    styleTags({
      SuperScriptMark: defaultTags.processingInstruction,
      "SuperScript/...": defaultTags.special(tags.superscript),
    }),
  ],
} as MarkdownConfig;

const InlineCodeDelim = { resolve: "InlineCode" };
export const InlineCode = {
  defineNodes: ["InlineCode"],
  parseInline: [
    {
      name: "InlineCode",
      parse(cx, next, pos) {
        // console.log(next, pos);
        if (next != 96 /* '`' */) {
          return -1;
        }

        if (cx.char(pos - 1) == 96 || cx.char(pos + 1) == 96) {
          return -1;
        }

        return cx.addDelimiter(InlineCodeDelim, pos, pos + 1, true, true);
      },
      after: "FencedCode",
    },
  ],
  props: [
    styleTags({
      InlineCodeMark: defaultTags.processingInstruction,
      "InlineCode/...": defaultTags.special(tags.inlineCode),
    }),
  ],
} as MarkdownConfig;

export const Strikethrough = {
  defineNodes: ["Strikethrough"],
  props: [
    styleTags({
      "Strikethrough/...": defaultTags.deleted,
    }),
  ],
};
