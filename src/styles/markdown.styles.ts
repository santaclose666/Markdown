import { EditorView } from "@codemirror/basic-setup";
import { tags as t } from "@lezer/highlight";
import { tags as customTags } from "../custom/codemirror.custom";
import { HighlightStyle } from "@codemirror/language";

// Using https://github.com/atom/one-light-syntax as reference for the colors
// Config ...
const syntaxHue = "230";
// syntaxSaturation = '1%',
// syntaxBrightness = '98%';
// Monochrome ...
export const mono1 = `hsl(${syntaxHue},8%,24%)`,
  mono2 = `hsl(${syntaxHue},6%,44%)`,
  mono3 = `hsl(${syntaxHue},4%,64%)`;
// Colors
export const hue1 = "hsl(198, 99%, 37%)", // <-cyan
  hue2 = "hsl(221, 87%, 60%)", // <-blue
  hue3 = "hsl(301, 63%, 40%)", // <-purple
  hue4 = "hsl(119, 34%, 47%)", // <-green
  hue5 = "hsl(  5, 74%, 59%)", // <-red 1
  hue5_2 = "hsl(344, 84%, 43%)", // <-red 2
  hue6 = "hsl(41, 99%, 30%)", // <-orange 1
  hue6_2 = "hsl(41, 99%, 38%)"; // <-orange 2
// Base colors ________
const syntaxFg = `${mono1}`,
  // syntaxBg = `hsl(${syntaxHue},${syntaxSaturation},${syntaxBrightness})`,
  // syntaxGutter = `darken(${syntaxBg},36%)`,
  // syntaxGuide = `fade${syntaxFg},20%`,
  syntaxAccent = `hsl${syntaxHue},100%,66%`;

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors
// const chalky = '#e5c07b',
//   coral = '#1d1d1d',
//   cyan = '#56b6c2',
//   invalid = '#ffffff',
//   malibu = '#1478fc',
//   sage = '#98c379',
//   whiskey = '#d19a66',
//   violet = '#c678dd';
const ivory = "#222222",
  stone = "#7d8799",
  // highlightBackground = '#eeeeee';
  highlightBackground = hue2;

export const background = "#ffffff",
  font =
    "monospace, Mono, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,Mono, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontTxt =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  color = "#222222",
  cursor = hue2,
  highlight = "#eeeeee",
  selection = "#eeeeee",
  selectionMatch = "#eeeeee",
  lineNumber = "#999999",
  matchingBracket = "#b7ccfa",
  tooltipBackground = "#e3e3e3";

export const customTheme = EditorView.theme(
  {
    "&": {
      color: color,
      backgroundColor: background,
      height: "100%",
    },
    // '&.ͼ4 .cm-line:has(.ͼ1h) ': { fontFamily: ' monospace !important' },
    // '&.ͼ4 .cm-line:has(.ͼ14),&.ͼ4 .cm-line:has(.ͼ15)': {
    //   fontFamily:
    //     ' -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important',
    // },
    // '&.ͼ14.ͼ1h': {
    //   fontFamily:
    //     ' -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important',
    // },

    // '.cm-line .ͼ17,.cm-line .ͼ1h': { fontFamily: ' monospace' },
    ".cm-content": {
      caretColor: cursor,
      whiteSpace: "normal",
    },

    "&.cm-editor": {
      borderLeft: "1px solid #e3e3e3",
    },

    "&.cm-editor.cm-focused": {
      outline: "none",
    },

    "& .cm-scroller": {
      fontFamily: fontTxt,
      fontSize: "16px",
    },

    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: cursor,
      borderLeft: `2px solid ${cursor}`,
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: selection,
        color: "unset",
      },

    ".cm-panels": { backgroundColor: background, color: color },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": {
      border: "1px solid #e3e3e3",
      borderLeft: 0,
      borderTop: 0,
      minHeight: "1em",
      padding: "3px",
    },

    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },

    ".cm-activeLine": { backgroundColor: highlight },
    ".cm-selectionMatch": { backgroundColor: selectionMatch },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: matchingBracket,
    },

    ".cm-gutters": {
      backgroundColor: background,
      color: lineNumber,
      border: "none",
    },

    ".cm-activeLineGutter": {
      backgroundColor: highlight,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },

    ".cm-tooltip": {
      border: "none",
      padding: "3px 0",
      backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: ivory,
      },
    },
    ".cm-scroller": {
      overflow: "scroll",
      overflowX: "unset",
      overflowY: "scroll",
      // overflowWrap: 'break-word',
      borderBottom: "1px solid #e3e3e3",
      borderBottomRightRadius: "4px",
      borderBottomLeftRadius: "4px",
      padding: "5px 10px",
    },
  },
  { dark: true }
);

export const customHighlight = HighlightStyle.define([
  // * Chú thích
  // keyword: const , let, interface
  // operatorKeyword: như of ở trong loop
  //  name: các thể loại tên của biến, nhưng không phải trong lúc khai báo
  // character: theo doc là dấu backslash , test không ra
  // labelName: thường dùng để đặt tên cho luồng for loop, dùng kèm với các keyword esc để thoát khỏi các nested loop phức tạp
  //proppertyName: tên props trong obj
  //nameSpace: name để tránh trùng tên , vd: import {something as anotherthing}
  // tagName: tag html
  // definitiTionOperator: =, (), {},
  // definition(t.name): tên lúc khai báo
  // className: có thể là className trong html tag
  // t.separator: dấu câu
  // typeName: type ,ví dụ trong ts
  // modifier: trong js: private, public, protected
  // self: ^this^.obj
  // processingInstruction: các dấu xử lý của markdown như #, * và đồng bọn
  // TODO bổ sung thêm danh sách nếu biết được thêm các tag
  {
    tag: [t.keyword, t.operatorKeyword],
    color: hue3,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: syntaxFg,
    fontFamily: font,
    fontSize: "16px",
  },
  // "Mono, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,Mono, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  {
    // đoạn này để test
    tag: [t.deleted, t.character, t.propertyName, t.macroName],
    fontFamily: font,
    color: hue3,
  },
  {
    tag: [t.labelName, t.propertyName, t.namespace, t.tagName],
    color: hue5,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.color, t.constant(t.variableName), t.standard(t.name)],
    color: hue6,
    fontFamily: font,
  },
  {
    tag: [t.definitionOperator],
    color: hue1,
    fontFamily: font,
  },
  {
    tag: [t.definition(t.variableName), t.className],
    color: hue6_2, // chưa ổn
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.separator],
    color: syntaxFg,
  },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.modifier,
      t.function(t.variableName),
    ],
    color: hue1,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.className],
    color: hue6_2,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.number],
    color: hue6,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.self, t.namespace],
    color: hue5_2,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: [t.url, t.escape, t.regexp, t.link, t.special(t.string), t.string],
    color: hue4,
    fontFamily: font,
  },
  {
    tag: [t.operator],
    color: hue2,
    fontFamily: font,
  },
  {
    tag: [t.meta, t.comment],
    color: stone,
  },
  {
    tag: t.strong,
    fontWeight: "600",
  },
  {
    tag: t.emphasis,
    fontStyle: "italic",
  },
  // {
  //   tag: t.strikethrough,
  //   textDecoration: 'line-through',
  // },
  {
    tag: t.link,
    color: stone,
    textDecoration: "none",
    fontFamily: font,
  },
  { tag: t.heading, fontWeight: "bold", color: color, fontFamily: "Helvetica" },
  {
    tag: t.heading1,
    fontSize: "32px",
    fontWeight: "600",
    lineHeight: "40px",
    fontFamily: `Helvetica, ${fontTxt}`,
  },
  {
    tag: t.heading2,
    fontSize: "1.5em",
    fontWeight: "600",
    lineHeight: "1.25",
    fontFamily: `Helvetica, ${fontTxt}`,
  },
  {
    tag: t.heading3,
    fontSize: "1.25em",
    fontWeight: "600",
    lineHeight: "1.25",
    fontFamily: `Helvetica, ${fontTxt}`,
  },
  {
    tag: t.heading4,
    fontSize: "1em",
    fontWeight: "600",
    lineHeight: "1.25",
    fontFamily: `Helvetica, ${fontTxt}`,
  },
  {
    tag: t.heading5,
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "1.25",
    fontFamily: `Helvetica, ${fontTxt}`,
  },
  {
    tag: customTags.inlineCode,
    padding: "0 4px",
    margin: 0,
    backgroundColor: "#f9e0df",
    borderRadius: "6px",
    //fontSize: '16px',
    color: "#8F0E00",
    fontFamily: "monospace,Mono, Liberation Mono",
    // lineHeight: 0
  },
  {
    tag: [t.monospace],
    padding: "0.2em,0.4em",
    margin: 0,
    // backgroundColor: 'rgba(175,184,193,0.2)',
    borderRadius: "6px",
    fontSize: "16px",
    color: "#24292f",
    fontFamily: "monospace,Mono, Liberation Mono",
  },
  {
    tag: [t.atom, t.bool, t.special(t.variableName), t.null, t.number],
    color: hue6,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: t.atom,
    color: hue1,
  },
  {
    tag: [t.processingInstruction, t.inserted],
    color: color,
    fontFamily: fontTxt,
  },
  {
    tag: [t.string],
    color: hue4,
    fontFamily: font,
    fontSize: "16px",
  },
  {
    tag: t.invalid,
    color: hue5_2,
  },
  {
    tag: [t.attributeName],
    color: hue2,
  },
  {
    tag: [t.punctuation],
    color: hue1,
  },
  {
    tag: [t.bracket],
    color: syntaxFg,
  },
  {
    tag: [t.function(t.propertyName)],
    color: hue2,
    fontFamily: font,
  },
  {
    tag: [t.quote],
    color: "stone",
  },
  {
    tag: [t.squareBracket, t.paren, t.brace],
    color: syntaxAccent,
  },
  // {
  //   tag: [t.list],
  //   marginBlockStart: '4px',
  //   marginBlockEnd: '4px',
  //   marginInlineStart: '0px',
  //   marginInlineEnd: '0px',
  //   paddingInlineStart: '8px',
  // },
  {
    tag: [t.changed],
    // textDecoration: 'line-through',
    fontStyle: "italic",
  },
  {
    // custom tag for Heading processing-instructrion
    tag: [customTags.headingMark],
    color: color,
    fontFamily: "Helvetica",
    fontWeight: 600,
  },
  {
    tag: [customTags.codeMark],
    fontFamily: font,
    color: color,
    fontWeight: "inherit",
  },
  {
    tag: [t.link],
    fontFamily: fontTxt,
    color: mono1,
  },
  {
    tag: [customTags.linkMark],
    fontFamily: fontTxt,
    color: color,
    fontWeight: "inherit",
  },
  { tag: [t.url], color: "#0969da" },
  {
    tag: customTags.highlight,
    color: mono1,
    backgroundColor: "#fff300",
    borderRadius: "5px",
    fontWeight: 600,
    padding: "0 4px",
  },
  {
    tag: customTags.superscript,
    color: color,
    fontWeight: "inherit",
    verticalAlign: "super",
    fontSize: "12px",
  },
  {
    tag: customTags.subscript,
    color: color,
    fontWeight: "inherit",
    verticalAlign: "sub",
    fontSize: "12px",
  },
  {
    tag: customTags.underline,
    color: color,
    fontWeight: "inherit",
    textDecoration: "underline",
    fontSize: "inherit",
  },
  {
    tag: t.deleted,
    textDecoration: "line-through",
  },
]);
