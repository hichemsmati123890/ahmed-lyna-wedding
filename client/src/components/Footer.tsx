import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-accent/30" data-testid="section-footer">
      <div className="max-w-6xl mx-auto">
        <div className="w-32 h-px bg-border mx-auto mb-8 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-serif text-2xl md:text-3xl text-foreground">
              Ahmed & Lyna
            </span>
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </div>

          <p className="font-sans text-base text-muted-foreground mb-2" data-testid="text-footer-date">
            29.12.2025
          </p>

          <p className="font-sans text-sm text-muted-foreground">
            Salle des fêtes EL MOUDAYNA, TICHY
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="font-sans text-xs text-muted-foreground">
            © 2025 - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
