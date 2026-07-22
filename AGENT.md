# AGENT.md

# HOUEKIN MINISTRIES
## La Cité d'Excellence

Version : 1.0

---

# Mission

Construire une plateforme web moderne, premium et évolutive pour **HOUEKIN MINISTRIES – La Cité d'Excellence**.

Le projet commence comme un **site vitrine** présentant l'église, ses programmes et ses activités, puis évoluera progressivement vers une plateforme SaaS complète de gestion d'église.

Chaque décision technique doit être pensée pour faciliter cette évolution.

Le projet doit être :

- Moderne
- Rapide
- Accessible
- Responsive
- Sécurisé
- Maintenable
- Évolutif

---

# Vision long terme

Le projet évoluera selon les phases suivantes.

## Phase 1

Site vitrine

Objectif :

Présenter l'église.

Inclure :

- Accueil
- À propos
- Programmes
- Départements
- Prédications
- Galerie
- Faire un don
- Contact

---

## Phase 2

Dashboard d'administration.

Fonctionnalités :

- Gestion des visiteurs
- Gestion des demandes
- Gestion des événements
- Gestion du contenu
- Gestion des médias

---

## Phase 3

Gestion des fidèles.

Chaque fidèle disposera d'une fiche complète.

- Photo
- QR Code
- Informations personnelles
- Famille
- Profession
- Département
- Historique
- Présence

---

## Phase 4

Portail membre.

Chaque fidèle pourra :

- se connecter
- consulter son profil
- mettre à jour certaines informations
- télécharger sa carte de membre
- recevoir des annonces

---

## Phase 5

Transformation en SaaS multi-tenant.

Une seule plateforme hébergera plusieurs églises.

Chaque église possédera :

- son propre domaine
- son identité visuelle
- son dashboard
- ses utilisateurs
- ses données isolées

---

# Design Philosophy

Le site doit transmettre :

- Excellence
- Élégance
- Autorité
- Confiance
- Modernité
- Espérance

Le design ne doit jamais ressembler à un site d'église traditionnel.

Inspirations :

- Apple
- Stripe
- Framer
- Webflow
- Hillsong Church
- Elevation Church
- Nike

Le rendu doit être premium.

---

# Identité visuelle

Nom :

HOUEKIN MINISTRIES

Sous-titre :

La Cité d'Excellence

Palette principale :

Rouge

#B5121B

Rouge foncé

#7A0000

Or

#D4AF37

Or foncé

#8C6A17

Noir

#111111

Blanc

#FCFCFC

Gris clair

#F5F5F5

Les couleurs doivent être utilisées avec modération.

L'interface doit rester lumineuse.

---

# Style UI

Utiliser :

- beaucoup d'espace blanc
- grandes images
- cartes élégantes
- coins arrondis (16px)
- ombres discrètes
- animations fluides
- micro-interactions
- transitions douces

Ne jamais surcharger une page.

---

# Responsive

Le projet doit être :

Desktop First

mais parfaitement adapté :

- Desktop
- Laptop
- Tablet
- Mobile

---

# Pages publiques

## Accueil

Contient :

Hero

Présentation

Horaires

Programmes

Événements

Message du pasteur

Statistiques

Carte

Footer

---

## À propos

- Histoire
- Vision
- Mission
- Valeurs
- Notre Foi
- Équipe pastorale

---

## Programmes

Présenter :

- Cultes
- Veillées
- Jeûnes
- Séminaires
- Conférences

Chaque programme possède :

- image
- date
- heure
- lieu
- description

---

## Départements

Afficher chaque département sous forme de carte.

Exemple :

Jeunesse

Description

Responsable

Jour de réunion

---

## Prédications

Filtres :

- Vidéo
- Audio
- PDF

Recherche intégrée.

---

## Galerie

Photos

Vidéos

Animations au survol.

---

## Faire un don

Prévoir :

- Mobile Money
- Carte bancaire
- Virement

Architecture extensible.

---

## Contact

Carte Google Maps

Adresse

Téléphone

WhatsApp

Email

Réseaux sociaux

Formulaire.

---

# Architecture technique

Framework :

Next.js 15

App Router

TypeScript obligatoire.

---

# UI

Tailwind CSS

+

shadcn/ui

---

# Icônes

Lucide React

---

# Animations

Framer Motion

Uniquement lorsque cela améliore l'expérience utilisateur.

Pas d'animations inutiles.

---

# Images

Optimiser avec next/image.

Toutes les images doivent être responsives.

Lazy loading.

---

# SEO

Chaque page doit avoir :

- title
- description
- OpenGraph
- Twitter Card

Utiliser les Metadata API de Next.js.

---

# Accessibilité

Respecter WCAG.

Contrastes suffisants.

Navigation clavier.

Labels.

ARIA.

---

# Performance

Objectif Lighthouse :

Performance > 95

Accessibility > 95

SEO > 95

Best Practices > 95

---

# Code Quality

Toujours écrire :

- code lisible
- composants réutilisables
- architecture claire

Éviter les duplications.

Toujours privilégier :

composition

plutôt que

duplication.

---

# Structure recommandée

/app

/components

/features

/lib

/hooks

/services

/types

/constants

/public

/styles

---

# Convention de nommage

Composants

PascalCase

Exemple

Hero.tsx

ProgramCard.tsx

DepartmentCard.tsx

Fonctions

camelCase

Variables

camelCase

Constantes

UPPER_CASE

---

# Git

Commits conventionnels.

Exemples :

feat:

fix:

refactor:

docs:

style:

perf:

test:

chore:

---

# Expérience utilisateur

Toujours privilégier :

simplicité

clarté

rapidité

lisibilité

Chaque page doit guider naturellement le visiteur.

Le nombre de clics doit être minimal.

---

# Sécurité

Préparer le projet pour :

Authentification

Dashboard

Gestion des rôles

Protection des routes

Validation serveur

Sanitisation des données

---

# Internationalisation

Prévoir dès le départ la possibilité d'ajouter plusieurs langues.

Première langue :

Français

Puis :

Anglais

---

# Objectif final

Créer la référence des plateformes web d'église en Afrique francophone.

Le résultat final doit être suffisamment qualitatif pour devenir un véritable SaaS de gestion d'église utilisé par des centaines d'églises.

Chaque nouvelle fonctionnalité doit respecter cette vision.