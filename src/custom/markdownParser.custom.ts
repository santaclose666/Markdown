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
import copyOptions from "./copyMarkdown.custom";

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
  .use(copy, copyOptions)
  .use(tabs)
  .use(plantuml)
  .use(namedCodeBlock)
  .use(highlight, { hljs });

export default parser;
