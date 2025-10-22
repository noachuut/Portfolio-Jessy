import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Missions from "@/components/Missions";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Values from "@/components/Values";
import TechWatch from "@/components/TechWatch";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <Missions />
        <Experience />
        <Skills />
        <Values />
        <TechWatch />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio BTS SIO SISR. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
