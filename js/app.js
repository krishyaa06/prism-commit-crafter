(() => {
  const { $, $$, copy, store, esc, debounce } = Prism;
  const st = store.get("commit:state", { type: "feat", emoji: false, scope: "auth", subject: "add discord login to dashboard", body: "Members can now sign in with Discord. Sessions are stored as\nhttp-only cookies and refreshed automatically.", issues: "42" });
  $("#types").innerHTML = Core.TYPES.map((t) => `<button class="ty ${t.type === st.type ? "on" : ""}" data-t="${t.type}"><b>${t.emoji} ${t.type}</b><span>${t.desc}</span></button>`).join("");
  const ids = ["scope", "subject", "body", "issues", "btext", "coauthor"];
  ids.forEach((id) => ($("#" + id).value = st[id === "btext" ? "breakingText" : id] || ""));
  $("#emoji").checked = !!st.emoji; $("#breaking").checked = !!st.breaking; $("#bwrap").hidden = !st.breaking;
  const lintHtml = (l) => (l.issues.length ? l.issues.map((i) => `<li class="${i.level}">${esc(i.msg)}</li>`).join("") : '<li class="ok">Looks great, ready to commit</li>');
  function state() { return { type: st.type, emoji: $("#emoji").checked, scope: $("#scope").value, subject: $("#subject").value, body: $("#body").value, issues: $("#issues").value, breaking: $("#breaking").checked, breakingText: $("#btext").value, coauthor: $("#coauthor").value }; }
  function render() {
    const s = state(); Object.assign(st, s); store.set("commit:state", st);
    const msg = Core.build(s);
    $("#msg").textContent = msg;
    const header = msg.split("\n")[0], n = header.length;
    $("#cnt").textContent = `${n}/72`; $("#cnt").className = "cnt " + (n > 72 ? "bad" : n > 50 ? "warn" : "");
    $("#lint").innerHTML = lintHtml(Core.lint(msg.replace(/^\S+\s(?=\w+[(!:])/u, s.emoji ? "" : "$&")));
    const b = Core.bump([msg]);
    $("#bump").className = "pill " + (b === "major" ? "bad" : b === "minor" ? "acc" : b ? "ok" : ""); $("#bump").textContent = b ? `semver: ${b}` : "no release";
    $("#bwrap").hidden = !s.breaking;
  }
  $("#types").onclick = (e) => { const b = e.target.closest(".ty"); if (!b) return; st.type = b.dataset.t; $$(".ty").forEach((x) => x.classList.toggle("on", x === b)); render(); };
  document.querySelector(".cc .card").addEventListener("input", debounce(render, 80));
  $("#fix").onclick = () => { $("#subject").value = Core.fixSubject($("#subject").value); render(); };
  $("#copy").onclick = () => copy($("#msg").textContent, "Commit message copied");
  $("#copyCmd").onclick = () => { const parts = $("#msg").textContent.split("\n\n"); copy("git commit " + parts.map((p) => `-m ${JSON.stringify(p)}`).join(" "), "git command copied"); };
  const l2 = () => ($("#lint2").innerHTML = $("#lintIn").value.trim() ? lintHtml(Core.lint($("#lintIn").value)) : "");
  $("#lintIn").addEventListener("input", debounce(l2, 100));
  render(); l2();
})();
