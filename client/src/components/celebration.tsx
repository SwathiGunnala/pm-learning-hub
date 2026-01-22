import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

const colors = [
  "#FFD700", // Gold
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
];

function Confetti({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3"
          style={{
            left: `${piece.x}%`,
            top: -20,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export function useCelebration() {
  const [show, setShow] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const celebrate = () => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 720 - 360,
      });
    }
    setPieces(newPieces);
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  };

  const CelebrationComponent = () => (
    <AnimatePresence>
      {show && <Confetti pieces={pieces} />}
    </AnimatePresence>
  );

  return { celebrate, CelebrationComponent };
}

const encouragingMessages = [
  "Amazing work! You're building real PM skills.",
  "Fantastic! Every lesson brings you closer to mastery.",
  "Great progress! Your product sense is growing.",
  "Excellent! You're thinking like a seasoned PM.",
  "Brilliant! Keep that momentum going.",
  "Outstanding! You're on the path to PM excellence.",
  "Superb! Your dedication is paying off.",
  "Wonderful! Another step toward product leadership.",
];

export function getEncouragingMessage(): string {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
}

export function XPBurst({ amount }: { amount: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex items-center gap-1 text-2xl font-bold text-purple-500"
    >
      <motion.span
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        +{amount} XP
      </motion.span>
    </motion.div>
  );
}

export function StreakFlame({ days }: { days: number }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1.1, 1] }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-orange-500"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.8 1.6-5.3 4-6.5-.2 1.1.3 2.3 1.2 3 .3.2.6.2.8 0 .2-.2.2-.5.1-.8-.7-1.1-.7-2.5 0-3.6.8-1.1 2.1-1.8 3.5-1.8 1.3 0 2.6.6 3.4 1.6.9 1.1 1.1 2.6.5 3.9-.1.3 0 .6.2.8.2.2.5.2.8 0 .9-.7 1.4-1.9 1.2-3 2.4 1.2 4 3.7 4 6.5-.1 3.8-3.2 6.9-7 6.9z"/>
        </svg>
      </motion.div>
      <div>
        <p className="text-2xl font-bold text-orange-500">{days || "Begin"}</p>
        <p className="text-xs text-muted-foreground">{days ? "day streak" : "your streak"}</p>
      </div>
    </motion.div>
  );
}
