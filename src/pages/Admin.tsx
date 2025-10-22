import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Mission {
  id: string;
  title: string;
  context: string;
  objectifs: string[];
  outils: string[];
  resultats: string;
  competences: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  missions: string[];
  skills: string[];
}

interface Skill {
  id: string;
  category: string;
  skills: string[];
}

interface PersonalInfo {
  name: string;
  title: string;
  specialization: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  url: string;
}

const Admin = () => {
  const { toast } = useToast();
  
  // State management
  const [missions, setMissions] = useState<Mission[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skillCategories, setSkillCategories] = useState<Skill[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Jessy Amestoy",
    title: "Étudiant en BTS SIO SISR",
    specialization: "Spécialiste Réseaux",
    description: "Passionné par les infrastructures réseau et l'administration système, je développe mes compétences techniques à travers des projets concrets et des missions professionnelles. Mon objectif : devenir technicien réseau ou administrateur systèmes, avec une vision d'évolution vers une licence professionnelle."
  });
  
  // Form states
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMissions = localStorage.getItem("portfolio_missions");
    const storedExperiences = localStorage.getItem("portfolio_experiences");
    const storedSkills = localStorage.getItem("portfolio_skills");
    const storedArticles = localStorage.getItem("portfolio_articles");
    const storedPersonalInfo = localStorage.getItem("portfolio_personal_info");
    
    if (storedMissions) setMissions(JSON.parse(storedMissions));
    if (storedExperiences) setExperiences(JSON.parse(storedExperiences));
    if (storedSkills) setSkillCategories(JSON.parse(storedSkills));
    if (storedArticles) setArticles(JSON.parse(storedArticles));
    if (storedPersonalInfo) setPersonalInfo(JSON.parse(storedPersonalInfo));
  }, []);

  // Save to localStorage
  const saveMissions = (data: Mission[]) => {
    localStorage.setItem("portfolio_missions", JSON.stringify(data));
    setMissions(data);
  };

  const saveExperiences = (data: Experience[]) => {
    localStorage.setItem("portfolio_experiences", JSON.stringify(data));
    setExperiences(data);
  };

  const saveSkills = (data: Skill[]) => {
    localStorage.setItem("portfolio_skills", JSON.stringify(data));
    setSkillCategories(data);
  };

  const saveArticles = (data: Article[]) => {
    localStorage.setItem("portfolio_articles", JSON.stringify(data));
    setArticles(data);
  };

  const savePersonalInfo = (data: PersonalInfo) => {
    localStorage.setItem("portfolio_personal_info", JSON.stringify(data));
    setPersonalInfo(data);
  };

  // CRUD Operations for Missions
  const handleSaveMission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const mission: Mission = {
      id: editingMission?.id || Date.now().toString(),
      title: formData.get("title") as string,
      context: formData.get("context") as string,
      objectifs: (formData.get("objectifs") as string).split("\n").filter(Boolean),
      outils: (formData.get("outils") as string).split(",").map(s => s.trim()).filter(Boolean),
      resultats: formData.get("resultats") as string,
      competences: (formData.get("competences") as string).split(",").map(s => s.trim()).filter(Boolean),
    };

    if (editingMission) {
      saveMissions(missions.map(m => m.id === mission.id ? mission : m));
      toast({ title: "Mission mise à jour" });
    } else {
      saveMissions([...missions, mission]);
      toast({ title: "Mission ajoutée" });
    }
    
    setEditingMission(null);
    e.currentTarget.reset();
  };

  const deleteMission = (id: string) => {
    saveMissions(missions.filter(m => m.id !== id));
    toast({ title: "Mission supprimée" });
  };

  // CRUD Operations for Experiences
  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const experience: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      missions: (formData.get("missions") as string).split("\n").filter(Boolean),
      skills: (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean),
    };

    if (editingExperience) {
      saveExperiences(experiences.map(exp => exp.id === experience.id ? experience : exp));
      toast({ title: "Expérience mise à jour" });
    } else {
      saveExperiences([...experiences, experience]);
      toast({ title: "Expérience ajoutée" });
    }
    
    setEditingExperience(null);
    e.currentTarget.reset();
  };

  const deleteExperience = (id: string) => {
    saveExperiences(experiences.filter(exp => exp.id !== id));
    toast({ title: "Expérience supprimée" });
  };

  // CRUD Operations for Skills
  const handleSaveSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const skill: Skill = {
      id: editingSkill?.id || Date.now().toString(),
      category: formData.get("category") as string,
      skills: (formData.get("skills") as string).split(",").map(s => s.trim()).filter(Boolean),
    };

    if (editingSkill) {
      saveSkills(skillCategories.map(s => s.id === skill.id ? skill : s));
      toast({ title: "Catégorie mise à jour" });
    } else {
      saveSkills([...skillCategories, skill]);
      toast({ title: "Catégorie ajoutée" });
    }
    
    setEditingSkill(null);
    e.currentTarget.reset();
  };

  const deleteSkill = (id: string) => {
    saveSkills(skillCategories.filter(s => s.id !== id));
    toast({ title: "Catégorie supprimée" });
  };

  // CRUD Operations for Articles
  const handleSaveArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const article: Article = {
      id: editingArticle?.id || Date.now().toString(),
      title: formData.get("article-title") as string,
      description: formData.get("article-description") as string,
      date: formData.get("article-date") as string,
      category: formData.get("article-category") as string,
      tags: (formData.get("article-tags") as string).split(",").map(s => s.trim()).filter(Boolean),
      url: formData.get("article-url") as string,
    };

    if (editingArticle) {
      saveArticles(articles.map(a => a.id === article.id ? article : a));
      toast({ title: "Article mis à jour" });
    } else {
      saveArticles([...articles, article]);
      toast({ title: "Article ajouté" });
    }
    
    setEditingArticle(null);
    e.currentTarget.reset();
  };

  const deleteArticle = (id: string) => {
    saveArticles(articles.filter(a => a.id !== id));
    toast({ title: "Article supprimé" });
  };

  // Personal Info Operations
  const handleSavePersonalInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const info: PersonalInfo = {
      name: formData.get("name") as string,
      title: formData.get("title") as string,
      specialization: formData.get("specialization") as string,
      description: formData.get("description") as string,
    };

    savePersonalInfo(info);
    toast({ title: "Informations personnelles mises à jour" });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Administration</h1>
          <p className="text-muted-foreground">Gérer le contenu du portfolio</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.href = "/"}>
            Retour au portfolio
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="experiences">Expériences</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="veille">Veille</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" name="name" defaultValue={personalInfo.name} required />
                  </div>
                  <div>
                    <Label htmlFor="title">Titre/Formation</Label>
                    <Input id="title" name="title" defaultValue={personalInfo.title} required />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Spécialisation</Label>
                    <Input id="specialization" name="specialization" defaultValue={personalInfo.specialization} required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={personalInfo.description} rows={5} required />
                  </div>
                  <Button type="submit">
                    Mettre à jour le profil
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingMission ? "Modifier" : "Ajouter"} une Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveMission} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" name="title" defaultValue={editingMission?.title} required />
                  </div>
                  <div>
                    <Label htmlFor="context">Contexte</Label>
                    <Textarea id="context" name="context" defaultValue={editingMission?.context} required />
                  </div>
                  <div>
                    <Label htmlFor="objectifs">Objectifs (un par ligne)</Label>
                    <Textarea id="objectifs" name="objectifs" defaultValue={editingMission?.objectifs.join("\n")} required />
                  </div>
                  <div>
                    <Label htmlFor="outils">Outils (séparés par virgule)</Label>
                    <Input id="outils" name="outils" defaultValue={editingMission?.outils.join(", ")} required />
                  </div>
                  <div>
                    <Label htmlFor="resultats">Résultats</Label>
                    <Textarea id="resultats" name="resultats" defaultValue={editingMission?.resultats} required />
                  </div>
                  <div>
                    <Label htmlFor="competences">Compétences (séparées par virgule)</Label>
                    <Input id="competences" name="competences" defaultValue={editingMission?.competences.join(", ")} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingMission ? "Mettre à jour" : "Ajouter"}
                    </Button>
                    {editingMission && (
                      <Button type="button" variant="outline" onClick={() => setEditingMission(null)}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {missions.map(mission => (
                <Card key={mission.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{mission.title}</h3>
                        <p className="text-sm text-muted-foreground">{mission.context}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingMission(mission)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMission(mission.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingExperience ? "Modifier" : "Ajouter"} une Expérience</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveExperience} className="space-y-4">
                  <div>
                    <Label htmlFor="exp-title">Titre</Label>
                    <Input id="exp-title" name="title" defaultValue={editingExperience?.title} required />
                  </div>
                  <div>
                    <Label htmlFor="company">Entreprise/Organisation</Label>
                    <Input id="company" name="company" defaultValue={editingExperience?.company} required />
                  </div>
                  <div>
                    <Label htmlFor="period">Période</Label>
                    <Input id="period" name="period" defaultValue={editingExperience?.period} required />
                  </div>
                  <div>
                    <Label htmlFor="location">Lieu</Label>
                    <Input id="location" name="location" defaultValue={editingExperience?.location} required />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input id="type" name="type" defaultValue={editingExperience?.type} placeholder="Stage, Projet, Bénévolat..." required />
                  </div>
                  <div>
                    <Label htmlFor="exp-missions">Missions (une par ligne)</Label>
                    <Textarea id="exp-missions" name="missions" defaultValue={editingExperience?.missions.join("\n")} required />
                  </div>
                  <div>
                    <Label htmlFor="exp-skills">Compétences (séparées par virgule)</Label>
                    <Input id="exp-skills" name="skills" defaultValue={editingExperience?.skills.join(", ")} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingExperience ? "Mettre à jour" : "Ajouter"}
                    </Button>
                    {editingExperience && (
                      <Button type="button" variant="outline" onClick={() => setEditingExperience(null)}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {experiences.map(exp => (
                <Card key={exp.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company} - {exp.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingExperience(exp)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteExperience(exp.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingSkill ? "Modifier" : "Ajouter"} une Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveSkill} className="space-y-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Input id="category" name="category" defaultValue={editingSkill?.category} required />
                  </div>
                  <div>
                    <Label htmlFor="cat-skills">Compétences (séparées par virgule)</Label>
                    <Textarea id="cat-skills" name="skills" defaultValue={editingSkill?.skills.join(", ")} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingSkill ? "Mettre à jour" : "Ajouter"}
                    </Button>
                    {editingSkill && (
                      <Button type="button" variant="outline" onClick={() => setEditingSkill(null)}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {skillCategories.map(skill => (
                <Card key={skill.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{skill.category}</h3>
                        <p className="text-sm text-muted-foreground">{skill.skills.join(", ")}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingSkill(skill)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteSkill(skill.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Veille Tab */}
          <TabsContent value="veille" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingArticle ? "Modifier" : "Ajouter"} un Article</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveArticle} className="space-y-4">
                  <div>
                    <Label htmlFor="article-title">Titre</Label>
                    <Input id="article-title" name="article-title" defaultValue={editingArticle?.title} required />
                  </div>
                  <div>
                    <Label htmlFor="article-description">Description</Label>
                    <Textarea id="article-description" name="article-description" defaultValue={editingArticle?.description} required />
                  </div>
                  <div>
                    <Label htmlFor="article-date">Date</Label>
                    <Input id="article-date" name="article-date" type="date" defaultValue={editingArticle?.date} required />
                  </div>
                  <div>
                    <Label htmlFor="article-category">Catégorie</Label>
                    <Input id="article-category" name="article-category" defaultValue={editingArticle?.category} required />
                  </div>
                  <div>
                    <Label htmlFor="article-tags">Tags (séparés par virgule)</Label>
                    <Input id="article-tags" name="article-tags" defaultValue={editingArticle?.tags.join(", ")} required />
                  </div>
                  <div>
                    <Label htmlFor="article-url">URL</Label>
                    <Input id="article-url" name="article-url" type="url" defaultValue={editingArticle?.url} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingArticle ? "Mettre à jour" : "Ajouter"}
                    </Button>
                    {editingArticle && (
                      <Button type="button" variant="outline" onClick={() => setEditingArticle(null)}>
                        Annuler
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {articles.map(article => (
                <Card key={article.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.category} - {new Date(article.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingArticle(article)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteArticle(article.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
