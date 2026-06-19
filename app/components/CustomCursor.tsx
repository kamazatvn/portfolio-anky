"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label';

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [hovered,  setHovered]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [isPointer, setIsPointer] = useState(true);

  // Spring damping gives the slight lag that makes custom cursors feel premium
  const x = useSpring(rawX, { damping: 30, stiffness: 400, mass: 0.35 });
  const y = useSpring(rawY, { damping: 30, stiffness: 400, mass: 0.35 });

  useEffect(() => {
    setIsPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      setHovered(!!(e.target as HTMLElement).closest(INTERACTIVE));
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY]);

  if (!isPointer) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? "#912F40" : "transparent",
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "1.5px solid #912F40",
          marginLeft: -9,
          marginTop: -9,
        }}
      />
    </motion.div>
  );
}
