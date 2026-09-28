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
leave a note. Progress is saved in the browser's local storage, per tracker, so it stays on
the device and browser you used. Set the start date once in each tracker.

## Running locally

Double-click any HTML file, or serve the folder:

```
python -m http.server 8000
```

then open http://localhost:8000/.

## Editing

See `CLAUDE.md` for the file layout, the saved-state contract, and the manual checklist to
run after a change.
