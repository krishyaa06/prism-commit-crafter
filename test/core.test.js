const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");

test("builds a conventional commit", () => {
  const m = C.build({ type: "feat", scope: "auth", subject: "add login", body: "Body text", issues: "12, #13", breaking: true, breakingText: "tokens reset" });
  assert.equal(m, "feat(auth)!: add login\n\nBody text\n\nBREAKING CHANGE: tokens reset\nCloses #12\nCloses #13");
});
test("gitmoji prefix", () => {
  assert.equal(C.build({ type: "fix", subject: "x y z", emoji: true }), "🐛 fix: x y z");
});
test("lint catches common mistakes", () => {
  const l = C.lint("Added new Feature.");
  assert.equal(l.ok, false);
  const l2 = C.lint("feat: Added login.");
  const msgs = l2.issues.map((i) => i.msg).join(" | ");
  assert.match(msgs, /period/); assert.match(msgs, /imperative/); assert.match(msgs, /lowercase/);
  assert.equal(C.lint("fix(ui): align navbar on mobile").issues.length, 0);
  assert.equal(C.lint("feat: add x\nbody").ok, false);
});
test("semver bump", () => {
  assert.equal(C.bump(["fix: a b c d", "docs: readme"]), "patch");
  assert.equal(C.bump(["fix: a", "feat: new thing"]), "minor");
  assert.equal(C.bump(["feat!: drop node 16"]), "major");
  assert.equal(C.bump(["chore: deps"]), null);
});
test("auto-fix and wrap", () => {
  assert.equal(C.fixSubject("Added dark mode."), "add dark mode");
  assert.ok(C.wrap("word ".repeat(40).trim(), 72).split("\n").every((l) => l.length <= 72));
});
