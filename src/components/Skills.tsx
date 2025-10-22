import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Server, Shield, Users, FileText, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Réseaux",
    icon: Network,
    color: "from-primary to-primary/80",
    skills: [
      "Configuration Cisco",
      "VLAN & Routage",
      "DHCP & DNS",
      "Protocoles TCP/IP",
      "Supervision réseau"
    ]
  },
  {
    title: "Systèmes",
    icon: Server,
    color: "from-accent to-accent/80",
    skills: [
      "Windows Server",
      "Linux (Debian/Ubuntu)",
      "VirtualBox & VMware",
      "Active Directory",
      "PowerShell"
    ]
  },
  {
    title: "Sécurité",
    icon: Shield,
    color: "from-primary/80 to-accent",
    skills: [
      "Pare-feu (pfSense)",
      "Sauvegardes",
      "Gestion des accès",
      "Politiques de sécurité",
      "Chiffrement"
    ]
  },
  {
    title: "Support & Communication",
    icon: Users,
    color: "from-accent/80 to-primary",
    skills: [
      "Support technique",
      "Travail d'équipe",
      "Gestion de projet",
      "Communication client",
      "Formation utilisateurs"
    ]
  },
  {
    title: "Documentation",
    icon: FileText,
    color: "from-primary to-accent/70",
    skills: [
      "Rédaction technique",
      "Procédures",
      "Diagrammes réseau",
      "Rapports d'activité",
      "Veille technologique"
    ]
  },
  {
    title: "Outils",
    icon: Wrench,
    color: "from-accent to-primary/70",
    skills: [
      "Zabbix (monitoring)",
      "Wireshark",
      "Packet Tracer",
      "Git & GitHub",
      "Microsoft Office"
    ]
  }
];

const Skills = () => {
  const [skillsData, setSkillsData] = useState(skillCategories.map(cat => ({
    id: String(skillCategories.indexOf(cat)),
    category: cat.title,
    skills: cat.skills
  })));

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_skills");
    if (stored) {
      setSkillsData(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="competences" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Compétences Techniques
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertises développées à travers ma formation et mes expériences professionnelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skillCategory, index) => {
            const defaultCategory = skillCategories.find(c => c.title === skillCategory.category);
            const Icon = defaultCategory?.icon || Network;
            const color = defaultCategory?.color || 'from-primary to-primary/80';
            return (
              <Card 
                key={index}
                className="shadow-soft hover:shadow-hover transition-smooth border-border/50 hover:border-primary/20 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${color}`} />
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{skillCategory.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skillCategory.skills.map((skill, i) => (
                      <li 
                        key={i} 
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
