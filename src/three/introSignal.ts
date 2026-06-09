/**
 * Intro "enter the grid" progress, shared with the R3F render loop (same
 * pattern as scrollSignal). 0 = camera held far/high (pre-entry), 1 = settled
 * normal pose. Defaults to 1 so a skipped/reduced-motion intro looks correct.
 */
export const introSignal = { enter: 1 };
