import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import avatar from "@/assets/avatar.png";
import { useState, useEffect } from "react";

interface PersonalInfo {
  name: string;
  title: string;
  specialization: string;
  description: string;
}

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Jessy Amestoy",
    title: "Étudiant en BTS SIO SISR",
    specialization: "Spécialiste Réseaux",
    description: "Passionné par les infrastructures réseau et l'administration système, je développe mes compétences techniques à travers des projets concrets et des missions professionnelles. Mon objectif : devenir technicien réseau ou administrateur systèmes, avec une vision d'évolution vers une licence professionnelle."
  });

  useEffect(() => {
    const storedInfo = localStorage.getItem("portfolio_personal_info");
    if (storedInfo) {
      setPersonalInfo(JSON.parse(storedInfo));
    }
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Avatar */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-soft hover:shadow-hover transition-smooth">
              <img 
                src={avatar} 
                alt="Avatar professionnel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Titre et sous-titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {personalInfo.name}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-6 gradient-primary bg-clip-text text-transparent">
            {personalInfo.title}
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4">
            {personalInfo.specialization}
          </p>

          {/* Présentation */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              {personalInfo.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="w-full sm:w-auto gradient-primary text-white shadow-soft hover:shadow-hover transition-smooth border-0"
              onClick={() => scrollToSection("missions")}
            >
              Voir mes missions
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/30 hover:border-primary hover:bg-primary/5 transition-smooth"
              onClick={() => scrollToSection("contact")}
            >
              Me contacter
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
