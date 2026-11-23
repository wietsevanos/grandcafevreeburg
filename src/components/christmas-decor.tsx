/** Herbruikbare, puur decoratieve kerstelementen (SVG, geen afbeeldingen). */

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

type Pt = [number, number];
function bez(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
}

function buildBranch() {
  const r = rand(7);
  const stems: [Pt, Pt, Pt, number][] = [
    [[-10, 18], [170, 30], [360, 120], 3],
    [[60, 22], [110, 70], [130, 150], 2],
    [[150, 40], [230, 60], [270, 175], 2],
    [[20, 20], [60, 50], [40, 105], 1.6],
    [[220, 70], [300, 70], [340, 60], 1.4],
  ];
  const needles: { x1: number; y1: number; x2: number; y2: number; c: number; w: number }[] = [];
  stems.forEach(([a, b, c, w]) => {
    const n = Math.round(48 * w);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const p = bez(a, b, c, t);
      const q = bez(a, b, c, Math.min(1, t + 0.01));
      const ang = Math.atan2(q[1] - p[1], q[0] - p[0]);
      const len = (14 + r() * 10) * (1 - t * 0.45) * (0.8 + w * 0.12);
      for (const side of [-1, 1]) {
        const a2 = ang + side * (0.75 + r() * 0.35);
        needles.push({ x1: p[0], y1: p[1], x2: p[0] + Math.cos(a2) * len, y2: p[1] + Math.sin(a2) * len, c: Math.floor(r() * 3), w: 1.4 + r() * 0.8 });
      }
    }
  });
  return { stems, needles };
}
const BRANCH = buildBranch();
const LIGHTS: Pt[] = [[30, 46], [78, 62], [126, 74], [176, 82], [226, 92], [272, 108], [312, 128], [92, 118], [196, 132], [250, 152], [48, 92]];
const NEEDLE_COLORS = ["var(--pine-dark)", "var(--pine)", "var(--pine-light)"];

/** Dennentak met warmwitte lampjes, bedoeld voor een hoek (linksboven). */
export function PineBranch({ className = "", lights = true, ornaments = true }: { className?: string; lights?: boolean; ornaments?: boolean }) {
  return (
    <svg viewBox="0 0 380 200" className={`pointer-events-none select-none ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="xmas-glow">
          <stop offset="0" stopColor="var(--xmas-light)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--xmas-light)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="xmas-bauble" cx="0.35" cy="0.35">
          <stop offset="0" stopColor="var(--champagne)" />
          <stop offset="1" stopColor="var(--gold)" />
        </radialGradient>
        <radialGradient id="xmas-bauble-red" cx="0.35" cy="0.35">
          <stop offset="0" stopColor="#d9616a" />
          <stop offset="0.55" stopColor="var(--xmas-red)" />
          <stop offset="1" stopColor="#4a0d12" />
        </radialGradient>
      </defs>
      {BRANCH.stems.map(([a, b, c, w], i) => (
        <path key={i} d={`M${a[0]} ${a[1]} Q${b[0]} ${b[1]} ${c[0]} ${c[1]}`} stroke="var(--pine-stem)" strokeWidth={w * 1.4} fill="none" strokeLinecap="round" />
      ))}
      <g strokeLinecap="round">
        {BRANCH.needles.map((n, i) => (
          <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke={NEEDLE_COLORS[n.c]} strokeWidth={n.w} />
        ))}
      </g>
      {lights && (
        <>
          <path d="M0 30 Q 80 80 176 82 T 330 132" stroke="var(--pine-stem)" strokeOpacity="0.6" strokeWidth="0.8" fill="none" />
          {LIGHTS.map(([x, y], i) => (
            <g key={i} className="xmas-twinkle" style={{ animationDelay: `${(i * 0.73) % 4}s` }}>
              <circle cx={x} cy={y} r="9" fill="url(#xmas-glow)" />
              <circle cx={x} cy={y} r="2.2" fill="var(--xmas-light)" />
            </g>
          ))}
        </>
      )}
      {ornaments && (
        <>
          <line x1="150" y1="50" x2="150" y2="96" stroke="var(--gold)" strokeWidth="0.8" />
          <circle cx="150" cy="104" r="8" fill="url(#xmas-bauble)" />
          <line x1="232" y1="80" x2="232" y2="150" stroke="var(--gold)" strokeWidth="0.8" />
          <circle cx="232" cy="160" r="10" fill="url(#xmas-bauble-red)" />
          <circle cx="229" cy="156" r="2.5" fill="#fff" opacity="0.35" />
          <line x1="70" y1="40" x2="70" y2="128" stroke="var(--gold)" strokeWidth="0.8" />
          <circle cx="70" cy="136" r="7" fill="url(#xmas-bauble-red)" />
          <line x1="320" y1="110" x2="320" y2="150" stroke="var(--gold)" strokeWidth="0.8" />
          <circle cx="320" cy="157" r="6.5" fill="url(#xmas-bauble)" />
          <GoldStar x={292} y={86} s={9} />
        </>
      )}
    </svg>
  );
}

function GoldStar({ x, y, s }: { x: number; y: number; s: number }) {
  const k = s * 0.22;
  return (
    <path
      className="xmas-sparkle"
      d={`M${x} ${y - s} L${x + k} ${y - k} L${x + s} ${y} L${x + k} ${y + k} L${x} ${y + s} L${x - k} ${y + k} L${x - s} ${y} L${x - k} ${y - k}Z`}
      fill="var(--gold)"
    />
  );
}

/** Kleine gouden kerstster. */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <GoldStar x={12} y={12} s={11} />
    </svg>
  );
}

/** Ornament: dunne gouden lijn met sterretje in het midden. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/70" />
      <Star className="h-3 w-3 xmas-sparkle-el" />
      <span className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

/** Hangende lichtjesslinger over de volle breedte. */
export function LightString({ className = "", count = 18 }: { className?: string; count?: number }) {
  const pts = Array.from({ length: count }, (_, i) => {
    const x = (i + 0.5) * (1000 / count);
    const phase = ((i + 0.5) / count) * Math.PI * 4;
    return [x, 10 + Math.abs(Math.sin(phase)) * 16] as Pt;
  });
  return (
    <svg viewBox="0 0 1000 44" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <path d="M0 8 Q125 40 250 8 T500 8 T750 8 T1000 8" stroke="var(--pine-stem)" strokeOpacity="0.45" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      {pts.map(([x, y], i) => (
        <g key={i} className="xmas-twinkle" style={{ animationDelay: `${(i * 0.61) % 4}s` }}>
          <ellipse cx={x} cy={y} rx="7" ry="9" fill="var(--xmas-light)" opacity="0.25" />
          <ellipse cx={x} cy={y} rx="1.6" ry="2.2" fill="var(--xmas-light)" />
        </g>
      ))}
    </svg>
  );
}

/** Losse hangende kerstballen (goud en rood) aan dunne gouden draadjes. */
export function HangingBaubles({ className = "", items }: { className?: string; items: { x: number; len: number; r: number; red?: boolean }[] }) {
  return (
    <svg viewBox="0 0 100 220" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hb-gold" cx="0.35" cy="0.35"><stop offset="0" stopColor="var(--champagne)" /><stop offset="1" stopColor="var(--gold)" /></radialGradient>
        <radialGradient id="hb-red" cx="0.35" cy="0.35"><stop offset="0" stopColor="#d9616a" /><stop offset="0.55" stopColor="var(--xmas-red)" /><stop offset="1" stopColor="#4a0d12" /></radialGradient>
      </defs>
      {items.map((b, i) => (
        <g key={i} className="xmas-sway" style={{ animationDelay: `${i * 0.9}s`, transformOrigin: `${b.x}px 0px` }}>
          <line x1={b.x} y1="0" x2={b.x} y2={b.len} stroke="var(--gold)" strokeWidth="0.6" />
          <rect x={b.x - 2} y={b.len - 1} width="4" height="3" rx="0.8" fill="var(--gold)" />
          <circle cx={b.x} cy={b.len + b.r + 1} r={b.r} fill={b.red ? "url(#hb-red)" : "url(#hb-gold)"} />
          <circle cx={b.x - b.r * 0.35} cy={b.len + b.r * 0.6} r={b.r * 0.25} fill="#fff" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
