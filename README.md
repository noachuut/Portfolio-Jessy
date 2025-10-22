# Portfolio Jessy

Application React (Vite + TypeScript) pour présenter le portfolio de Jessy Amestoy. Le contenu du site est entièrement éditable via une interface d'administration et peut être synchronisé avec un fichier `data.json` afin de conserver les modifications dans le temps.

## Gestion des données (`data.json`)

- Le fichier `public/data.json` contient l'ensemble des informations affichées (profil, missions, expériences, compétences, veille technologique).
- L'interface `/admin` permet d'ajouter, modifier ou supprimer chaque élément. Les formulaires sont entièrement contrôlés : cliquez sur l'icône crayon pour éditer un enregistrement existant.
- Depuis l'onglet d'administration, utilisez les boutons :
  - **Importer data.json** : charge un fichier JSON valide et met immédiatement à jour le site.
  - **Exporter les données** : télécharge le contenu actuel au format JSON (utile pour sauvegarder ou versionner les changements).
- Après un export, remplacez le fichier `public/data.json` avant un nouveau déploiement pour partager les modifications à tous les visiteurs.

## Démarrage en local

```bash
npm install
npm run dev
```

L'interface d'administration est disponible sur `http://localhost:5173/admin` (port par défaut de Vite).

## Déploiement avec Docker

Un environnement Docker multi-étapes est fourni pour construire l'application et la servir via Nginx.

### Construction et exécution

```bash
docker-compose up --build -d
```

- Le service `portfolio` expose le port 80 dans le conteneur. Par défaut, il est mappé sur le port `8080` de l'hôte (modifiable dans `docker-compose.yml`).
- Pour l'intégrer avec Nginx Proxy Manager, rattachez ce conteneur au même réseau Docker que votre proxy et créez un nouvel hôte proxy pointant vers `portfolio:80`.

### Structure Nginx

Le fichier `docker/nginx.conf` sert l'application en mode SPA : toutes les routes sont redirigées vers `index.html` et le dossier `assets/` est mis en cache.

## Mise à jour du contenu en production

1. Exportez les données depuis `/admin` pour récupérer un fichier JSON contenant vos modifications.
2. Remplacez `public/data.json` dans votre dépôt ou montage volume.
3. Redeployez le conteneur (`docker-compose build` puis `docker-compose up -d`) afin de publier les nouveaux contenus.

Grâce à cette approche, vous pouvez itérer sur le contenu sans modifier le code source et conserver une trace versionnée de chaque évolution.
