# prep-guide

Personal interview-prep trackers. Static site, no build step, deployed to GitHub Pages by
`.github/workflows/pages.yml` on every push to `main`. The user site has a custom domain, so it is served
at https://lokeshnanda.com/prep-guide/ and also opened directly from disk.

## Layout

```
index.html                  landing page: one card per tracker, reads each tracker's saved progress
trackers/dsa.html           DSA Pattern Tracker        20 weeks x 6 days = 120   localStorage key "dsa-tracker"
trackers/sql.html           SQL Pattern Tracker        16 weeks x 6 days = 96    localStorage key "sql-tracker"
trackers/pyspark.html       PySpark Depth Tracker      20 weeks x 6 days = 120   localStorage key "pyspark-tracker"
trackers/system-design.html System Design Tracker      20 weeks x 6 days = 120   localStorage key "sd-tracker"
```

## Hard rules

- **One tracker = one self-contained HTML file.** Do not split CSS or JS into shared files.
  The files must keep working when opened via `file://` on a phone or laptop with no server.
- **Never break saved progress.** State is stored in `localStorage` under the key listed above.
  If you change the saved shape, migrate old data on load; never rename a key or drop fields.
- **No new external dependencies** beyond Google Fonts (IBM Plex) and, in `sql.html` only,
  sql.js from cdnjs. Everything else is inline.
- **Mobile first and dark mode are requirements**, not extras. Every colour is a token on
  `:root`, redefined under `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`.
- **Filenames stay lowercase kebab-case.** `index.html` links to them by relative path.

## Structure inside each tracker (keep this order)

1. `<head>`: meta, title, font link, `<style>` with tokens first, then component styles.
2. `<body>`: header (title, `.sub` line, status, export button), progress matrix, lesson card,
   week card + day card.
3. `<script>`: `const PLAN = [...]` (the curriculum data), then `LESSONS`/other data arrays,
   then `let state = {start, days:{}, templates:{}, view}` and the logic.

Curriculum edits go in `PLAN` (and `LESSONS` where present). Each week is
`{ph, t, tell, p:[six day titles], ...}`. Day records are keyed `w{week}d{day}` (1-based)
and hold `done`, `unaided`, `revisit`, `note`, plus per-tracker extras. `persisted()` strips
transient fields (`view`, `open`, and in SQL `hint`/`sol`) before saving.

## Runtime

- `save()` always writes to `localStorage`. If the page is running inside a Claude artifact
  (`window.claude` exists) it also syncs to the artifact db and enables Export JSON.
  Always guard those calls with `window.claude ? ... : null` so the page works on Pages.
- Status text: "Synced" (artifact db), "Offline (this browser only)" (Pages or file://).

## Verifying a change

There are no automated tests. Open the changed file in a browser (or `python -m http.server`
from the repo root and visit `/index.html`) and check:

1. No console errors on load.
2. Light and dark modes both render.
3. Mark a day done, reload, and confirm it persisted.
4. Narrow the window to ~375px and confirm no horizontal scroll.

## Commits

Plain messages, no co-author trailers (see global CLAUDE.md).
