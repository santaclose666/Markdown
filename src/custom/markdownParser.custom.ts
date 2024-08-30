import MarkdownIt from "markdown-it";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import footnote from "markdown-it-footnote";
import deflist from "markdown-it-deflist";
import MermaidPlugIn from "./mermaid.custom";
import abbreviation from "markdown-it-abbr";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import highlight from "markdown-it-highlightjs";
import tabs from "markdown-it-codetabs";
import hljs from "highlight.js";
import copy from "markdown-it-code-copy";
import namedCodeBlock from "markdown-it-named-code-blocks";
import markdownit_imsize from "markdown-it-imsize/dist/markdown-it-imsize.js";
import MarkdownItLatex from "markdown-it-latex";
import plantuml from "markdown-it-plantuml";
import mathJax from "markdown-it-mathjax3";
import texMath from "markdown-it-texmath";
import { copyOptions, checkboxOption } from "./pluginOption.custom";
import checkbox from "markdown-it-task-checkbox";
import "markdown-it-latex/dist/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "github-markdown-css/github-markdown-light.css";
import "highlight.js/styles/atom-one-light.css";

const parser = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  langPrefix: "language-",
  typographer: true,
});

parser
  .use(MermaidPlugIn)
  .use(texMath, {
    delimiters: "brackets",
  })
  .use(mathJax)
  .use(subscript)
  .use(superscript)
  .use(footnote)
  .use(deflist)
  .use(markdownit_imsize, { autofill: true })
  .use(MarkdownItLatex)
  .use(abbreviation)
  .use(insert)
  .use(mark)
  .use(checkbox, checkboxOption)
  .use(copy, copyOptions)
  .use(tabs)
  .use(plantuml)
  .use(namedCodeBlock)
  .use(highlight, { hljs });

parser.block.ruler.before(
  "fence",
  "math_block",
  function (state, startLine, endLine, silent) {
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const marker = state.src.slice(startPos, startPos + 3);

    if (
      marker !== "```math" ||
      !state.src.slice(startPos + 3, startPos + 8).match(/^math/)
    ) {
      return false;
    }

    let nextLine = startLine;

    while (++nextLine < endLine) {
      if (
        state.src.slice(state.bMarks[nextLine], state.bMarks[nextLine] + 3) ===
        "```"
      ) {
        state.line = nextLine + 1;
        state.tokens.push({
          type: "math_block",
          content: state.src
            .slice(state.bMarks[startLine + 1], state.bMarks[nextLine])
            .trim(),
          block: true,
          lines: [startLine, state.line],
          level: state.level,
        });
        return true;
      }
    }
    return false;
  }
);

export default parser;
