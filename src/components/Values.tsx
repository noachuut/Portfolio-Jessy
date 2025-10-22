import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, MessageSquare } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Adaptabilité",
    description: "Capacité à m'adapter rapidement aux nouvelles technologies et environnements de travail. Apprentissage continu et veille technologique active.",
    gradient: "from-primary to-primary/70"
  },
  {
    icon: Target,
    title: "Rigueur & Qualité",
    description: "Attention aux détails et respect des bonnes pratiques. Documentation précise et tests approfondis pour garantir la fiabilité des solutions.",
    gradient: "from-accent to-accent/70"
  },
  {
    icon: MessageSquare,
    title: "Support & Communication",
    description: "Excellentes compétences relationnelles et pédagogiques. Capacité à expliquer des concepts techniques de manière claire et accessible.",
    gradient: "from-primary/80 to-accent/80"
  }
];

const Values = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Atouts & Valeurs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les qualités qui me définissent et me permettent de réussir mes missions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index}
                className="shadow-soft hover:shadow-hover transition-smooth border-border/50 hover:border-primary/20 text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-soft`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;
