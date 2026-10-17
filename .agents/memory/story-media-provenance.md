---
name: Story media provenance
description: Story-page presentation and verified, honestly labelled Kirukans media.
---

Verify videos against the trust's actual official YouTube handle before embedding them in project stories.

**Why:** Name-based search returned a different channel from the one reached through the user's supplied handle. Search matches alone were not reliable evidence of ownership or project relevance.

**How to apply:** Confirm the video's author matches the official channel and that its description identifies the relevant project. A working video ID alone is not enough.

For YouTube story videos, use only the thumbnail supplied for that video ID; never choose a project photo as the video preview.

**Why:** The user asked that story videos display the YouTube thumbnail only, not an image selected by the site editor.

**How to apply:** Derive YouTube previews from the video ID. Keep separate thumbnail handling only for non-YouTube platforms where needed.

Clearly label related films when no matching project film is available.

**Why:** A Kirukans creative workshop in Chennai is relevant to its work, but it is not footage of the Anganvadi School project in Thalakudi.

**How to apply:** Keep that distinction visible in the video heading and caption; do not imply another location's film documents the current project.

Project write-ups belong on separate story pages, not story-text pop-ups.

**Why:** The user asked to replace the “Read the story” popup with a separate page containing more content, media and YouTube video.

**How to apply:** Keep reading navigation page-based. Image enlargement can remain a photo-only viewer; it must not replace the story page.

Video thumbnails should show only the play control, with no added title text over the image.

**Why:** The user asked for just the play button on all video thumbnails.

**How to apply:** Keep video names in accessible control labels and iframe titles, and retain captions outside the thumbnail. Text baked into the original YouTube artwork is separate from website-added overlays.

Show the month and year on stories, not a story number.

**Why:** The user said “dont show story number just the month and year is super enough.”

**How to apply:** Preserve the date display without numbered story labels, including card fallback states.

Use project photographs and light-neutral backgrounds with dark text for “More stories” cards, not fully coloured panels.

**Why:** The user asked to add pictures and said the bright card colours were reducing readability.

**How to apply:** Keep related-story titles, dates and reading links on a restrained, readable surface; use each project's real photo above the text.

The header's “Impact stories” menu item should open the full “The whole collection” archive, not scroll to the homepage stories section.

**Why:** The user explicitly asked for this menu destination.

**How to apply:** Keep the desktop and mobile menu destinations consistent; homepage teaser CTAs can still link to the homepage section.

For submitted video screenshots, visibly lift dark shadows across every image while preserving the original framing and documentary content. Do not treat a barely noticeable adjustment as a completed enhancement.

**Why:** The user clarified that every Diwali screenshot needs a noticeable enhancement. Generative enhancement can also recompose screenshots or add padding, so non-generative correction preserves the actual scene.

**How to apply:** Keep originals untouched, test and visually verify tonal changes on a sample before batch-processing, export at the source aspect ratio, and inspect a contact sheet and page preview. Use new asset filenames when replacing processed images to avoid stale browser caches.

For ImageMagick shadow lifts, verify the transform on a side-by-side sample rather than inferring the direction from the gamma value.

**Why:** On a submitted mural screenshot, a lower gamma setting darkened the RGB image; a `1.3` gamma with a small brightness lift produced the intended visible shadow recovery.

**How to apply:** Check both the rendered comparison and RGB channel values on one representative frame before processing the rest.
