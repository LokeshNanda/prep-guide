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
trackers/kafka.html         Kafka Depth Tracker        16 weeks x 6 days = 96    localStorage key "kafka-tracker"
manifest.webmanifest        PWA manifest (name, icons, start_url, shortcuts to each tracker)
sw.js                       service worker: precaches the shell, network-first with cache fallback
icons/                      icon.svg is the source; the PNGs are rendered from it
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

## Saving, export and import

- `save()` writes the tracker's state to `localStorage` only (debounced). There is no server and
  no artifact runtime; the page must never reference `window.claude`.
- **Export** builds `{tracker, format:1, exportedAt, ...persisted()}` and saves it as
  `<tracker>-progress-YYYY-MM-DD-HHMM.json` (local time). Destination is chosen by the platform:
  desktop Chrome/Edge get a native Save As dialog (`showSaveFilePicker`, any folder including a
  Google Drive or iCloud Drive sync folder); iPhone/iPad/Android get the share sheet
  (`navigator.share` with a file: "Save to Files" is iCloud Drive, the Drive app if installed);
  everything else gets a plain Blob download. User cancel (`AbortError`) is silent; other errors
  fall through to the next method. Direct cloud APIs are out of scope (they need OAuth apps).
  **The shared file is named `.txt` with type `text/plain`**: Chromium's Web Share allowlist
  (`kPermitted` in `share_service_impl.cc`) includes `.txt` but not `.json`, and `canShare` returns
  false for disallowed types, which silently drops to the download path.
- **Import** opens a file picker (accepts `.json` and `.txt`), parses the JSON, checks it has a `days` object and that
  `tracker` matches this page, shows a confirm with done counts and export date, then
  **replaces** the saved state (no merge: days carry no timestamps, so merging could resurrect
  stale entries). Files without a `tracker` field are accepted.
- Status line: "Saved in this browser" by default, "Exported …" / "Imported …" after a transfer,
  "Couldn't save in this browser" if `localStorage` throws (private mode, quota).

## PWA

- Every page links `manifest.webmanifest`, sets `theme-color` and the Apple meta tags, and registers
  `sw.js` (root scope) only when served over http(s); `file://` skips it.
- `sw.js` precaches the `SHELL` list on install. **When you add a tracker, add it to `SHELL`** and
  to the manifest `shortcuts`. Same-origin requests are network-first, so a push reaches users on
  their next online load without bumping `CACHE`; bump it only to purge stale entries. Same-origin
  fetches pass `cache: "no-cache"` (and the precache uses `cache: "reload"`) because GitHub Pages
  serves `Cache-Control: max-age=600`, and a plain `fetch()` inside the worker would otherwise return
  the browser's HTTP-cached copy for up to 10 minutes after a deploy.
- Icons: edit `icons/icon.svg`, then re-render the PNGs (512, 192, 180 for Apple, and a 512
  maskable with the artwork inside the central 80%). A headless-browser screenshot of the SVG works.
- The index shows an "Install app" button when the browser fires `beforeinstallprompt` (Chrome,
  Edge, Android) and an "Add to Home Screen" hint on iOS, which has no prompt API.

## Verifying a change

There are no automated tests. Open the changed file in a browser (or `python -m http.server`
from the repo root and visit `/index.html`) and check:

1. No console errors on load.
2. Light and dark modes both render.
3. Mark a day done, reload, and confirm it persisted.
4. Export, clear local storage, import the file, and confirm the progress comes back.
5. With the local server stopped, reload: the page must still load from the service worker.
6. Narrow the window to ~375px and confirm no horizontal scroll.

## Commits

Plain messages, no co-author trailers (see global CLAUDE.md).
