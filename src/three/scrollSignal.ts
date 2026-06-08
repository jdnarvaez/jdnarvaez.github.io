/**
 * A tiny module-level signal shared between the DOM scroll listener and the
 * R3F render loop. The Canvas runs in a separate reconciler, so instead of
 * bridging React context we just read/write this mutable object from both
 * sides. `progress` is 0..1 over the whole document; `velocity` is a transient
 * scroll-speed estimate the scene can use for parallax/jitter.
 */
export const scrollSignal = {
  /** 0 at top of document, 1 at the bottom. */
  progress: 0,
  /** Smoothed scroll velocity (px/frame-ish), decays toward 0. */
  velocity: 0,
};

/**
 * Normalized pointer position for camera parallax, -1..1 on each axis with 0 at
 * the viewport center. Updated by a window pointermove listener in App.
 */
export const pointerSignal = { x: 0, y: 0 };
