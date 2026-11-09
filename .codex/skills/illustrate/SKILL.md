---
name: illustrate
description: Create, redraw, or refine editable SVG logos, icons, and vector illustrations, including layered artwork and composed graphics. Render and inspect the result at its intended display sizes.
---

# Illustrate

## Choose the vector format

- **Editable vectors.** Author SVG directly for marks, icons, vector redraws, and layered scenes. Use named groups for independently editable objects or parallax planes. Keep paths simple and avoid embedded bitmap artwork when the requested source is vector.
- **Composed graphics.** Use SVG or HTML/CSS for layouts with text and existing artwork. Keep text editable when the delivery format supports it.

## Work from the brief

Use existing assets and project conventions to infer palette, style, dimensions, and destination. Ask about missing constraints only when the answer would materially change the result. For a redraw, preserve the features that make the reference recognizable and disclose meaningful simplifications. For a new design direction, explore distinct concepts when the user wants to compare options. A faithful redraw or small revision can start with one candidate.

For icons, identify the smallest realistic use size. Add monochrome or alternate-background variants when their use calls for them. For layered art, check the intended crop and leave enough artwork beyond the frame for any layer that moves.

## Render and inspect

Use [the rendering guide](reference/rendering.md) to open the actual output. Inspect icons at the smallest intended size and compare a redraw with its reference on the same sheet. Inspect scenes at the intended aspect ratio and, for a parallax preview, exercise the movement at both limits. When an asset is already integrated, inspect it in the target app if available.

Fix the most consequential visual issue and render again. Deliver editable source and the previews or exports needed for the task. For a study, keep previews and alternatives separate from production assets unless the user requests integration. If rendering is unavailable, say what was checked and identify the unverified visual behavior.

Record the source artwork and how the vector was made using the project's provenance convention. For a redraw, identify the original asset. Record any third-party materials and their terms before delivery for production use.

Adapted for Codex from [Claude Illustrate](https://github.com/code-katz/claude-illustrate-skill). See [LICENSE](LICENSE).
