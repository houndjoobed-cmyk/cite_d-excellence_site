# La Cité d'Excellence - HOUEKIN MINISTRIES

Application web complète et système de gestion interne (Dashboard Admin) pour l'église **Houekin Ministries - La Cité d'Excellence**.

## 🌟 Fonctionnalités

### Site Public
- **Accueil & Présentation :** Présentation de l'église, vision, mission et horaires des cultes.
- **Prédications :** Bibliothèque de vidéos YouTube (prédications) synchronisée avec la base de données.
- **Faire un don :** Section dédiée aux offrandes, dîmes et actions de grâce (Mobile Money).

### Espace Administration (Dashboard)
- **Gestion des Fidèles :** Enregistrement, modification et suppression des membres et bénévoles.
- **Cartes d'Identité :** Génération automatique de la carte d'identité numérique officielle pour chaque membre.
- **Export Excel/CSV :** Téléchargement de la base de données des membres en un clic.
- **Gestion des Prédications :** Ajout et suppression des liens de prédications affichés sur le site public.
- **PWA (Progressive Web App) :** Possibilité d'installer le tableau de bord comme une application native sur mobile (ordinateur, iOS, Android).

## 🚀 Technologies Utilisées

- **Framework :** [Next.js 14](https://nextjs.org/) (App Router)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Style :** [Tailwind CSS](https://tailwindcss.com/)
- **Base de données & Auth :** [Supabase](https://supabase.com/) (PostgreSQL)
- **Icônes :** [Lucide React](https://lucide.dev/)

## 🛠️ Installation en Local

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/houndjoobed-cmyk/Cit-_d-excellence_site.git
   cd Cit-_d-excellence_site
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env.local` à la racine du projet et ajoutez vos clés Supabase :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📱 Installation de la PWA (Mobile)
Pour installer l'application sur un téléphone :
1. Accédez au site web sur votre navigateur mobile (Chrome ou Safari).
2. Rendez-vous sur la page `/admin/login`.
3. Cliquez sur l'option de votre navigateur "Ajouter à l'écran d'accueil" (*Add to Home Screen*).
4. Le Dashboard apparaîtra parmi vos applications comme un logiciel natif.

## 🔐 Sécurité
- Le tableau de bord (`/admin/*`) est protégé par un système d'authentification (Row Level Security - RLS) via Supabase.
- Toutes les opérations de base de données (ajout, modification, suppression) nécessitent que l'utilisateur soit connecté avec le compte administrateur.

---
*Conçu et développé pour Houekin Ministries.*
