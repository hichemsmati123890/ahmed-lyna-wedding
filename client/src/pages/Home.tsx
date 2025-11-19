import { useState, useRef } from "react";
import { OpeningAnimation } from "@/components/OpeningAnimation";
import { HeroSection } from "@/components/HeroSection";
import { ParentsSection } from "@/components/ParentsSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventDetails } from "@/components/EventDetails";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RsvpForm } from "@/components/RsvpForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const hasSeenAnimation = sessionStorage.getItem("wedding-animation-seen");
  const [animationComplete, setAnimationComplete] = useState(!!hasSeenAnimation);
  const rsvpRef = useRef<HTMLDivElement>(null);

  const scrollToRsvp = () => {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <OpeningAnimation onComplete={() => setAnimationComplete(true)} />
      
      {animationComplete && (
        <main>
          <HeroSection onRsvpClick={scrollToRsvp} />
          <ParentsSection />
          <CountdownTimer />
          <EventDetails />
          <PhotoGallery />
          <div ref={rsvpRef}>
            <RsvpForm />
          </div>
          <Footer />
        </main>
      )}
    </div>
  );
}
