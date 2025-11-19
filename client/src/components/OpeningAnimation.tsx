import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OpeningAnimationProps {
  onComplete: () => void;
}

export function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const hasSeenAnimation = sessionStorage.getItem("wedding-animation-seen");
  const [isVisible, setIsVisible] = useState(!hasSeenAnimation);

  useEffect(() => {
    if (hasSeenAnimation) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
      sessionStorage.setItem("wedding-animation-seen", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasSeenAnimation, onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
    sessionStorage.setItem("wedding-animation-seen", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          data-testid="opening-animation"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            data-testid="button-skip-animation"
          >
            <X className="w-5 h-5" />
          </Button>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-center px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="mx-auto text-primary"
              >
                <path
                  d="M40 10C40 10 15 20 15 40C15 55 25 65 40 70C55 65 65 55 65 40C65 20 40 10 40 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="40" cy="40" r="3" fill="currentColor" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl text-foreground mb-4"
              data-testid="text-opening-names"
            >
              Ahmed & Lyna
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="w-24 h-px bg-primary mx-auto mb-4"
            />

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="font-sans text-lg md:text-xl text-muted-foreground"
              data-testid="text-opening-date"
            >
              29 Décembre 2025
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
