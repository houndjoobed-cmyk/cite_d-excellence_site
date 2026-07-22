---
name: Excellence Heritage
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5d3f3b'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#926f69'
  outline-variant: '#e7bdb6'
  surface-tint: '#c00000'
  primary: '#930000'
  on-primary: '#ffffff'
  primary-container: '#c00000'
  on-primary-container: '#ffcdc5'
  inverse-primary: '#ffb4a8'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#5b4300'
  on-tertiary: '#ffffff'
  tertiary-container: '#795900'
  on-tertiary-container: '#ffd272'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdf9e'
  tertiary-fixed-dim: '#f1bf4c'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system embodies a "Contemporary Cathedral" aesthetic—blending the weight of tradition with the airy precision of modern luxury. It is designed to evoke a sense of divine excellence, institutional trust, and warm accessibility. 

The visual language draws heavily from **Corporate Modernism** and **Minimalism**, utilizing expansive whitespace to create a "gallery-like" environment for spiritual content. This is accented with **Glassmorphism** to represent transparency and light, while subtle metallic gradients provide a tactile, premium feel without appearing dated. The overall emotional response should be one of peace, high-caliber professionalism, and aspiration.

## Colors
The palette is rooted in the rich symbolism of the brand’s heritage. 
- **Primary Red (#C00000):** Used sparingly for high-impact call-to-actions, vital symbols, and core branding. It represents passion and sacrifice.
- **Gold Spectrum (#D4AF37 to #A67C00):** Utilized primarily for accents, iconography, and linear gradients. It signifies excellence and the "City of Gold."
- **Neutrals:** The background strategy uses an off-white foundation (#FAFAFA) to reduce eye strain compared to pure white, while #F6F6F6 provides subtle depth for container backgrounds.
- **Text:** High-contrast charcoal (#1A1A1A) ensures legibility while maintaining a softer edge than pure black.

## Typography
The typography strategy pairs the geometric authority of **Montserrat** for headings with the systematic clarity of **Inter** for long-form reading and functional UI. 

Headings should be treated with generous letter spacing (tracking) to enhance the luxury feel. Display sizes should focus on short, impactful statements. For body text, a slightly increased line height (1.6) is used to ensure the layout feels "breathable" and avoids the density common in standard corporate designs.

## Layout & Spacing
The layout follows a **Fluid Grid** model with strict adherence to an 8px spatial scale. 
- **Desktop:** A 12-column grid with 64px outer margins. Content is centered with a max-width of 1280px to prevent excessive line lengths on ultra-wide displays.
- **Mobile:** A 4-column grid with 20px margins.
- **Rhythm:** Vertical rhythm is maintained by using large, purposeful gaps (e.g., 120px between major sections) to emphasize the minimalist, premium aesthetic. Elements should never feel crowded; when in doubt, increase the whitespace.

## Elevation & Depth
Depth is communicated through "soft layering" rather than harsh shadows:
- **Level 1 (Base):** Primary background (#FAFAFA).
- **Level 2 (Cards):** White (#FFFFFF) surfaces with a 24px blur, 4% opacity shadow (0px 8px 24px rgba(0,0,0,0.04)).
- **Level 3 (Floating/Glass):** Backdrop blur (20px) on semi-transparent white (80% opacity) for navigation bars and modal overlays. This creates a "frosted glass" effect that feels high-tech and ethereal.
- **Accents:** Linear gradients using Dark Gold to Gold are reserved for thin borders (1px) on glass elements to simulate light catching a metallic edge.

## Shapes
The shape language is defined by a consistent 16px (1rem) radius. This "Rounded" approach softens the corporate grid, making the brand feel more welcoming and human. 
- **Standard UI (Buttons, Inputs):** 16px radius.
- **Feature Cards:** 24px (rounded-lg) to emphasize their importance.
- **Interactive Indicators:** Fully rounded (pill) shapes for chips and status indicators.

## Components
- **Buttons:** Primary buttons use a Gold-to-Dark Gold linear gradient with white text. Secondary buttons use a transparent background with a 1px Gold border. Hover states should include a subtle upward lift (elevation increase).
- **Glass Cards:** Used for testimonials or featured scriptures. These should have a `backdrop-filter: blur(12px)`, a semi-transparent white fill, and a 1px border at 10% Gold opacity.
- **Inputs:** Minimalist fields with 16px rounding. Use a light gray border (#E0E0E0) that transitions to Gold on focus.
- **Lists:** Clean, borderless list items with generous padding (16px) and Gold-tinted icons.
- **Navigation:** A floating glass header that sits at the top of the viewport, using a blur effect to show content scrolling beneath it, reinforcing the Apple-inspired transparency.