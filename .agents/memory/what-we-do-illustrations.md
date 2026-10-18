---
name: What we do illustrations
description: User's visual direction for the Create, Connect and Contribute section.
---

Use the supplied hand-drawn black-and-white illustrations for Create, Connect and Contribute. Keep the section readable and avoid fully coloured panels.

**Why:** The user supplied SVG artwork and said the previous “What we do” section was too colourful and looked bad.

**How to apply:** Keep the illustrations prominent, copy clearly readable, and the surrounding treatment restrained. This direction is specific to “What we do”; do not remove the dark hero or the site's other approved brand colours.

Place “What we do” directly after the homepage's “Fresh off the wall” stories section.

**Why:** The user explicitly asked to move this section below “Fresh off the wall.”

**How to apply:** Preserve this user-chosen order when updating the homepage unless they request another change.

For mobile, keep the cards in an explicit single-column grid and constrain their minimum width; only enable image zoom/lift on devices with a fine pointer that supports hover.

**Why:** The user reported the section expanding while scrolling on mobile, while desktop remained unaffected.

**How to apply:** Use `grid-cols-1` and `min-w-0` on the grid items/cards, and keep hover transforms inside a `(hover: hover) and (pointer: fine)` media query. Keep keyboard focus visible without applying touch-scale effects.
