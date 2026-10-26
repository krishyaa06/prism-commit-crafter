<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:F5C561,100:3EE69A&height=200&section=header&text=Prism%20Commit%20Crafter&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Conventional%20Commits%20%C2%B7%20Lint%20%C2%B7%20Semver&descAlignY=58&descSize=16" width="100%" alt="Prism Commit Crafter" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=F5C561&center=true&vCenter=true&width=680&lines=feat%28auth%29%3A+add+discord+login;Lint%3A+use+imperative+mood;feat%21+%E2%86%92+major+release;Copy+as+a+git+command" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-commit-crafter/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-commit-crafter/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-commit-crafter/"><img src="https://img.shields.io/badge/Live_Demo-Open-F5C561?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-F5C561?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-commit-crafter?style=for-the-badge&color=3EE69A" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Commit Crafter screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism Commit Crafter** helps you and your team write consistent, meaningful commit history. Pick a type, add scope and subject, and it produces a properly formatted Conventional Commit with wrapped body and footers. The linter flags issues like past tense, trailing periods and long headers, and shows which semantic version bump the message implies.

## ✨ Features

- **11 commit types** with descriptions and optional **gitmoji**
- Scope, body (auto-wrapped at 72), **breaking change**, `Closes #` and `Co-authored-by` footers
- **Live linter**: format, length, imperative mood, casing, blank line
- **Semver bump** preview: major / minor / patch / none
- **Auto-fix** subject ("Added X." → "add X")
- Copy the message or a ready-to-run `git commit -m ... -m ...` command

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Commit Crafter on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Commit Crafter on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-commit-crafter/](https://krishyaa06.github.io/prism-commit-crafter/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-commit-crafter.git
cd prism-commit-crafter
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

```text
feat(auth)!: add discord login to dashboard

Members can now sign in with Discord.

BREAKING CHANGE: old session cookies are invalidated
Closes #42
```

Paste any existing message into **Lint any message** to review it.

## 📁 Project Structure

```text
prism-commit-crafter/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # builder, linter, semver logic — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Commit Crafter is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3EE69A,50:F5C561,100:07060f&height=110&section=footer" width="100%" alt="" />
