import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PortfolioDataProvider } from "@/lib/portfolio-data";

createRoot(document.getElementById("root")!).render(
  <PortfolioDataProvider>
    <App />
  </PortfolioDataProvider>
);
