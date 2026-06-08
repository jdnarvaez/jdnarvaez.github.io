import type { CSSProperties } from 'react';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

type Props = {
  size?: number;
  thickness?: number;
  inset?: number;
  color?: string;
  corners?: Corner[];
  className?: string;
};

/**
 * Four L-shaped corner marks — the recurring "targeting frame" motif from the
 * HUD reference kit. Rendered as absolutely-positioned, non-interactive spans;
 * the parent must be `position: relative`.
 */
export function CornerBrackets({
  size = 13,
  thickness = 1,
  inset = 0,
  color = 'var(--accent)',
  corners = ['tl', 'tr', 'bl', 'br'],
  className,
}: Props) {
  const base = (corner: Corner): CSSProperties => {
    const s: CSSProperties = {
      position: 'absolute',
      width: size,
      height: size,
      borderStyle: 'solid',
      borderColor: color,
      borderWidth: 0,
      pointerEvents: 'none',
    };
    if (corner === 'tl') {
      s.top = inset;
      s.left = inset;
      s.borderTopWidth = thickness;
      s.borderLeftWidth = thickness;
    } else if (corner === 'tr') {
      s.top = inset;
      s.right = inset;
      s.borderTopWidth = thickness;
      s.borderRightWidth = thickness;
    } else if (corner === 'bl') {
      s.bottom = inset;
      s.left = inset;
      s.borderBottomWidth = thickness;
      s.borderLeftWidth = thickness;
    } else {
      s.bottom = inset;
      s.right = inset;
      s.borderBottomWidth = thickness;
      s.borderRightWidth = thickness;
    }
    return s;
  };

  return (
    <span className={className} aria-hidden="true">
      {corners.map((c) => (
        <span key={c} style={base(c)} />
      ))}
    </span>
  );
}
