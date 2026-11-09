# Rendering SVG in Codex

Use an available SVG renderer, such as `rsvg-convert`, Inkscape, or Chromium. For a scene, render at its target aspect ratio. For an icon contact sheet, inline each SVG in an HTML wrapper and set its CSS width and height to the intended pixel size. Keep the original viewBox. A screenshot of the bare SVG can crop an explicitly sized image. Put concepts or references side by side at matching sizes and include the backgrounds they will appear on.

## Find Chromium

Check PATH for `chromium`, `chromium-browser`, or `google-chrome`. Playwright may provide an executable even when PATH does not. Check `PLAYWRIGHT_BROWSERS_PATH` if set. Common cache directories are `~/Library/Caches/ms-playwright` on macOS and `~/.cache/ms-playwright` on Linux. Managed Linux installations may use `/opt/pw-browsers`. Look for `chrome-headless-shell`, `chrome`, or a Chromium app bundle executable.

With `chrome` set to the executable and the working directory containing `sheet.html`:

```sh
profile=$(mktemp -d)
"$chrome" --headless --hide-scrollbars --user-data-dir="$profile" \
  --virtual-time-budget=2000 --window-size=1200,900 \
  --screenshot="$PWD/sheet.png" "file://$PWD/sheet.html"
```

Adjust the window to fit the entire sheet. Open the PNG and check that the content rendered and the edges are visible. If the macOS workspace sandbox blocks Mach port registration, try another available renderer or request narrowly scoped approval for the local render. The browser's own sandbox can stay enabled.

For a standalone SVG without an HTML wrapper, `rsvg-convert -w 128 -h 128 icon.svg -o icon-128.png` is an example for a square icon. Check that the output exists before reporting a render.
