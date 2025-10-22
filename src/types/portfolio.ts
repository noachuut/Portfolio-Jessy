export interface Mission {
  id: string;
  title: string;
  context: string;
  objectifs: string[];
  outils: string[];
  resultats: string;
  competences: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  missions: string[];
  skills: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  specialization: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  url: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  missions: Mission[];
  experiences: Experience[];
  skills: SkillCategory[];
  articles: Article[];
}
