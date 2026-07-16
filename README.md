# Databrickster

A free, in-depth learning site for **Data Engineers becoming AI Engineers**. It is a
multi-topic [Docusaurus](https://docusaurus.io/) site located in [`website/`](website/):

- **Databricks AI** *(available)* — from LLM fundamentals to building, evaluating,
  deploying, and governing production AI agents on Databricks, plus an AI system
  design interview track.
- **Genie** *(planned)* — conversational analytics over governed data.
- **Business Intelligence** *(planned)* — AI-era BI on the lakehouse.
- **Agentic Coding** *(planned)* — building AI software faster with VS Code and Claude Code.

## Local development

Requires **Node.js ≥ 20**.

```bash
cd website
npm install
npm run start      # dev server at http://localhost:3000
npm run build      # production build into website/build
```

## Deployment (Render)

This repo includes a [`render.yaml`](render.yaml) Blueprint that deploys the site
as a Render **Static Site**:

- **Root directory:** `website`
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `website/build`
- **Node version:** pinned to 20.20.2

To deploy: create a new Blueprint on Render pointing at this repo, or configure a
Static Site manually with the settings above.

---

Databrickster is an independent educational project and is **not affiliated with,
endorsed by, or sponsored by Databricks, Inc.**
