# prep-guide

Daily interview-prep trackers as single-file HTML pages. No build step, no backend.

Live: https://lokeshnanda.com/prep-guide/

| Tracker | File | Plan |
|---|---|---|
| DSA Pattern Tracker | `trackers/dsa.html` | 20 weeks, 120 problems |
| SQL Pattern Tracker | `trackers/sql.html` | 16 weeks, 96 questions on a seeded in-browser database |
| PySpark Depth Tracker | `trackers/pyspark.html` | 20 weeks, 120 exercises |
| System Design Tracker | `trackers/system-design.html` | 20 weeks, 120 sessions |
| Kafka Depth Tracker | `trackers/kafka.html` | 16 weeks, 96 labs and drills |

## Using it

Open `index.html` (or the live URL) and pick a tracker. Each one shows a week-by-day matrix,
today's lesson, and a day card where you mark the session done, unaided, or to revisit and
leave a note. Set the start date once in each tracker.

Progress is saved in the browser's local storage, per tracker. To move it to another device or
browser, press **Export** in a tracker to download a JSON file, then open the same tracker on the
other device and press **Import**. Import replaces that browser's progress with the file's, after a
confirmation. Works in Chrome, Safari, Firefox and Edge.

## Running locally

Double-click any HTML file, or serve the folder:

```
python -m http.server 8000
```

then open http://localhost:8000/.

## Editing

See `CLAUDE.md` for the file layout, the saved-state contract, and the manual checklist to
run after a change.
