import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackground from "@assets/generated_images/Wedding_venue_hero_background_c5bc9eaf.png";

interface HeroSectionProps {
  onRsvpClick: () => void;
}

export function HeroSection({ onRsvpClick }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/50 via-rose-900/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-rose-950/20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="mx-auto text-white"
          >
            <path
              d="M30 8C30 8 12 15 12 30C12 41 19 49 30 53C41 49 48 41 48 30C48 15 30 8 30 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-6"
          data-testid="text-hero-names"
        >
          Ahmed & Lyna
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-32 h-px bg-white/60 mx-auto mb-8 relative"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-sans text-xl md:text-2xl text-white/90 mb-3 tracking-wide"
          data-testid="text-hero-date"
        >
          29 Décembre 2025
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="font-sans text-base md:text-lg text-white/80 mb-12"
          data-testid="text-hero-venue"
        >
          Salle des fêtes EL MOUDAYNA, TICHY
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Button
            onClick={onRsvpClick}
            size="lg"
            className="rounded-full px-12 py-6 text-base md:text-lg font-medium bg-white/20 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300"
            data-testid="button-hero-rsvp"
          >
            Confirmer votre présence
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
