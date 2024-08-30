export const inlineFormat = (s: string) => {
  return s.replace(/\\\(\s*(.*?)\s*\\\)/g, (match, content) => {
    return `$${content}$`;
  });
};

export const blockFormat = (s: string) => {
  return s.replace(/^\s*\\\[\s*([\s\S]*?)\s*\\\]\s*$/gm, (match, p1) => {
    return `\n$$\n${p1.trim()}\n$$`;
  });
};

export const formatAItoStandard = (s: string) => {
  const inline = inlineFormat(s);
  const block = blockFormat(inline);

  return block;
};
