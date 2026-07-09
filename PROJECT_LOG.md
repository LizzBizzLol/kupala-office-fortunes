# Project Log

## Context

- Goal: static pixel-art site for office Kupala fortune predictions, intended for colleagues and GitHub Pages.
- Current format: plain HTML, CSS, and JavaScript; no build step, server, database, registration, or personal data.
- Main flow: user opens the page, presses the start button, receives a random office prediction on a class-specific scroll, and can request another prediction.
- Data: final set contains 90 predictions with 71 common, 15 rare, and 4 legendary entries.
- Tone: 60 kind predictions and 30 playful-negative predictions; tone is stored in data but hidden in the UI.
- Selection rule: choose uniformly from all 90 predictions and avoid showing the same prediction twice in a row.
- Related folder: `happy-b-day/` is a separate nested site for Savely and must not be changed as part of this project.

## 2026-07-10

- Moved the final prediction dataset into `predictions.js`.
- Updated the fortune logic to use the external dataset, uniform random selection, and class-specific scroll assets.
- Added a separate repeat button below the result scroll.
- Updated documentation for the 60-prediction dataset and current class distribution.
- Replaced prediction texts with the updated Russian 60-prediction dataset from Downloads.
- Tuned the layout for Full HD TV display: centered the start window, added focused result mode, enlarged scrolls, shortened rarity tags, added text fitting for long predictions, and reworked the CSS campfire grass.
- Added the calendar as the first screen using `assets/calendar.png`, with one-page navigation between calendar and predictions.
- Narrowed and spaced the bonus block on scrolls, with a subtle pulsing effect for legendary bonuses.
- Expanded the dataset to 90 predictions from `купальские_офисные_предсказания_90.json`, preserving the first 60 entries and keeping uniform selection.
- Increased spacing between rarity label, prediction text, and bonus block; enlarged common/rare prediction text while keeping legendary scrolls compact.
