import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import defaultData from "@/data/defaultData";
import type { PortfolioData, Mission, Experience, SkillCategory, Article, PersonalInfo } from "@/types/portfolio";

const STORAGE_KEY = "portfolio_data_v1";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === "string");

const isPersonalInfo = (value: unknown): value is PersonalInfo =>
  isObject(value) &&
  typeof value.name === "string" &&
  typeof value.title === "string" &&
  typeof value.specialization === "string" &&
  typeof value.description === "string";

const isMission = (value: unknown): value is Mission =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.title === "string" &&
  typeof value.context === "string" &&
  isStringArray(value.objectifs) &&
  isStringArray(value.outils) &&
  typeof value.resultats === "string" &&
  isStringArray(value.competences);

const isExperience = (value: unknown): value is Experience =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.title === "string" &&
  typeof value.company === "string" &&
  typeof value.period === "string" &&
  typeof value.location === "string" &&
  typeof value.type === "string" &&
  isStringArray(value.missions) &&
  isStringArray(value.skills);

const isSkillCategory = (value: unknown): value is SkillCategory =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.category === "string" &&
  isStringArray(value.skills);

const isArticle = (value: unknown): value is Article =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.title === "string" &&
  typeof value.description === "string" &&
  typeof value.date === "string" &&
  typeof value.category === "string" &&
  isStringArray(value.tags) &&
  typeof value.url === "string";

export const isValidPortfolioData = (value: unknown): value is PortfolioData =>
  isObject(value) &&
  isPersonalInfo(value.personalInfo) &&
  Array.isArray(value.missions) && value.missions.every(isMission) &&
  Array.isArray(value.experiences) && value.experiences.every(isExperience) &&
  Array.isArray(value.skills) && value.skills.every(isSkillCategory) &&
  Array.isArray(value.articles) && value.articles.every(isArticle);

interface PortfolioDataContextValue {
  data: PortfolioData;
  isLoading: boolean;
  updateSection: <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => void;
  importData: (nextData: PortfolioData) => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextValue | undefined>(undefined);

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    let active = true;

    const loadData = async () => {
      if (!active) {
        return;
      }

      let loaded: PortfolioData | null = null;

      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (isValidPortfolioData(parsed)) {
            loaded = parsed;
          }
        }
      } catch (error) {
        console.warn("Impossible de charger les données depuis le stockage local", error);
      }

      if (!loaded) {
        try {
          const response = await fetch("/data.json", { cache: "no-store" });
          if (response.ok) {
            const json = await response.json();
            if (isValidPortfolioData(json)) {
              loaded = json;
            }
          }
        } catch (error) {
          console.warn("Impossible de récupérer les données par défaut", error);
        }
      }

      if (!loaded) {
        loaded = defaultData;
      }

      if (active) {
        setData(loaded);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
        setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  const updateSection = <K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => {
    setData(prev => {
      const next = { ...prev, [section]: value };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  };

  const importData = (nextData: PortfolioData) => {
    if (!isValidPortfolioData(nextData)) {
      console.warn("Données importées invalides ignorées");
      return;
    }

    setData(nextData);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
    }
  };

  return (
    <PortfolioDataContext.Provider value={{ data, isLoading, updateSection, importData }}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);

  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }

  return context;
};
