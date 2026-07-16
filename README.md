# Databrickster

A free, in-depth course teaching experienced **Data Engineers** how to build
production-grade **Databricks AI & AI Agents** — from LLM fundamentals to
enterprise deployment.

The website is a [Docusaurus](https://docusaurus.io/) site located in
[`website/ai/`](website/ai/).

## Local development

Requires **Node.js ≥ 20**.

```bash
cd website/ai
npm install
npm run start      # dev server at http://localhost:3000
npm run build      # production build into website/ai/build
```

## Deployment (Render)

This repo includes a [`render.yaml`](render.yaml) Blueprint that deploys the site
as a Render **Static Site**:

- **Root directory:** `website/ai`
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `website/ai/build`
- **Node version:** pinned to 20.20.2

To deploy: create a new Blueprint on Render pointing at this repo, or configure a
Static Site manually with the settings above.

---

Databrickster is an independent educational project and is **not affiliated with,
endorsed by, or sponsored by Databricks, Inc.**
