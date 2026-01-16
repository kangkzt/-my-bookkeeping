
# Add Transaction Page Fixes

## Context
User reported significant layout issues on the Add Transaction page:
1. Top Tabs are squished.
2. Camera/Voice buttons are distorted and huge.
3. Default date is off by 8 hours (UTC vs Local).
4. Keyboard Right Sidebar layout is incorrect (Collapse button needs moving, alignment is off).

## Objectives
1. **Fix Date Initialization**: Use local time instead of UTC.
2. **Fix Top Layout**: CSS adjustments to prevent squishing and distortion.
3. **Refactor Keyboard**:
   - Move `Collapse` button to Quick Tags row.
   - Update `Action Sidebar` to only have `Minus`, `Plus`, `OK` with `1:1:2` flux ratio.
4. **Visual Polish**: Ensure alignment matches the reference grid.

## Implementation Steps
1. **Modify `src/pages/AddTransaction.jsx`**:
   - Update `useState(date)` initialization logic.
   - Move `Collapse` button JSX to `quick-tags` container.
   - Remove `Collapse` button from `action-sidebar`.
2. **Modify `src/pages/AddTransaction.css`**:
   - Fix `.camera-btn` to have fixed dimensions or max-width.
   - Update `.action-btn` flex properties to ensure `OK` takes 2x height.
   - Polish `.quick-tags` to accommodate the new Collapse button (flex layout).
