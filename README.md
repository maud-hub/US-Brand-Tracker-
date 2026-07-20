# US Brand Tracker Website

Static internal dashboard for the US Brand Tracker. Open `index.html` in a browser, or serve the folder with any local static server.

## Source Files Used

- `C:\Users\maudi\Downloads\21. Q2 2025 Brand Tracker - Jun2025 (1).pptx`
- `C:\Users\maudi\Downloads\22. Q3 2025 Brand Tracker - SEPT2025 (1).pptx`
- `C:\Users\maudi\Downloads\24. Q1 2026 Brand Tracker Analysis - APR2026.pptx`
- Dedicated Truekind awareness charts on the Q2 2025 and Q3 2025 PPTX Truekind slides
- Raw tracker exports found in Downloads: `Q1 2025.xls`, `Q2 2025.xls`, `Q3 2025.xls`, `Q4 2025.xls`, `Q1 2026.xls`
- User-supplied Q2 2026 Shapermint and Truekind aided/unaided results from 2026-07-20
- User-supplied Q4 2025 Shapermint awareness table image from 2026-07-20
- `C:\Users\maudi\Downloads\export-10197.xls` for Q2 2026 channels and bra aided validation
- `C:\Users\maudi\Downloads\export-10198.xls` for Q4 2025 validation

## Data Policy

Values are only charted when they are exposed in deck text, embedded chart tables, pasted overlay tables, raw XLS summary tables, or directly supplied latest results. When a supplied deck table differs from the raw XLS, the deck table is used and noted in `data.js`. Ambiguous values stay `null`; for example, Q4 2025 Truekind unaided includes exact raw Truekind mentions only because normalized competitor percentages are not exposed in the export.

## Update Workflow

1. Add new quarterly values in `data.js`.
2. Keep the `source` and `confidence` fields up to date.
3. Leave ambiguous values as `null` until an exact source is available.
