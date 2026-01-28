'use client';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

export default function TiltCard({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
