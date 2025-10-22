import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Network, Shield } from "lucide-react";

const missions = [
  {
    id: 1,
    icon: Server,
    title: "Mise en place d'un serveur DHCP",
    context: "Infrastructure réseau d'entreprise nécessitant une gestion automatisée des adresses IP",
    objectifs: [
      "Configurer un serveur DHCP sous Windows Server 2022",
      "Définir les plages d'adresses et les réservations",
      "Mettre en place la redondance et la haute disponibilité"
    ],
    outils: ["Windows Server 2022", "Active Directory", "PowerShell"],
    resultats: "Attribution automatique de 200+ adresses IP avec un taux de disponibilité de 99.9%",
    competences: ["Administration système", "Protocoles réseau", "Windows Server"]
  },
  {
    id: 2,
    icon: Network,
    title: "Configuration réseau VLAN avec supervision",
    context: "Segmentation réseau pour améliorer la sécurité et les performances",
    objectifs: [
      "Créer et configurer plusieurs VLANs",
      "Mettre en place le routage inter-VLAN",
      "Déployer une solution de supervision avec Zabbix"
    ],
    outils: ["Cisco Switch", "VLAN", "Zabbix", "SNMP"],
    resultats: "Isolation réussie de 5 départements avec monitoring temps réel et alertes automatiques",
    competences: ["Réseaux", "Sécurité", "Supervision", "Cisco"]
  },
  {
    id: 3,
    icon: Shield,
    title: "Sécurisation infrastructure et sauvegardes",
    context: "Renforcement de la sécurité du système d'information",
    objectifs: [
      "Configurer un pare-feu et des règles de filtrage",
      "Mettre en place une politique de sauvegardes",
      "Créer des comptes utilisateurs avec droits limités"
    ],
    outils: ["pfSense", "Windows Backup", "Group Policy", "Active Directory"],
    resultats: "Réduction de 80% des tentatives d'intrusion et sauvegardes quotidiennes automatisées",
    competences: ["Cybersécurité", "Administration", "Gestion des accès"]
  }
];

const Missions = () => {
  const [missionsData, setMissionsData] = useState(missions);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_missions");
    if (stored) {
      setMissionsData(JSON.parse(stored));
    }
  }, []);

  return (
    <section id="missions" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Missions Réalisées
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Projets techniques et missions professionnelles démontrant mes compétences en réseaux et systèmes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {missionsData.map((mission, index) => {
            const Icon = missions.find(m => m.id === mission.id)?.icon || Server;
            return (
              <Card 
                key={mission.id}
                className="shadow-soft hover:shadow-hover transition-smooth border-border/50 hover:border-primary/30 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{mission.title}</CardTitle>
                  <CardDescription className="text-sm">{mission.context}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Objectifs :</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {mission.objectifs.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Outils utilisés :</h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.outils.map((outil, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {outil}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Résultats :</h4>
                    <p className="text-sm text-muted-foreground">{mission.resultats}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Compétences :</h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.competences.map((comp, i) => (
                        <Badge key={i} className="text-xs bg-accent/10 text-accent hover:bg-accent/20 border-accent/30">
                          {comp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Missions;
