# Site d'Invitation de Mariage - Ahmed & Lyna

## Vue d'ensemble
Site web d'invitation de mariage dynamique et élégant pour Ahmed et Lyna, célébrant leur mariage le 29 décembre 2025 à la Salle des fêtes EL MOUDAYNA, TICHY.

## État actuel
**Dernière mise à jour**: 19 novembre 2025
- ✅ Schéma de données RSVP configuré avec PostgreSQL
- ✅ Tous les composants React frontend créés
- ✅ Design system configuré (Playfair Display + Poppins, couleurs rose/mariage)
- ✅ Images générées pour le hero et la galerie photo
- ⏳ Backend API en cours d'implémentation

## Informations du mariage
- **Mariés**: Ahmed et Lyna
- **Parents du marié**: Saadi (père), Yasmina (mère)
- **Date**: 29 décembre 2025
- **Lieu**: Salle des fêtes EL MOUDAYNA, TICHY

## Architecture du projet

### Frontend (React + TypeScript)
- **Pages**: Home (`client/src/pages/Home.tsx`)
- **Composants principaux**:
  - `OpeningAnimation`: Animation d'ouverture élégante de carte (4s, skippable)
  - `HeroSection`: Section hero avec image de fond, noms des mariés, date, lieu
  - `ParentsSection`: Présentation des mariés et leurs parents
  - `CountdownTimer`: Compte à rebours en temps réel jusqu'au 29 décembre 2025
  - `EventDetails`: Détails de l'événement avec carte Google Maps intégrée
  - `PhotoGallery`: Galerie de 7 photos avec lightbox et hover effects
  - `RsvpForm`: Formulaire de confirmation avec validation Zod
  - `Footer`: Footer élégant minimaliste

### Backend (Express + PostgreSQL)
- **API Routes** (`server/routes.ts`):
  - `POST /api/rsvp`: Créer une confirmation de présence
  - `GET /api/rsvp`: Récupérer toutes les confirmations (pour futur panel admin)
- **Storage** (`server/storage.ts`): Interface DatabaseStorage utilisant Drizzle ORM
- **Database**: PostgreSQL avec Neon, migrations via `npm run db:push`

### Schéma de données (`shared/schema.ts`)
```typescript
rsvps {
  id: varchar (UUID)
  fullName: text (requis)
  email: text (requis, validé)
  phone: text (optionnel)
  numberOfGuests: integer (1-10, requis)
  dietaryRestrictions: text (optionnel)
  message: text (optionnel)
  createdAt: timestamp
}
```

### Design System
- **Typographie**:
  - Primaire: Playfair Display (serif) pour titres et noms
  - Secondaire: Poppins (sans-serif) pour texte et UI
- **Couleurs**: Palette rose/mariage (primary: 340° hue)
- **Espacement**: Tailwind spacing (4, 6, 8, 12, 16, 20, 24)
- **Animations**: Framer Motion pour animations fluides au scroll

## Fonctionnalités implémentées
1. ✅ Animation d'ouverture élégante avec bouton skip
2. ✅ Hero section full-screen avec overlay sur image romantique
3. ✅ Section parents avec initiales circulaires et icône cœur
4. ✅ Compte à rebours dynamique (jours, heures, minutes, secondes)
5. ✅ Carte Google Maps interactive pour localisation
6. ✅ Galerie photo avec 7 images, hover effects, et lightbox
7. ✅ Formulaire RSVP avec validation temps réel
8. ✅ Animations au scroll avec Framer Motion
9. ✅ Design responsive (mobile, tablette, desktop)
10. ✅ SEO optimisé avec meta tags

## Commandes disponibles
- `npm run dev`: Démarrer le serveur dev (Express + Vite)
- `npm run db:push`: Pousser le schéma vers la base de données
- `npm run db:push --force`: Forcer la synchronisation du schéma

## Intégrations
- PostgreSQL database (Neon)
- Google Maps Embed API
- Framer Motion pour animations
- React Hook Form + Zod pour validation formulaires
- TanStack Query pour gestion d'état serveur

## Prochaines étapes
1. Implémenter les routes API backend pour RSVP
2. Connecter le formulaire au backend
3. Tester le parcours complet utilisateur
4. Panel admin optionnel pour voir les RSVPs
