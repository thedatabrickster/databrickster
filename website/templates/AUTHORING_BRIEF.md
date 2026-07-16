# Databrickster Authoring Brief (shared standard for every lesson)

Audience: experienced **Data Engineers** (SQL, Spark, Delta, ETL, warehousing, cloud,
Databricks) who are **complete beginners at AI**. Scope: Databricks **AWS** docs, latest APIs.

## VOICE (most important — prior lessons were "too dense / a bit scary")
- Warm, encouraging, conversational. Talk to one nervous-but-smart person.
- Open every lesson with a relatable everyday scene BEFORE any theory. Reassure beginners they're in the right place.
- Short sentences. Short paragraphs. One idea at a time. Lots of "you".
- Plain words first, fancy term second. Never front-load jargon.
- Simple, everyday analogies (a recipe, a phone's contacts, a coffee order, a delivery driver, a librarian). AVOID analogies that themselves need explaining (hashing, feature vectors, softmax, big-O, floating point). Keep DE analogies as optional "if you've used X…" asides.
- Mark heavier/optional material clearly (e.g. a ":::note Going deeper (optional)" admonition) so a beginner never feels they MUST grok the math to continue.
- End sections with a small confidence boost. Celebrate progress.
- Keep full technical accuracy and ALL required sections — just make the same content friendlier and clearer.

## VISUALS (user asked to improve visualization)
- Use MANY diagrams — aim for 2-4 per lesson. Prefer Mermaid (```mermaid). Use ASCII when it reads more simply.
- Every diagram gets a plain-English caption explaining what to look at and why.
- Prefer simple flowcharts and before/after or "without vs with" comparisons over dense graphs.
- Use small tables for comparisons. Use ✅/❌ for do/don't.

## NARRATION (user asked to improve narration)
- Walk through examples step by step, narrating what happens and WHY at each step, as a patient teacher would.
- After every code block, explain in prose what it does and what to notice — never drop code without narration.

## MDX SAFETY (violations break the build — non-negotiable)
- NO bare `<` or `>` in prose (write "under 200 ms" or `&lt;`); only inside fenced code blocks.
- NO bare `{` or `}` in prose; only inside fenced code blocks.
- Inside any `<details>` block, put BLANK LINES around the inner content.
- File MUST start with YAML frontmatter, nothing before it.
- Admonitions `:::note :::tip :::warning` are fine.

## REQUIRED SECTIONS (H2, exact order, all present, all substantive)
Frontmatter (`sidebar_position`, `title`, `description`) → H1 title → one-line `>` hook → then:
Learning Objectives · Prerequisites · Estimated Reading Time · Business Motivation · Intuition ·
Theory · Deep Dive · Architecture · Internal Working · Step-by-Step Walkthrough · Hands-on Examples ·
Code Examples · Production Considerations · Performance Considerations · Security Considerations ·
Common Mistakes · Best Practices · Interview Questions · Quiz · Summary · Key Takeaways · Glossary ·
Further Reading · Next Lesson.

## EXAMPLES
- Fictional enterprises only: Northwind Trust (asset mgmt), Cascade Mutual (insurance), Harborline Goods (retail), plus banking/healthcare/manufacturing/logistics/restaurants. NEVER a real employer/client/person.
- Code: production-quality, runnable, latest Databricks APIs. Python endpoint `databricks-meta-llama-3-3-70b-instruct`; embeddings `databricks-gte-large-en`; Python client `WorkspaceClient().serving_endpoints.get_open_ai_client()`; SQL `ai_query(endpoint, request, modelParameters => named_struct(...), responseFormat => ...)`.

## OUTPUT
Output ONLY the complete `.mdx` file content, starting with the `---` frontmatter and ending after Next Lesson. No preamble, no surrounding code fence.

## COURSE SLUG MAP (use exact routes for Prerequisites / Next Lesson links)
Part 0: /docs/orientation/what-is-generative-ai · /docs/orientation/databricks-ai-platform-map · /docs/orientation/interview-prep
Part 1: /docs/llm-foundations/tokens-and-tokenization · /embeddings · /vector-similarity · /prompting-fundamentals · /sampling-and-decoding · /context-window · /calling-foundation-models · /interview-prep (all under /docs/llm-foundations/)
Part 2 /docs/rag-and-ai-search/: what-is-rag · chunking · vector-search-index · retrieval · rag-pipeline · rag-quality · interview-prep
Part 3 /docs/agents-tools-mcp/: what-is-an-agent · function-calling · unity-catalog-tools · retrieval-tools · mcp · interview-prep
Part 4 /docs/building-agents/: agent-dev-lifecycle · authoring-agents · agent-bricks · knowledge-assistant · multi-agent-supervisor · genie-agents · databricks-apps · interview-prep
Part 5 /docs/tracing/: why-observability · mlflow-tracing · instrumenting-agents · interview-prep
Part 6 /docs/evaluation/: why-eval-is-hard · evaluation-datasets · llm-judges · human-feedback · production-monitoring · interview-prep
Part 7 /docs/serving/: model-serving · foundation-model-apis · external-and-custom-models · performance-and-cost · interview-prep
Part 8 /docs/llmops/: log-and-register · deploy-agents · prompt-registry · cicd-and-rollback · interview-prep
Part 9 /docs/governance/: unity-ai-gateway · guardrails-and-safety · auth-and-permissions · cost-and-budgets · interview-prep
Part 10 /docs/capstone/: overview · build · evaluate-deploy-govern

Folder naming: docs/NN-<name>/ with NN the part number (02..10). Numeric `NN-` prefixes are stripped from URLs. Each part folder needs a `_category_.json` (label "Part N · Title", position N, generated-index with an explicit slug `/category/part-N-<slug>`).
