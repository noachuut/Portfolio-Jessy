import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Download } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    toast.success("Message envoyé avec succès ! Je vous répondrai bientôt.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Me Contacter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités ou de projets
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <Card className="shadow-soft border-border/50 animate-fade-in">
            <CardHeader>
              <CardTitle>Envoyez-moi un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Votre message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full gradient-primary text-white shadow-soft hover:shadow-hover transition-smooth"
                >
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Liens et informations */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {/* Télécharger CV */}
            <Card className="shadow-soft border-border/50 hover:border-primary/30 transition-smooth">
              <CardContent className="pt-6">
                <Button 
                  className="w-full gradient-primary text-white shadow-soft hover:shadow-hover transition-smooth"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger mon CV
                </Button>
              </CardContent>
            </Card>

            {/* Liens professionnels */}
            <Card className="shadow-soft border-border/50">
              <CardHeader>
                <CardTitle>Retrouvez-moi sur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="mailto:votre.email@exemple.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">votre.email@exemple.com</p>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/votreprofil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                    <Linkedin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">linkedin.com/in/votreprofil</p>
                  </div>
                </a>

                <a 
                  href="https://github.com/votreprofil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                >
                  <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-smooth">
                    <Github className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">GitHub</p>
                    <p className="text-sm text-muted-foreground">github.com/votreprofil</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
