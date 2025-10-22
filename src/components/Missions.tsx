import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Network, Shield } from "lucide-react";
import { usePortfolioData } from "@/lib/portfolio-data";

const iconSequence = [Server, Network, Shield];

const Missions = () => {
  const { data } = usePortfolioData();
  const missions = data.missions;

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

        {missions.length === 0 ? (
          <p className="text-center text-muted-foreground">Aucune mission enregistrée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {missions.map((mission, index) => {
              const Icon = iconSequence[index % iconSequence.length];
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
        )}
      </div>
    </section>
  );
};

export default Missions;
