import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePortfolioData, isValidPortfolioData } from "@/lib/portfolio-data";
import defaultData from "@/data/defaultData";
import type { Mission, Experience, SkillCategory, Article, PersonalInfo, PortfolioData } from "@/types/portfolio";

const EMPTY_MISSION_FORM = {
  title: "",
  context: "",
  objectifs: "",
  outils: "",
  resultats: "",
  competences: "",
};

const EMPTY_EXPERIENCE_FORM = {
  title: "",
  company: "",
  period: "",
  location: "",
  type: "",
  missions: "",
  skills: "",
};

const EMPTY_SKILL_FORM = {
  category: "",
  skills: "",
};

const EMPTY_ARTICLE_FORM = {
  title: "",
  description: "",
  date: "",
  category: "",
  tags: "",
  url: "",
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const Admin = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, isLoading, updateSection, importData } = usePortfolioData();

  const [missions, setMissions] = useState<Mission[]>(defaultData.missions);
  const [experiences, setExperiences] = useState<Experience[]>(defaultData.experiences);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(defaultData.skills);
  const [articles, setArticles] = useState<Article[]>(defaultData.articles);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultData.personalInfo);

  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingSkill, setEditingSkill] = useState<SkillCategory | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [personalInfoForm, setPersonalInfoForm] = useState<PersonalInfo>(defaultData.personalInfo);
  const [missionForm, setMissionForm] = useState(EMPTY_MISSION_FORM);
  const [experienceForm, setExperienceForm] = useState(EMPTY_EXPERIENCE_FORM);
  const [skillForm, setSkillForm] = useState(EMPTY_SKILL_FORM);
  const [articleForm, setArticleForm] = useState(EMPTY_ARTICLE_FORM);

  useEffect(() => {
    if (data) {
      setMissions(data.missions);
      setExperiences(data.experiences);
      setSkillCategories(data.skills);
      setArticles(data.articles);
      setPersonalInfo(data.personalInfo);
      setEditingMission(null);
      setEditingExperience(null);
      setEditingSkill(null);
      setEditingArticle(null);
    }
  }, [data]);

  useEffect(() => {
    setPersonalInfoForm({ ...personalInfo });
  }, [personalInfo]);

  useEffect(() => {
    if (editingMission) {
      setMissionForm({
        title: editingMission.title,
        context: editingMission.context,
        objectifs: editingMission.objectifs.join("\n"),
        outils: editingMission.outils.join(", "),
        resultats: editingMission.resultats,
        competences: editingMission.competences.join(", "),
      });
    } else {
      setMissionForm({ ...EMPTY_MISSION_FORM });
    }
  }, [editingMission]);

  useEffect(() => {
    if (editingExperience) {
      setExperienceForm({
        title: editingExperience.title,
        company: editingExperience.company,
        period: editingExperience.period,
        location: editingExperience.location,
        type: editingExperience.type,
        missions: editingExperience.missions.join("\n"),
        skills: editingExperience.skills.join(", "),
      });
    } else {
      setExperienceForm({ ...EMPTY_EXPERIENCE_FORM });
    }
  }, [editingExperience]);

  useEffect(() => {
    if (editingSkill) {
      setSkillForm({
        category: editingSkill.category,
        skills: editingSkill.skills.join(", "),
      });
    } else {
      setSkillForm({ ...EMPTY_SKILL_FORM });
    }
  }, [editingSkill]);

  useEffect(() => {
    if (editingArticle) {
      setArticleForm({
        title: editingArticle.title,
        description: editingArticle.description,
        date: editingArticle.date,
        category: editingArticle.category,
        tags: editingArticle.tags.join(", "),
        url: editingArticle.url,
      });
    } else {
      setArticleForm({ ...EMPTY_ARTICLE_FORM });
    }
  }, [editingArticle]);

  const buildPortfolioData = (): PortfolioData => ({
    personalInfo,
    missions,
    experiences,
    skills: skillCategories,
    articles,
  });

  const handleExport = () => {
    const exportData = buildPortfolioData();
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Export réussi", description: "Le fichier JSON a été téléchargé." });
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsed = JSON.parse(content);

      if (!isValidPortfolioData(parsed)) {
        throw new Error("Le fichier ne respecte pas le format attendu.");
      }

      importData(parsed);
      toast({ title: "Import réussi", description: "Les données ont été mises à jour." });
    } catch (error) {
      toast({
        title: "Import échoué",
        description: error instanceof Error ? error.message : "Impossible de lire le fichier sélectionné.",
        variant: "destructive",
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSavePersonalInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPersonalInfo({ ...personalInfoForm });
    updateSection("personalInfo", { ...personalInfoForm });
    toast({ title: "Informations personnelles mises à jour" });
  };

  const handleSaveMission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mission: Mission = {
      id: editingMission?.id ?? createId(),
      title: missionForm.title.trim(),
      context: missionForm.context.trim(),
      objectifs: missionForm.objectifs.split("\n").map(line => line.trim()).filter(Boolean),
      outils: missionForm.outils.split(",").map(item => item.trim()).filter(Boolean),
      resultats: missionForm.resultats.trim(),
      competences: missionForm.competences.split(",").map(item => item.trim()).filter(Boolean),
    };

    const updated = editingMission
      ? missions.map(m => (m.id === mission.id ? mission : m))
      : [...missions, mission];

    setMissions(updated);
    updateSection("missions", updated);
    toast({ title: editingMission ? "Mission mise à jour" : "Mission ajoutée" });
    setEditingMission(null);
  };

  const deleteMission = (id: string) => {
    const updated = missions.filter(m => m.id !== id);
    setMissions(updated);
    updateSection("missions", updated);
    if (editingMission?.id === id) {
      setEditingMission(null);
    }
    toast({ title: "Mission supprimée" });
  };

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const experience: Experience = {
      id: editingExperience?.id ?? createId(),
      title: experienceForm.title.trim(),
      company: experienceForm.company.trim(),
      period: experienceForm.period.trim(),
      location: experienceForm.location.trim(),
      type: experienceForm.type.trim(),
      missions: experienceForm.missions.split("\n").map(line => line.trim()).filter(Boolean),
      skills: experienceForm.skills.split(",").map(item => item.trim()).filter(Boolean),
    };

    const updated = editingExperience
      ? experiences.map(exp => (exp.id === experience.id ? experience : exp))
      : [...experiences, experience];

    setExperiences(updated);
    updateSection("experiences", updated);
    toast({ title: editingExperience ? "Expérience mise à jour" : "Expérience ajoutée" });
    setEditingExperience(null);
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id);
    setExperiences(updated);
    updateSection("experiences", updated);
    if (editingExperience?.id === id) {
      setEditingExperience(null);
    }
    toast({ title: "Expérience supprimée" });
  };

  const handleSaveSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const skill: SkillCategory = {
      id: editingSkill?.id ?? createId(),
      category: skillForm.category.trim(),
      skills: skillForm.skills.split(",").map(item => item.trim()).filter(Boolean),
    };

    const updated = editingSkill
      ? skillCategories.map(s => (s.id === skill.id ? skill : s))
      : [...skillCategories, skill];

    setSkillCategories(updated);
    updateSection("skills", updated);
    toast({ title: editingSkill ? "Catégorie mise à jour" : "Catégorie ajoutée" });
    setEditingSkill(null);
  };

  const deleteSkill = (id: string) => {
    const updated = skillCategories.filter(s => s.id !== id);
    setSkillCategories(updated);
    updateSection("skills", updated);
    if (editingSkill?.id === id) {
      setEditingSkill(null);
    }
    toast({ title: "Catégorie supprimée" });
  };

  const handleSaveArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const article: Article = {
      id: editingArticle?.id ?? createId(),
      title: articleForm.title.trim(),
      description: articleForm.description.trim(),
      date: articleForm.date,
      category: articleForm.category.trim(),
      tags: articleForm.tags.split(",").map(item => item.trim()).filter(Boolean),
      url: articleForm.url.trim(),
    };

    const updated = editingArticle
      ? articles.map(a => (a.id === article.id ? article : a))
      : [...articles, article];

    setArticles(updated);
    updateSection("articles", updated);
    toast({ title: editingArticle ? "Article mis à jour" : "Article ajouté" });
    setEditingArticle(null);
  };

  const deleteArticle = (id: string) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    updateSection("articles", updated);
    if (editingArticle?.id === id) {
      setEditingArticle(null);
    }
    toast({ title: "Article supprimé" });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Administration</h1>
          <p className="text-muted-foreground">Gérer le contenu du portfolio</p>
          <Button variant="outline" className="mt-4" onClick={() => (window.location.href = "/")}>
            Retour au portfolio
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gestion des données</CardTitle>
            <CardDescription>
              Importez un fichier <code>data.json</code> pour mettre à jour le site ou exportez la configuration actuelle.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Les modifications sont stockées localement et peuvent être sauvegardées via un fichier JSON.</p>
              <p>
                Utilisez l'export pour créer une copie de sauvegarde puis remplacez <code>public/data.json</code> lors d'un
                déploiement pour rendre les changements permanents.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handleImport}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                <Upload className="w-4 h-4 mr-2" />
                Importer data.json
              </Button>
              <Button onClick={handleExport} disabled={isLoading}>
                <Download className="w-4 h-4 mr-2" />
                Exporter les données
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <p className="mb-6 text-sm text-muted-foreground">Chargement des données en cours…</p>
        )}

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
                    <Input
                      id="name"
                      name="name"
                      value={personalInfoForm.name}
                      onChange={e => setPersonalInfoForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Titre/Formation</Label>
                    <Input
                      id="title"
                      name="title"
                      value={personalInfoForm.title}
                      onChange={e => setPersonalInfoForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Spécialisation</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={personalInfoForm.specialization}
                      onChange={e => setPersonalInfoForm(prev => ({ ...prev, specialization: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={personalInfoForm.description}
                      onChange={e => setPersonalInfoForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit">Mettre à jour le profil</Button>
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
                    <Label htmlFor="mission-title">Titre</Label>
                    <Input
                      id="mission-title"
                      name="title"
                      value={missionForm.title}
                      onChange={e => setMissionForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-context">Contexte</Label>
                    <Textarea
                      id="mission-context"
                      name="context"
                      value={missionForm.context}
                      onChange={e => setMissionForm(prev => ({ ...prev, context: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-objectifs">Objectifs (un par ligne)</Label>
                    <Textarea
                      id="mission-objectifs"
                      name="objectifs"
                      value={missionForm.objectifs}
                      onChange={e => setMissionForm(prev => ({ ...prev, objectifs: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-outils">Outils (séparés par virgule)</Label>
                    <Input
                      id="mission-outils"
                      name="outils"
                      value={missionForm.outils}
                      onChange={e => setMissionForm(prev => ({ ...prev, outils: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-resultats">Résultats</Label>
                    <Textarea
                      id="mission-resultats"
                      name="resultats"
                      value={missionForm.resultats}
                      onChange={e => setMissionForm(prev => ({ ...prev, resultats: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-competences">Compétences (séparées par virgule)</Label>
                    <Input
                      id="mission-competences"
                      name="competences"
                      value={missionForm.competences}
                      onChange={e => setMissionForm(prev => ({ ...prev, competences: e.target.value }))}
                      required
                    />
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
                    <Label htmlFor="experience-title">Titre</Label>
                    <Input
                      id="experience-title"
                      name="title"
                      value={experienceForm.title}
                      onChange={e => setExperienceForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-company">Entreprise/Organisation</Label>
                    <Input
                      id="experience-company"
                      name="company"
                      value={experienceForm.company}
                      onChange={e => setExperienceForm(prev => ({ ...prev, company: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-period">Période</Label>
                    <Input
                      id="experience-period"
                      name="period"
                      value={experienceForm.period}
                      onChange={e => setExperienceForm(prev => ({ ...prev, period: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-location">Lieu</Label>
                    <Input
                      id="experience-location"
                      name="location"
                      value={experienceForm.location}
                      onChange={e => setExperienceForm(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-type">Type</Label>
                    <Input
                      id="experience-type"
                      name="type"
                      placeholder="Stage, Projet, Bénévolat..."
                      value={experienceForm.type}
                      onChange={e => setExperienceForm(prev => ({ ...prev, type: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-missions">Missions (une par ligne)</Label>
                    <Textarea
                      id="experience-missions"
                      name="missions"
                      value={experienceForm.missions}
                      onChange={e => setExperienceForm(prev => ({ ...prev, missions: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-skills">Compétences (séparées par virgule)</Label>
                    <Input
                      id="experience-skills"
                      name="skills"
                      value={experienceForm.skills}
                      onChange={e => setExperienceForm(prev => ({ ...prev, skills: e.target.value }))}
                      required
                    />
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
                    <Label htmlFor="skill-category">Catégorie</Label>
                    <Input
                      id="skill-category"
                      name="category"
                      value={skillForm.category}
                      onChange={e => setSkillForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="skill-list">Compétences (séparées par virgule)</Label>
                    <Textarea
                      id="skill-list"
                      name="skills"
                      value={skillForm.skills}
                      onChange={e => setSkillForm(prev => ({ ...prev, skills: e.target.value }))}
                      required
                    />
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
                    <Input
                      id="article-title"
                      name="article-title"
                      value={articleForm.title}
                      onChange={e => setArticleForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="article-description">Description</Label>
                    <Textarea
                      id="article-description"
                      name="article-description"
                      value={articleForm.description}
                      onChange={e => setArticleForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="article-date">Date</Label>
                    <Input
                      id="article-date"
                      name="article-date"
                      type="date"
                      value={articleForm.date}
                      onChange={e => setArticleForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="article-category">Catégorie</Label>
                    <Input
                      id="article-category"
                      name="article-category"
                      value={articleForm.category}
                      onChange={e => setArticleForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="article-tags">Tags (séparés par virgule)</Label>
                    <Input
                      id="article-tags"
                      name="article-tags"
                      value={articleForm.tags}
                      onChange={e => setArticleForm(prev => ({ ...prev, tags: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="article-url">URL</Label>
                    <Input
                      id="article-url"
                      name="article-url"
                      type="url"
                      value={articleForm.url}
                      onChange={e => setArticleForm(prev => ({ ...prev, url: e.target.value }))}
                      required
                    />
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
                        <p className="text-sm text-muted-foreground">
                          {article.category} - {new Date(article.date).toLocaleDateString("fr-FR")}
                        </p>
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
