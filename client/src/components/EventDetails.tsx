import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Users } from "lucide-react";

export function EventDetails() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 px-6 bg-background"
      data-testid="section-event-details"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Détails de l'Événement
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Toutes les informations pour notre journée spéciale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="flex gap-4" data-testid="detail-date">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold text-foreground mb-1">
                  Date et Heure
                </h3>
                <p className="font-sans text-base text-muted-foreground">
                  29 Décembre 2025
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Les détails horaires vous seront communiqués
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="detail-location">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold text-foreground mb-1">
                  Lieu de Réception
                </h3>
                <p className="font-sans text-base text-foreground font-medium">
                  Salle des fêtes EL MOUDAYNA
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  TICHY, Algérie
                </p>
              </div>
            </div>

            <div className="flex gap-4" data-testid="detail-dress-code">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-semibold text-foreground mb-1">
                  Tenue
                </h3>
                <p className="font-sans text-base text-muted-foreground">
                  Tenue de soirée élégante
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3216.4!2d5.0!3d36.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM2JzAwLjAiTiA1wrAwMCcwMC4wIkU!5e0!3m2!1sfr!2sdz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte de localisation - Salle des fêtes EL MOUDAYNA, TICHY"
                data-testid="map-location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
