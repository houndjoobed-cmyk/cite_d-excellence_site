# PRD.md

# Product Requirements Document

# HOUEKIN MINISTRIES
## La Cité d'Excellence

Version : 1.0

Statut : Draft

---

# 1. Présentation du projet

## Nom

HOUEKIN MINISTRIES – La Cité d'Excellence

## Type

Plateforme Web

## Première version

Site vitrine moderne

## Vision long terme

Transformer progressivement le projet en une plateforme SaaS de gestion d'église destinée aux églises francophones.

---

# 2. Contexte

Aujourd'hui, les informations de l'église sont dispersées entre :

- WhatsApp
- Facebook
- Cahiers
- Fichiers Excel
- Supports papier

Cela complique :

- la communication
- le suivi des visiteurs
- l'organisation des événements
- la gestion des membres

Le projet vise à centraliser toutes ces informations dans une plateforme moderne.

---

# 3. Objectifs

## Objectif principal

Créer un site internet professionnel qui :

- présente l'église
- inspire confiance
- facilite le contact
- communique les programmes
- prépare la transition vers une plateforme complète de gestion.

---

## Objectifs secondaires

Permettre aux visiteurs de :

- découvrir l'église
- consulter les horaires
- regarder les prédications
- suivre les événements
- contacter l'église

---

# 4. Public cible

## Primaire

Visiteurs

Nouveaux croyants

Membres

---

## Secondaire

Pasteurs

Responsables

Leaders

Partenaires

Donateurs

---

# 5. Valeurs de la plateforme

Le site doit refléter :

- Excellence
- Accueil
- Foi
- Espérance
- Modernité
- Simplicité
- Élégance

---

# 6. Fonctionnalités V1

## 6.1 Accueil

### Hero

Contient :

- grande image ou vidéo
- logo
- slogan
- boutons d'action

CTA :

- Découvrir l'église
- Nous rendre visite
- Regarder le direct

---

### Message du Pasteur

Photo

Nom

Mot de bienvenue

---

### Horaires

Afficher :

Dimanche

Mardi

Jeudi

Vendredi

Selon les informations administratives.

---

### Prochains événements

Afficher les événements à venir.

Chaque carte contient :

- image
- titre
- date
- heure
- lieu

---

### Aperçu des départements

Afficher quelques départements.

Lien :

Voir tous.

---

### Témoignages

Carousel.

---

### Footer

Navigation

Coordonnées

Réseaux sociaux

Copyright

---

# 6.2 À propos

Sections :

## Notre histoire

## Notre vision

## Notre mission

## Nos valeurs

## Notre foi

## Équipe pastorale

Chaque membre possède :

- photo
- nom
- fonction
- courte biographie

---

# 6.3 Programmes

Afficher :

- Cultes
- Veillées
- Conférences
- Jeûnes
- Séminaires
- Campagnes

Chaque programme contient :

Titre

Description

Date

Heure

Lieu

Image

---

# 6.4 Départements

Afficher sous forme de cartes.

Chaque département possède :

Nom

Image

Description

Responsable

Jour de réunion

Lieu

---

Départements initiaux :

- Jeunesse
- Chorale
- Femmes
- Hommes
- Enfants
- Intercession
- Média
- Protocole

---

# 6.5 Prédications

Catégories :

Vidéo

Audio

PDF

Live

Recherche

Filtres

---

Chaque prédication contient :

Titre

Prédicateur

Date

Description

Support

Durée

---

# 6.6 Galerie

Deux onglets :

Photos

Vidéos

Fonctionnalités :

- zoom
- aperçu
- navigation

---

# 6.7 Faire un don

Méthodes prévues :

Mobile Money

Carte bancaire

Virement

Le système doit être évolutif.

---

# 6.8 Contact

Afficher :

Adresse

Téléphone

Email

WhatsApp

Carte Google Maps

Réseaux sociaux

Formulaire de contact

---

# 7. Fonctionnalités V2

Dashboard Admin.

Gestion :

- contenus
- événements
- galerie
- programmes
- utilisateurs

---

# 8. Fonctionnalités V3

Gestion des fidèles.

Chaque fidèle possède :

Nom

Prénom

Photo

Téléphone

Email

Profession

Adresse

Date de naissance

Situation matrimoniale

Département

Cellule

Historique

QR Code

---

# 9. Fonctionnalités V4

Portail membre.

Le fidèle peut :

consulter son profil

modifier certaines informations

voir les annonces

télécharger sa carte

voir ses présences

---

# 10. Fonctionnalités V5

Gestion financière.

Prévoir :

Dîmes

Offrandes

Promesses

Dons

Rapports

---

# 11. Fonctionnalités V6

Version SaaS.

Architecture multi-tenant.

Chaque église dispose :

- de son espace
- de ses utilisateurs
- de ses données
- de son domaine

---

# 12. Rôles

## Visiteur

Peut :

consulter le site

envoyer un message

faire un don

---

## Membre

Peut :

se connecter

modifier son profil

consulter ses informations

---

## Responsable

Peut :

gérer son département

voir les membres concernés

---

## Pasteur

Accès complet.

---

## Super Administrateur

Contrôle total.

---

# 13. Parcours utilisateur

## Cas 1

Découverte

Accueil

↓

À propos

↓

Programmes

↓

Contact

↓

Visite

---

## Cas 2

Faire un don

Accueil

↓

Faire un don

↓

Choix du montant

↓

Paiement

↓

Confirmation

---

## Cas 3

Regarder une prédication

Accueil

↓

Prédications

↓

Recherche

↓

Lecture

---

# 14. Exigences techniques

Framework

Next.js 15

App Router

---

Langage

TypeScript

---

UI

Tailwind CSS

shadcn/ui

---

Animations

Framer Motion

---

Base de données (future)

PostgreSQL

Prisma

---

Authentification

Auth.js

---

Stockage

Supabase Storage

---

# 15. Responsive

Desktop

Laptop

Tablet

Mobile

Toutes les pages doivent être parfaitement adaptatives.

---

# 16. Performance

Objectifs Lighthouse

Performance

95+

Accessibility

95+

SEO

95+

Best Practices

95+

---

# 17. SEO

Chaque page possède :

Title

Description

Open Graph

Twitter Card

Schema.org lorsque pertinent

---

# 18. Accessibilité

Navigation clavier

Contraste élevé

Labels

ARIA

Images avec attribut alt

---

# 19. Sécurité

Validation serveur

Protection CSRF

Sanitisation

Headers de sécurité

Protection contre les injections

---

# 20. Critères d'acceptation

Le projet sera considéré comme terminé lorsque :

✓ Toutes les pages publiques sont disponibles.

✓ Le design est responsive.

✓ Les performances sont supérieures à 95 sur Lighthouse.

✓ Les images sont optimisées.

✓ Le référencement de base est en place.

✓ Les animations sont fluides.

✓ Le code respecte les conventions du projet.

✓ Le site est prêt à accueillir les futures fonctionnalités du Dashboard Admin sans refonte majeure.

---

# 21. Évolutions prévues

- Dashboard d'administration
- Gestion des visiteurs
- Gestion des fidèles
- Gestion des cellules
- Gestion des présences
- Gestion financière
- Gestion documentaire
- Portail membre
- Notifications (Email, SMS, WhatsApp)
- Application mobile
- Intelligence artificielle pour les rapports et statistiques
- Plateforme SaaS multi-tenant

---

# 22. Vision finale

Construire une plateforme de référence pour les églises francophones, combinant :

- un site vitrine moderne,
- un portail membre,
- un tableau de bord d'administration,
- des outils de gestion complets,
- une architecture SaaS évolutive,
- et des fonctionnalités d'intelligence artificielle pour accompagner les responsables dans la gestion et le développement de leur communauté.