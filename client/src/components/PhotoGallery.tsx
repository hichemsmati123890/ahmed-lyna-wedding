import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import venueArch from "@assets/IMG-20240917-WA0002-768x1024_1763586752561.jpg";
import venueHall1 from "@assets/IMG-20240917-WA0006_1763586752562.jpg";
import venueHall2 from "@assets/IMG-20240917-WA0008_1763586752562.jpg";
import venueCake from "@assets/IMG-20240917-WA0010_1763586752563.jpg";
import venueTables from "@assets/IMG-20240917-WA0014-1024x682_1763586752563.jpg";

const photos = [
  { src: venueArch, alt: "Arche florale avec tapis rouge - Salle EL MOUDAYNA" },
  { src: venueHall1, alt: "Salle des fêtes décorée - EL MOUDAYNA TICHY" },
  { src: venueHall2, alt: "Vue de la salle avec lustres et décorations" },
  { src: venueCake, alt: "Gâteau de mariage et décoration de la salle" },
  { src: venueTables, alt: "Tables élégamment décorées pour la réception" },
];

export function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 px-6 bg-accent/30"
      data-testid="section-gallery"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Notre Galerie
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Quelques moments précieux de notre histoire
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => setSelectedPhoto(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedPhoto(index);
                }
              }}
              role="button"
              tabIndex={0}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => {
          if (!open) setSelectedPhoto(null);
        }}
      >
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0" data-testid="dialog-lightbox">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedPhoto !== null && (
            <img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              data-testid="lightbox-image"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
