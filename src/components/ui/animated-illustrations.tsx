"use client";

import { motion } from "framer-motion";

// Animated book with turning pages
export function AnimatedBook({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Book shadow */}
        <ellipse cx="120" cy="175" rx="80" ry="8" fill="oklch(0.25 0.04 260)" opacity="0.06" />

        {/* Book body */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Spine */}
          <rect x="110" y="50" width="20" height="110" rx="2" fill="oklch(0.25 0.04 260)" opacity="0.9" />

          {/* Left cover */}
          <motion.path
            d="M110 50 L40 55 Q35 55.5 35 60 L35 155 Q35 159.5 40 160 L110 160"
            fill="oklch(0.75 0.12 55)"
            stroke="oklch(0.65 0.12 55)"
            strokeWidth="1"
          />

          {/* Right cover */}
          <motion.path
            d="M130 50 L200 55 Q205 55.5 205 60 L205 155 Q205 159.5 200 160 L130 160"
            fill="oklch(0.78 0.14 75)"
            stroke="oklch(0.68 0.14 75)"
            strokeWidth="1"
          />

          {/* Left pages */}
          <rect x="42" y="58" width="65" height="96" rx="1" fill="oklch(0.985 0.005 80)" />
          <line x1="50" y1="72" x2="98" y2="72" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="50" y1="82" x2="95" y2="82" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="50" y1="92" x2="100" y2="92" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="50" y1="102" x2="90" y2="102" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="50" y1="112" x2="96" y2="112" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="50" y1="122" x2="88" y2="122" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />

          {/* Right pages */}
          <rect x="133" y="58" width="65" height="96" rx="1" fill="oklch(0.985 0.005 80)" />
          <line x1="142" y1="72" x2="190" y2="72" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="142" y1="82" x2="185" y2="82" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="142" y1="92" x2="192" y2="92" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />
          <line x1="142" y1="102" x2="180" y2="102" stroke="oklch(0.85 0.01 80)" strokeWidth="1" />

          {/* Animated turning page */}
          <motion.path
            d="M130 58 Q150 55 165 58 L165 154 Q150 157 130 154 Z"
            fill="oklch(0.98 0.003 80)"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="0.5"
            animate={{
              d: [
                "M130 58 Q150 55 165 58 L165 154 Q150 157 130 154 Z",
                "M130 58 Q120 40 105 58 L105 154 Q120 170 130 154 Z",
                "M130 58 Q150 55 165 58 L165 154 Q150 157 130 154 Z",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
        </motion.g>

        {/* Sparkles */}
        <motion.circle
          cx="190" cy="35"
          r="3"
          fill="oklch(0.78 0.14 75)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="50" cy="40"
          r="2.5"
          fill="oklch(0.75 0.12 55)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
        />
        <motion.circle
          cx="210" cy="70"
          r="2"
          fill="oklch(0.65 0.17 155)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
        />

        {/* Stars */}
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "215px 42px" }}
        >
          <path d="M215 35 l2 4.5 5 0 -3.5 3 1.5 4.5 -5-3 -5 3 1.5-4.5 -3.5-3 5 0z" fill="oklch(0.78 0.14 75)" opacity="0.6" />
        </motion.g>
      </svg>
    </div>
  );
}

// Animated brain / AI thinking
export function AnimatedBrain({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Brain shape */}
          <motion.path
            d="M60 25 C40 20 25 35 28 50 C20 55 22 70 32 75 C30 85 40 95 55 92 C58 98 62 98 65 92 C80 95 90 85 88 75 C98 70 100 55 92 50 C95 35 80 20 60 25Z"
            fill="oklch(0.75 0.12 55)"
            opacity="0.15"
            stroke="oklch(0.75 0.12 55)"
            strokeWidth="1.5"
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Neural connections */}
          <motion.circle cx="48" cy="45" r="3" fill="oklch(0.75 0.12 55)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.circle cx="72" cy="48" r="3" fill="oklch(0.78 0.14 75)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle cx="55" cy="65" r="3" fill="oklch(0.65 0.17 155)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
          <motion.circle cx="68" cy="72" r="2.5" fill="oklch(0.75 0.12 55)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
          />
          <motion.circle cx="42" cy="60" r="2" fill="oklch(0.78 0.14 75)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
          />
          <motion.circle cx="78" cy="62" r="2.5" fill="oklch(0.65 0.17 155)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />

          {/* Connection lines */}
          <motion.line x1="48" y1="45" x2="72" y2="48" stroke="oklch(0.75 0.12 55)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.line x1="48" y1="45" x2="55" y2="65" stroke="oklch(0.75 0.12 55)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.line x1="72" y1="48" x2="68" y2="72" stroke="oklch(0.78 0.14 75)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          />
          <motion.line x1="55" y1="65" x2="68" y2="72" stroke="oklch(0.65 0.17 155)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
          />
          <motion.line x1="42" y1="60" x2="55" y2="65" stroke="oklch(0.75 0.12 55)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.line x1="78" y1="62" x2="72" y2="48" stroke="oklch(0.78 0.14 75)" strokeWidth="0.8"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
        </motion.g>

        {/* Floating sparkles */}
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
        >
          <circle cx="95" cy="25" r="2" fill="oklch(0.78 0.14 75)" />
        </motion.g>
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
        >
          <circle cx="25" cy="30" r="1.5" fill="oklch(0.65 0.17 155)" />
        </motion.g>
      </svg>
    </div>
  );
}

// Animated progress ring
export function AnimatedProgressRing({
  progress,
  size = 120,
  className = "",
}: {
  progress: number;
  size?: number;
  className?: string;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(0.91 0.01 80)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.12 55)" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 75)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
}

// Streak flame animation
export function AnimatedFlame({ streak, className = "" }: { streak: number; className?: string }) {
  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      <motion.svg
        width="32"
        height="40"
        viewBox="0 0 32 40"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.path
          d="M16 2 C16 2 6 14 6 24 C6 30 10 36 16 38 C22 36 26 30 26 24 C26 14 16 2 16 2Z"
          fill="url(#flameGrad)"
          animate={{
            d: [
              "M16 2 C16 2 6 14 6 24 C6 30 10 36 16 38 C22 36 26 30 26 24 C26 14 16 2 16 2Z",
              "M16 4 C16 4 4 15 5 24 C5 31 10 37 16 38 C22 37 27 31 27 24 C28 15 16 4 16 4Z",
              "M16 2 C16 2 6 14 6 24 C6 30 10 36 16 38 C22 36 26 30 26 24 C26 14 16 2 16 2Z",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner flame */}
        <motion.path
          d="M16 14 C16 14 11 20 11 26 C11 30 13 33 16 34 C19 33 21 30 21 26 C21 20 16 14 16 14Z"
          fill="oklch(0.78 0.14 75)"
          opacity="0.8"
          animate={{
            d: [
              "M16 14 C16 14 11 20 11 26 C11 30 13 33 16 34 C19 33 21 30 21 26 C21 20 16 14 16 14Z",
              "M16 16 C16 16 10 21 10 26 C10 31 13 34 16 34 C19 34 22 31 22 26 C22 21 16 16 16 16Z",
              "M16 14 C16 14 11 20 11 26 C11 30 13 33 16 34 C19 33 21 30 21 26 C21 20 16 14 16 14Z",
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="flameGrad" x1="16" y1="2" x2="16" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.78 0.14 75)" />
            <stop offset="50%" stopColor="oklch(0.75 0.12 55)" />
            <stop offset="100%" stopColor="oklch(0.55 0.2 30)" />
          </linearGradient>
        </defs>
      </motion.svg>
      <div>
        <span className="text-2xl font-bold">{streak}</span>
        <p className="text-[10px] text-muted-foreground">dias seguidos</p>
      </div>
    </div>
  );
}
