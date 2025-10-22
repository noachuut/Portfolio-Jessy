import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Stage Technicien Réseau",
    company: "Entreprise XYZ",
    period: "Juin 2024 - Août 2024",
    location: "Paris, France",
    type: "Stage",
    missions: [
      "Configuration et déploiement de switches Cisco",
      "Mise en place de VLANs pour la segmentation réseau",
      "Support technique niveau 1 et 2",
      "Documentation des procédures réseau"
    ],
    skills: ["Cisco", "VLAN", "Support technique", "Documentation"]
  },
  {
    title: "Projet Académique - Serveur Windows",
    company: "BTS SIO SISR",
    period: "Janvier 2024 - Mars 2024",
    location: "Établissement scolaire",
    type: "Projet",
    missions: [
      "Installation et configuration de Windows Server 2022",
      "Mise en place d'Active Directory",
      "Configuration DHCP et DNS",
      "Gestion des GPO et des utilisateurs"
    ],
    skills: ["Windows Server", "Active Directory", "DHCP", "DNS"]
  },
  {
    title: "Assistant Support Informatique",
    company: "Association locale",
    period: "Septembre 2023 - Décembre 2023",
    location: "France",
    type: "Bénévolat",
    missions: [
      "Assistance utilisateurs sur problèmes logiciels",
      "Installation et configuration de postes de travail",
      "Maintenance préventive du parc informatique",
      "Formation des utilisateurs aux outils bureautiques"
    ],
    skills: ["Support utilisateur", "Windows", "Formation", "Maintenance"]
  }
];

const Experience = () => {
  const [experiencesData, setExperiencesData] = useState(experiences);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_experiences");
    if (stored) {
      setExperiencesData(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Expériences Professionnelles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel et les missions que j'ai réalisées
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiencesData.map((exp, index) => (
            <Card 
              key={index}
              className="shadow-soft hover:shadow-hover transition-smooth border-border/50 hover:border-primary/20 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${
                exp.type === "Stage" ? "from-primary to-primary/80" :
                exp.type === "Projet" ? "from-accent to-accent/80" :
                "from-primary/80 to-accent"
              }`} />
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                        exp.type === "Stage" ? "from-primary to-primary/80" :
                        exp.type === "Projet" ? "from-accent to-accent/80" :
                        "from-primary/80 to-accent"
                      } flex items-center justify-center flex-shrink-0`}>
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground ml-13">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <span>•</span>
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 ml-13">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Missions réalisées :</h4>
                    <ul className="space-y-2">
                      {exp.missions.map((mission, i) => (
                        <li 
                          key={i} 
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2 mt-1.5 flex-shrink-0" />
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Compétences mobilisées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
