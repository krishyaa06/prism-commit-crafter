/* Prism Commit Crafter · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const TYPES = [
    { type: "feat", emoji: "✨", desc: "A new feature", bump: "minor" },
    { type: "fix", emoji: "🐛", desc: "A bug fix", bump: "patch" },
    { type: "docs", emoji: "📝", desc: "Documentation only", bump: null },
    { type: "style", emoji: "💄", desc: "Formatting, no code change", bump: null },
    { type: "refactor", emoji: "♻️", desc: "Code change that is neither a fix nor a feature", bump: null },
    { type: "perf", emoji: "⚡", desc: "Performance improvement", bump: "patch" },
    { type: "test", emoji: "✅", desc: "Adding or fixing tests", bump: null },
    { type: "build", emoji: "📦", desc: "Build system or dependencies", bump: null },
    { type: "ci", emoji: "👷", desc: "CI configuration", bump: null },
    { type: "chore", emoji: "🔧", desc: "Other changes", bump: null },
    { type: "revert", emoji: "⏪", desc: "Reverts a previous commit", bump: "patch" },
  ];
  const IMPERATIVE = { added: "add", adds: "add", adding: "add", fixed: "fix", fixes: "fix", fixing: "fix", updated: "update", updates: "update", updating: "update", removed: "remove", removes: "remove", removing: "remove", changed: "change", changes: "change", changing: "change", created: "create", creates: "create", improved: "improve", improves: "improve", refactored: "refactor", renamed: "rename", moved: "move", deleted: "delete", implemented: "implement", bumped: "bump" };
  function build(c) {
    const t = TYPES.find((x) => x.type === c.type) || TYPES[0];
    const scope = c.scope ? `(${c.scope.trim()})` : "";
    const bang = c.breaking ? "!" : "";
    const subject = (c.subject || "").trim();
    let header = `${c.emoji ? t.emoji + " " : ""}${t.type}${scope}${bang}: ${subject}`;
    const parts = [header];
    if (c.body && c.body.trim()) parts.push(wrap(c.body.trim(), 72));
    const footers = [];
    if (c.breaking && c.breakingText) footers.push(`BREAKING CHANGE: ${c.breakingText.trim()}`);
    if (c.issues) c.issues.split(/[\s,]+/).filter(Boolean).forEach((i) => footers.push(`${c.closes === false ? "Refs" : "Closes"} #${i.replace(/^#/, "")}`));
    if (c.coauthor) footers.push(`Co-authored-by: ${c.coauthor.trim()}`);
    if (footers.length) parts.push(footers.join("\n"));
    return parts.join("\n\n");
  }
  function wrap(text, width) {
    return text.split("\n").map((para) => {
      if (/^\s*[-*]\s/.test(para) || para.length <= width) return para;
      const words = para.split(" "), lines = []; let line = "";
      for (const w of words) { if ((line + " " + w).trim().length > width) { lines.push(line.trim()); line = w; } else line += " " + w; }
      lines.push(line.trim()); return lines.join("\n");
    }).join("\n");
  }
  const HEADER = /^(?:\S+\s)?(\w+)(?:\(([^)]+)\))?(!)?: (.+)$/u;
  function lint(message) {
    const issues = [];
    const [header = "", ...rest] = message.split("\n");
    const m = HEADER.exec(header);
    if (!m) { issues.push({ level: "error", msg: "Header must look like `type(scope): subject`" }); return { ok: false, issues }; }
    const [, type, scope, bang, subject] = m;
    if (!TYPES.some((t) => t.type === type)) issues.push({ level: "error", msg: `Unknown type "${type}". Use one of: ${TYPES.map((t) => t.type).join(", ")}` });
    if (type !== type.toLowerCase()) issues.push({ level: "error", msg: "Type must be lowercase" });
    if (header.length > 72) issues.push({ level: "error", msg: `Header is ${header.length} chars (max 72)` });
    else if (header.length > 50) issues.push({ level: "warn", msg: `Header is ${header.length} chars; 50 or less reads best` });
    if (/\.$/.test(subject)) issues.push({ level: "warn", msg: "Subject should not end with a period" });
    if (/^[A-Z]/.test(subject) && !/^[A-Z]{2,}/.test(subject)) issues.push({ level: "warn", msg: "Start the subject in lowercase" });
    const first = subject.split(" ")[0].toLowerCase();
    if (IMPERATIVE[first]) issues.push({ level: "warn", msg: `Use the imperative mood: "${IMPERATIVE[first]}" instead of "${first}"` });
    if (subject.trim().length < 6) issues.push({ level: "warn", msg: "Subject is very short; describe what changed" });
    if (rest.length && rest[0].trim() !== "") issues.push({ level: "error", msg: "Leave a blank line between header and body" });
    if (scope && /\s/.test(scope)) issues.push({ level: "warn", msg: "Scope should not contain spaces" });
    return { ok: !issues.some((i) => i.level === "error"), issues, type, scope: scope || null, breaking: !!bang || /BREAKING CHANGE:/.test(message) };
  }
  function bump(messages) {
    let level = null;
    for (const msg of messages) {
      const l = lint(msg); if (!l.type) continue;
      if (l.breaking) return "major";
      const b = TYPES.find((t) => t.type === l.type)?.bump;
      if (b === "minor") level = "minor"; else if (b === "patch" && !level) level = "patch";
    }
    return level;
  }
  const fixSubject = (s) => { const [w, ...r] = s.trim().split(" "); const lw = w ? w.toLowerCase() : ""; return [IMPERATIVE[lw] || lw, ...r].join(" ").replace(/\.$/, ""); };
  return { TYPES, build, lint, bump, wrap, fixSubject };
});
