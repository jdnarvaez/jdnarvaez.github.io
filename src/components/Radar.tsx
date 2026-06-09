import { CornerBrackets } from './hud/CornerBrackets';
import type { Section } from './hud/StatusBar';

type Props = {
  sections: Section[];
  active: string;
  progress: number;
  onJump: (id: string) => void;
};

const CX = 50;
const CY = 50;
const RING = 35; // blip ring radius
// blip angles, 0deg = up (12 o'clock), clockwise
const ANGLES = [0, 120, 240];

const sep = { stroke: 'var(--separator)' } as const;
const bord = { stroke: 'var(--border)' } as const;

/**
 * Mini HUD radar (desktop): rotating sweep, a blip per section (active one
 * glows), and the scroll percentage at center. Blips jump to their section.
 */
export function Radar({ sections, active, progress, onJump }: Props) {
  const pct = Math.round(progress * 100);

  return (
    <div className="pointer-events-auto fixed bottom-5 right-5 z-40 hidden lg:block">
      <div className="hud-panel relative size-[112px] p-2">
        <CornerBrackets
          size={10}
          inset={-1}
          color="color-mix(in oklab, var(--accent) 60%, transparent)"
        />
        <div className="absolute left-2 top-1.5 hud-label text-[7px]">RADAR</div>

        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          {/* rings */}
          <g fill="none" strokeWidth={1}>
            <circle cx={CX} cy={CY} r={46} style={sep} />
            <circle cx={CX} cy={CY} r={RING} style={bord} />
            <circle cx={CX} cy={CY} r={16} style={bord} />
          </g>

          {/* edge ticks */}
          <g strokeWidth={1} style={sep}>
            <line x1={50} y1={2} x2={50} y2={10} />
            <line x1={50} y1={90} x2={50} y2={98} />
            <line x1={2} y1={50} x2={10} y2={50} />
            <line x1={90} y1={50} x2={98} y2={50} />
          </g>

          {/* rotating sweep */}
          <g className="radar-sweep">
            <defs>
              <linearGradient id="radar-sweep-grad" x1="0" y1="0" x2="1" y2="1">
                <stop
                  offset="0"
                  style={{
                    stopColor: 'color-mix(in oklab, var(--accent) 55%, transparent)',
                  }}
                />
                <stop offset="1" style={{ stopColor: 'transparent' }} />
              </linearGradient>
            </defs>
            <path
              d="M50 50 L50 4 A46 46 0 0 1 82 18 Z"
              fill="url(#radar-sweep-grad)"
            />
            <line
              x1={50}
              y1={50}
              x2={50}
              y2={4}
              strokeWidth={1.2}
              style={{ stroke: 'var(--accent)' }}
            />
          </g>

          {/* section blips */}
          {sections.map((s, i) => {
            const a = ((ANGLES[i] ?? 0) * Math.PI) / 180;
            const bx = CX + RING * Math.sin(a);
            const by = CY - RING * Math.cos(a);
            const isActive = active === s.id;
            return (
              <g
                key={s.id}
                onClick={() => onJump(s.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* generous hit area */}
                <circle cx={bx} cy={by} r={9} fill="transparent" />
                {isActive && (
                  <circle
                    cx={bx}
                    cy={by}
                    r={6.5}
                    fill="none"
                    strokeWidth={1}
                    style={{ stroke: 'var(--accent)', opacity: 0.5 }}
                  />
                )}
                <circle
                  cx={bx}
                  cy={by}
                  r={isActive ? 3.6 : 2.4}
                  style={{
                    fill: isActive ? 'var(--accent)' : 'var(--muted)',
                  }}
                />
              </g>
            );
          })}

          {/* center scroll readout */}
          <text
            x={50}
            y={51}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fill: 'var(--foreground)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {pct}
          </text>
        </svg>
      </div>
    </div>
  );
}
