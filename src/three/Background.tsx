import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { CityScene } from './CityScene';

type Theme = 'light' | 'dark';
type Props = { reducedMotion?: boolean; theme?: Theme };

function webglSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/** Static CSS approximation of the dot-city for no-WebGL environments. */
function CityFallback({ theme }: { theme: Theme }) {
  const light = theme === 'light';
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: light
            ? 'radial-gradient(55% 38% at 50% 80%, color-mix(in oklab, #b3551c 16%, transparent), transparent 70%), #efe9de'
            : 'radial-gradient(55% 38% at 50% 80%, color-mix(in oklab, #ff6a1a 22%, transparent), transparent 70%), radial-gradient(120% 70% at 50% 120%, color-mix(in oklab, #ff6a1a 26%, transparent), transparent 60%), #0a0908',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          backgroundImage: light
            ? 'radial-gradient(color-mix(in oklab, #3c372f 45%, transparent) 1px, transparent 1.4px)'
            : 'radial-gradient(color-mix(in oklab, #ff6a1a 60%, transparent) 1px, transparent 1.4px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to top, #000 0%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 85%)',
          opacity: light ? 0.4 : 0.5,
        }}
      />
    </div>
  );
}

/**
 * Fixed, full-viewport 3D backdrop. Non-interactive (pointer-events none) so
 * the HTML overlay above it stays fully scrollable/selectable. Recolors per
 * theme (neon night vs. blueprint day) and falls back to CSS without WebGL.
 */
export function Background({ reducedMotion = false, theme = 'dark' }: Props) {
  const [hasWebgl] = useState(webglSupported);
  const light = theme === 'light';
  const bg = light ? '#efe9de' : '#0a0908';

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {hasWebgl ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ fov: 52, near: 0.1, far: 220, position: [0, 13, 44] }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          frameloop="always"
        >
          <color attach="background" args={[bg]} />
          <Suspense fallback={null}>
            <CityScene reducedMotion={reducedMotion} theme={theme} />
            {!light && (
              <EffectComposer>
                <Bloom
                  mipmapBlur
                  luminanceThreshold={0.15}
                  luminanceSmoothing={0.5}
                  intensity={0.9}
                  radius={0.72}
                />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      ) : (
        <CityFallback theme={theme} />
      )}
    </div>
  );
}
