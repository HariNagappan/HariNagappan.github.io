# Hari Nagappan — Portfolio

React + TypeScript + Vite, static build, deployed to GitHub Pages with GitHub Actions.
No backend, database, secrets or paid services. Visuals are pure CSS/SVG, so the only runtime dependencies are React and React DOM.

## 1. Extract
Unzip the archive and open the `hari-portfolio` folder in a terminal.

## 2. Install (Node.js 18+, 20 recommended)
```bash
npm install
```

## 3. Run locally
```bash
npm run dev
```
Open the URL it prints (usually http://localhost:5173).

## 4. Build for production
```bash
npm run build      # type-checks, then writes the static site to dist/
npm run preview    # optional: serve dist/ locally
```

## 5. Deploy to GitHub Pages
1. Create a GitHub repository (any name) and push this project to its `main` branch.
   If your default branch is `master`, change `branches: [main]` in `.github/workflows/deploy.yml`.
2. In the repository go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The site appears at
   `https://<your-username>.github.io/<repo-name>/`.

### Repository name and the Vite `base` path
You normally configure nothing. The workflow reads your repository name and sets `VITE_BASE=/<repo-name>/`
for the build, and `vite.config.ts` uses it. Rename the repo and the next deploy picks up the new name.
- A repo named `<username>.github.io` is served from the root, and the workflow uses `/` automatically.
- To force a value locally: `VITE_BASE=/my-repo/ npm run build` (macOS/Linux) or
  `$env:VITE_BASE="/my-repo/"; npm run build` (PowerShell).
- To hard-code it instead, edit the `base:` line in `vite.config.ts`.

## 6. Make it yours
- **Contact links:** replace the three placeholders in `src/content.ts`. Until you do, the page shows a
  small "placeholder" tag beside them.
- **Copy and projects:** everything else lives in `src/App.tsx`. Colors, type and layout are in `src/index.css`.
