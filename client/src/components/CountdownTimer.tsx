import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";

export function CountdownTimer() {
  const weddingDate = new Date("2025-12-29T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "JOURS", value: timeLeft.days, testId: "countdown-days" },
    { label: "HEURES", value: timeLeft.hours, testId: "countdown-hours" },
    { label: "MINUTES", value: timeLeft.minutes, testId: "countdown-minutes" },
    { label: "SECONDES", value: timeLeft.seconds, testId: "countdown-seconds" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 px-6 bg-gradient-to-br from-accent/20 via-background to-accent/30"
      data-testid="section-countdown"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Compte à Rebours
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Plus que quelques instants avant notre grand jour
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6 md:p-8 text-center hover-elevate shadow-md border-2" data-testid={unit.testId}>
                <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-3">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="font-sans text-xs md:text-sm tracking-widest text-muted-foreground uppercase">
                  {unit.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
