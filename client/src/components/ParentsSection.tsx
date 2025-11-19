import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

export function ParentsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 lg:py-32 px-6 bg-background"
      data-testid="section-parents"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4" data-testid="text-parents-heading">
            Notre Histoire
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous avons le plaisir de vous inviter à célébrer notre union
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
            data-testid="card-groom"
          >
            <div className="mb-6 inline-block">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/20">
                <span className="font-serif text-6xl text-primary">A</span>
              </div>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground">Ahmed</h3>
          </motion.div>

          <div className="hidden md:flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
            data-testid="card-bride"
          >
            <div className="mb-6 inline-block">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/20">
                <span className="font-serif text-6xl text-primary">L</span>
              </div>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground">Lyna</h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="md:hidden flex justify-center mt-8"
        >
          <div className="bg-primary/10 p-4 rounded-full">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
