---
description: Convert SVGs in assets/svgs into React Native Icon components and register them in the Icon list
allowed-tools: Bash(node scripts/generate-svg.js)
---

# Generate SVG Icons

Generate React Native icon components from SVG files and register them in the `Icon` component (`components/shared/ui/Icon`).

## When to use
- After adding one or more `.svg` files to `assets/svgs/`.
- When the user asks to add, create, or generate an icon.

## Steps
1. Make sure the new SVG files are in `assets/svgs/` with unique, kebab-case filenames (e.g. `my-icon.svg`). Create the folder if it does not exist yet — the script reads it directly.
2. From the project root, run:
   ```bash
   node scripts/generate-svg.js
   ```
3. Verify the generated `.tsx` components in `assets/icons/` and that `components/shared/ui/Icon/list.ts` now includes the new entries.

## Notes
- Overwrites existing icon components and updates `iconsList`.
- Generated components type their props with `IconProps` from `@/components/shared/ui/Icon/types`.
- Original SVGs are kept (the `unlinkSync` line is commented out in the script).
- Always render icons through `@/components/shared/ui/Icon` — see the `icon-usage` rule.
