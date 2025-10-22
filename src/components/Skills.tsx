import { Card, CardContent } from "@/components/ui/card";
import { Network, Server, Shield, Users, FileText, Wrench } from "lucide-react";
import { usePortfolioData } from "@/lib/portfolio-data";

const iconSequence = [
  { icon: Network, color: "from-primary to-primary/80" },
  { icon: Server, color: "from-accent to-accent/80" },
  { icon: Shield, color: "from-primary/80 to-accent" },
  { icon: Users, color: "from-accent/80 to-primary" },
  { icon: FileText, color: "from-primary to-accent/70" },
  { icon: Wrench, color: "from-accent to-primary/70" },
];

const Skills = () => {
  const { data } = usePortfolioData();
  const skillCategories = data.skills;

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

        {skillCategories.length === 0 ? (
          <p className="text-center text-muted-foreground">Aucune compétence renseignée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((skillCategory, index) => {
              const { icon: Icon, color } = iconSequence[index % iconSequence.length];
              return (
                <Card
                  key={skillCategory.id}
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
        )}
      </div>
    </section>
  );
};

export default Skills;
