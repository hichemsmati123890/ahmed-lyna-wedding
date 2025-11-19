import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import couplePortrait1 from "@assets/generated_images/Couple_portrait_1_01102254.png";
import coupleWalking from "@assets/generated_images/Couple_walking_together_b57ebeb2.png";
import coupleCloseup from "@assets/generated_images/Couple_close-up_portrait_c5e22bc8.png";
import coupleDancing from "@assets/generated_images/Couple_dancing_5d03bdcb.png";
import coupleLaughing from "@assets/generated_images/Couple_laughing_candid_5391497d.png";
import coupleSilhouette from "@assets/generated_images/Couple_sunset_silhouette_d89b1033.png";
import coupleBouquet from "@assets/generated_images/Couple_with_bouquet_f01772ec.png";

const photos = [
  { src: couplePortrait1, alt: "Ahmed et Lyna - Portrait 1" },
  { src: coupleWalking, alt: "Ahmed et Lyna marchant ensemble" },
  { src: coupleCloseup, alt: "Ahmed et Lyna - Portrait rapproché" },
  { src: coupleDancing, alt: "Ahmed et Lyna dansant" },
  { src: coupleLaughing, alt: "Ahmed et Lyna riant ensemble" },
  { src: coupleSilhouette, alt: "Ahmed et Lyna au coucher du soleil" },
  { src: coupleBouquet, alt: "Ahmed et Lyna avec bouquet" },
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
