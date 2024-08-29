import mermaid from "mermaid";
import murmur from "../util/murmurhash";
import type { PluginWithOptions } from "markdown-it";
import type { MermaidConfig } from "mermaid";

type ExtendedPluginWithOptions<T> = PluginWithOptions<T> & { default: T };
type PluginWithOptionsParams = Parameters<PluginWithOptions>;
type RendererRules = PluginWithOptionsParams["0"]["renderer"]["rules"]["fence"];

const MermaidChart = async (code: string) => {
  try {
    const needsUniqueId =
      "render" + murmur(code, Math.round(Math.random() * 100)).toString();
    if (!(await mermaid.parse(code))) throw new Error("Invalid Mermaid code");
    const { svg } = await mermaid.render(needsUniqueId, code);
    return svg;
  } catch (err: any) {
    if (err instanceof Error) {
      const msg = err.message.split("Expecting");

      return `<pre style="color: rgb(220 38 38)" class="mermaid-error">${msg[0]}</pre>`;
    }
  }
};

const MermaidPlugIn: ExtendedPluginWithOptions<MermaidConfig> = (md, opts) => {
  // Initialize mermaid library with options
  mermaid.initialize({ ...MermaidPlugIn.default, ...opts });

  // Create a proxy renderer function
  const proxy: RendererRules = (tokens, idx, options, _, self) =>
    self.renderToken(tokens, idx, options);

  // Get the default renderer function or use the proxy renderer
  const defaultRenderer = md.renderer.rules.fence || proxy;

  // Create a MutationObserver to observe changes in the document
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node instanceof Element) {
            // Find elements with class 'mermaid' and 'data-processed' attribute set to 'false'
            const mermaidElements = node.querySelectorAll(
              '.mermaid[data-processed="false"]'
            );
            mermaidElements.forEach((element) => {
              const code = element.textContent;

              if (element && code && element.isConnected) {
                // Mark element as processed
                element.setAttribute("data-processed", "true");

                // Render code as SVG using MermaidChart function
                MermaidChart(code)
                  .then((svg) => {
                    if (svg) {
                      // Replace element content with rendered SVG
                      element.innerHTML = svg;
                    }
                  })
                  .catch((err) => {
                    console.error("MermaidPlugIn ~ err:", err);
                  });
              } else {
                console.error("placeholderDiv not find", element);
              }
            });
          }
        });
      }
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.startsWith("mermaid")) {
      return `<pre data-processed="false" class="mermaid"">${code}</pre>`;
    }
    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

MermaidPlugIn.default = {
  startOnLoad: false,
  securityLevel: "strict",
  theme: "default",
  flowchart: {
    htmlLabels: false,
    useMaxWidth: true,
  },
  gantt: { axisFormat: "%d/%m/%Y" },
};

export default MermaidPlugIn;
