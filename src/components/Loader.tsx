/**
 * Suspense fallback shown only while the app chunk loads. Kept minimal (themed
 * background + brand mark) so the animated boot lives in IntroSequence.
 */
export default function Loader() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-[var(--background)]">
      <span
        className="size-3 bg-[var(--accent)]"
        style={{
          clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
          boxShadow: '0 0 12px var(--accent)',
          animation: 'bootpulse 1.2s ease-in-out infinite',
        }}
      />
      <style>{`@keyframes bootpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}`}</style>
    </div>
  );
}
