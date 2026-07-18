#!/usr/bin/env python3
"""Convert queued feature entries in the Databricks Features index to links.

Usage: python3 scripts/link_feature.py "Label==slug" "Label2==slug2" ...
Rewrites lines of the form:
    - <Label> *(queued)* — <desc>
into:
    - **[<Label>](/databricks-features/<slug>)** — <desc>
Literal matching (labels may contain regex-special chars). Idempotent.
"""
import sys, pathlib

INDEX = pathlib.Path(__file__).resolve().parent.parent / "databricks-features" / "intro.mdx"

pairs = []
for arg in sys.argv[1:]:
    label, slug = arg.rsplit("==", 1)
    pairs.append((label, slug))

lines = INDEX.read_text(encoding="utf-8").split("\n")
done, missing = [], []
for label, slug in pairs:
    prefix = f"- {label} *(queued)*"
    hit = False
    for i, ln in enumerate(lines):
        if ln.startswith(prefix):
            rest = ln[len(prefix):]  # e.g. " — desc"
            lines[i] = f"- **[{label}](/databricks-features/{slug})**{rest}"
            hit = True
            break
    (done if hit else missing).append(label)

INDEX.write_text("\n".join(lines), encoding="utf-8")
print("linked:", ", ".join(done) if done else "(none)")
if missing:
    print("NOT FOUND (check exact label):", " | ".join(missing))
