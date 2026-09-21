export function getThoughtPreview(content: string) {
  const plainText = content
    .replace(/<[^>]*>/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}(?:#{1,6}\s+|>\s*|[-+*]\s+|\d+[.)、]\s*)/gm, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const characters = Array.from(plainText);
  const count = characters.filter((character) => !/\s/.test(character)).length;
  let length = 0;
  let preview = "";
  for (const character of characters) {
    if (!/\s/.test(character)) length += 1;
    if (length > 100) break;
    preview += character;
  }
  return { preview: preview.trimEnd(), count, collapsed: count > 100 };
}
