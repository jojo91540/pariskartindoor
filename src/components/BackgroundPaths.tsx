import { motion } from 'framer-motion';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${
      380 - i * 10 * position
    } -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${
      152 - i * 10 * position
    } ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${
      684 - i * 10 * position
    } ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#gradient)"
            strokeWidth={path.width}
            strokeOpacity={0.4 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.8 }}
            animate={{
              pathLength: 1,
              opacity: [0.6, 1, 0.6],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0842a5" />
            <stop offset="25%" stopColor="#0842a5" />
            <stop offset="50%" stopColor="#0842a5" />
            <stop offset="75%" stopColor="#a00b0b" />
            <stop offset="100%" stopColor="#a00b0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function BackgroundPaths() {
  return (
    <div className="absolute inset-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
