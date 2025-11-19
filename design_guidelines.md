# Design Guidelines: Ahmed & Lyna Wedding Invitation Website

## Design Approach
**Reference-Based**: Drawing inspiration from luxury wedding websites like Joy, Zola, and Minted, combined with Apple's elegant minimalism. The design emphasizes emotional impact through refined aesthetics, generous whitespace, and purposeful animations that enhance rather than distract from the celebration.

## Typography
- **Primary Font**: Playfair Display (serif) for romantic headings and couple names
- **Secondary Font**: Poppins (sans-serif) for body text, details, and UI elements
- **Hierarchy**:
  - Hero names: 4xl to 6xl, Playfair Display, font-normal
  - Section headings: 3xl to 4xl, Playfair Display
  - Subheadings: xl to 2xl, Poppins, font-medium
  - Body text: base to lg, Poppins, font-normal
  - Details/captions: sm to base, Poppins, font-light

## Layout System
**Spacing Units**: Use Tailwind spacing of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 to gap-12
- Content containers: max-w-6xl mx-auto px-6

## Core Sections & Components

### 1. Opening Animation Overlay
Full-screen animated invitation card reveal on page load (3-4 seconds)
- Envelope opening animation or card unfolding effect
- Fade to main content after animation completes
- Skip button in corner for return visitors

### 2. Hero Section
**Layout**: Full viewport height (min-h-screen), centered content
- Large romantic background image (soft-focused venue or floral photography)
- Blurred overlay container with gradient backdrop
- Centered vertical stack:
  - Decorative flourish or monogram (SVG ornament)
  - "Ahmed & Lyna" in Playfair Display, 5xl to 7xl
  - Elegant separator line with decorative element
  - Date: "29 Décembre 2025" in smaller elegant text
  - Venue: "Salle des fêtes EL MOUDAYNA, TICHY"
  - Primary CTA button with blurred background: "RSVP" or "Confirmer votre présence"

### 3. Story/Parents Section
**Layout**: Two-column on desktop (md:grid-cols-2), single on mobile
- Left: Ahmed's side - Photo (circular or ornate frame), name, parents (Saadi & Yasmina)
- Right: Lyna's side - Matching photo treatment, name, parents
- Decorative heart or infinity symbol connecting the columns (desktop only)
- Elegant divider between columns

### 4. Countdown Timer
**Layout**: Full-width section with centered content
- Large numerical display in grid (4 columns: Days, Hours, Minutes, Seconds)
- Each unit in decorative card with:
  - Large number (4xl to 6xl, Playfair Display)
  - Label below (uppercase, tracking-wide, Poppins)
- Decorative frame around entire countdown

### 5. Event Details
**Layout**: Asymmetric two-column (40/60 split on desktop)
- Left column: Decorative timeline/schedule with icons
  - Ceremony time
  - Reception details
  - Dress code (if applicable)
- Right column: Embedded Google Maps (rounded corners, shadow)
- Address and directions text below map

### 6. Photo Gallery
**Layout**: Masonry grid (2 columns mobile, 3-4 desktop)
- Mix of portrait and landscape images
- Hover effect: subtle scale and overlay with heart icon
- Lightbox modal on click for full-size viewing
- 6-12 curated photos of the couple

### 7. RSVP Form
**Layout**: Centered form container (max-w-2xl)
- Elegant card design with decorative border
- Form fields:
  - Full name (required)
  - Email (required, validated)
  - Phone number (optional)
  - Number of guests (dropdown: 1-5)
  - Dietary restrictions (textarea)
  - Message to couple (textarea, optional)
- Submit button: prominent, blurred background when over image
- Success message with checkmark animation
- Form validation with inline error messages

### 8. Footer
**Layout**: Centered, minimal
- Decorative divider
- "Ahmed & Lyna | 29.12.2025" in elegant typography
- Small heart icon
- Optional: Social sharing buttons (understated)

## Component Library

**Buttons**:
- Primary: Rounded (rounded-full), elegant border, blurred background when over images, hover lift effect
- Text sufficient, no complex styling needed

**Cards**:
- Soft shadows, rounded corners (rounded-2xl)
- Subtle border or gradient background
- Generous padding (p-8 to p-12)

**Decorative Elements**:
- Use Heroicons for functional icons (calendar, map pin, heart)
- Floral/ornamental SVG flourishes at section breaks
- Elegant divider lines with center ornaments

**Forms**:
- Input fields: Rounded borders, focus states with elegant outline
- Floating labels or top-aligned labels in Poppins
- Consistent spacing (gap-6 between fields)

## Images

**Required Images**:
1. **Hero Background**: Romantic, soft-focused image - venue exterior, floral arrangement, or elegant architectural detail. Should support text overlay with blurred container.
2. **Couple Portraits**: 2 individual photos (circular crop) for parents section, 6-12 candid/portrait photos for gallery
3. **Decorative Elements**: Floral dividers, ornamental flourishes (can use SVG from free resources)

The website includes a large hero image with centered content overlay.

## Animations
**Strategic Use Only**:
- Opening card animation (one-time, can be skipped)
- Countdown timer: gentle pulse on numbers changing
- Scroll-triggered fade-ins for sections (subtle, once)
- Photo gallery: gentle hover scale (1.05x)
- Form submission: checkmark success animation
- NO parallax, NO continuous animations, NO distracting effects

## Accessibility & Performance
- Sufficient contrast ratios for text over images
- Focus states on all interactive elements
- Semantic HTML structure
- Lazy loading for gallery images
- Mobile-first responsive breakpoints