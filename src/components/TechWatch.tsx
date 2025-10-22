import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { usePortfolioData } from "@/lib/portfolio-data";

const categories = ["Tous", "Sécurité", "Réseaux", "DevOps", "Intelligence Artificielle"];

const TechWatch = () => {
  const { data } = usePortfolioData();
  const articles = data.articles;

  return (
    <section id="veille" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-elegant bg-clip-text text-transparent">
            Veille Technologique
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Suivez les dernières tendances et innovations dans le domaine des systèmes et réseaux
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>

        {/* Articles de veille */}
        {articles.length === 0 ? (
          <p className="text-center text-muted-foreground">Aucun article de veille disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="default" className="w-full" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Lire l'article
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Section Sources */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Sources de veille</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sites web spécialisés</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• LeMagIT</li>
                  <li>• Silicon.fr</li>
                  <li>• ITespresso</li>
                  <li>• ZDNet</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blogs techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Blog du Modérateur</li>
                  <li>• Korben</li>
                  <li>• Next INpact</li>
                  <li>• FrAndroid</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Réseaux sociaux</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• LinkedIn Tech Groups</li>
                  <li>• Twitter IT News</li>
                  <li>• Reddit r/sysadmin</li>
                  <li>• Dev.to</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechWatch;
