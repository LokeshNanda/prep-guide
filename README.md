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
browser, press **Export** in a tracker, then open the same tracker on the other device and press
**Import**. Import replaces that browser's progress with the file's, after a confirmation.

Export files are named `<tracker>-progress-<date>-<time>.json`, so several exports can sit in one
folder. Where the file goes depends on the platform:

- **Chrome or Edge on a computer:** a Save As dialog; pick any folder, including a Google Drive or
  iCloud Drive folder synced to that computer.
- **iPhone, iPad or Android:** the share sheet; choose "Save to Files" for iCloud Drive, or the
  Google Drive app if it is installed. The shared file is named `.txt` because phones will not
  share `.json` files; Import accepts both.
- **Safari or Firefox on a computer:** the file lands in Downloads; move it wherever you like.

Import opens the normal file picker on every platform, which on iPhone and iPad includes iCloud
Drive and Google Drive.

## Installing as an app

The site is a Progressive Web App and works offline once opened.

- **Android, Chrome or Edge:** open the live URL and press **Install app** on the home page, or use
  the browser's install option.
- **iPhone or iPad:** open the live URL in Safari, tap Share, then **Add to Home Screen**.

Installed or not, progress still lives in that browser's local storage. Use Export and Import to
move it between devices.

## Running locally

Double-click any HTML file, or serve the folder:

```
python -m http.server 8000
```

then open http://localhost:8000/.

## Editing

See `CLAUDE.md` for the file layout, the saved-state contract, and the manual checklist to
run after a change.
