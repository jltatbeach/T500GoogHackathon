---
name: Regenerative Community System
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#3f493e'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#707a6e'
  outline-variant: '#bfcabb'
  surface-tint: '#0f6d2d'
  primary: '#0b6b2c'
  on-primary: '#ffffff'
  primary-container: '#2f8542'
  on-primary-container: '#fafff5'
  inverse-primary: '#83da8c'
  secondary: '#ad3309'
  on-secondary: '#ffffff'
  secondary-container: '#ff6e43'
  on-secondary-container: '#641700'
  tertiary: '#406455'
  on-tertiary: '#ffffff'
  tertiary-container: '#587d6e'
  on-tertiary-container: '#fafffa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9ef7a6'
  primary-fixed-dim: '#83da8c'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0a00'
  on-secondary-fixed-variant: '#862200'
  tertiary-fixed: '#c4ebd9'
  tertiary-fixed-dim: '#a8cfbd'
  on-tertiary-fixed: '#002116'
  on-tertiary-fixed-variant: '#2a4d40'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 20px
  sidebar-width: 280px
  max-content-width: 1200px
---

## Brand & Style
This design system is built for the intersection of community-led action and regenerative finance. The brand personality is **nurturing, transparent, and grounded**. It avoids the frantic energy of traditional finance in favor of a "slow-tech" approach that emphasizes long-term ecological and social health.

The visual style is a blend of **Modern Minimalism** and **Tactile Organicism**. It uses heavy whitespace to reduce cognitive load and creates a "sanctuary" feel through warm, earthy tones. The UI should evoke the emotional response of walking through a well-tended garden: organized, breathy, and full of life.

## Colors
The palette is rooted in the natural world. 
- **Primary (Regenerative Green):** Used for growth-oriented actions, success states, and primary brand touchpoints.
- **Secondary (Clay):** A warm accent used sparingly for highlights or alternative calls to action to provide earthy contrast.
- **Backgrounds:** We avoid "pure" white (#FFFFFF) for large surfaces, opting instead for **Cream (#FDFCF8)** and **Soft Beige (#F9F7F2)** to reduce eye strain and feel more organic.
- **Neutrals:** Grays are infused with a hint of olive to maintain warmth across borders and secondary text.

## Typography
We use **Outfit** for headings to provide a friendly, geometric, and modern character. Its wide apertures and soft curves align with the "roundness" of the brand. For functional content and long-form reading, **Inter** provides high legibility and a neutral, trustworthy foundation.

All body text should maintain a generous line height (minimum 1.5) to ensure the interface feels "low-pressure" and easy to scan.

## Layout & Spacing
The design system utilizes a **Fixed-Fluid Hybrid** model. Navigation is anchored by a **persistent left sidebar** on desktop (280px), while the main content area occupies a fluid space up to a maximum width of 1200px to prevent line lengths from becoming unreadable.

- **Desktop:** 12-column grid within the content area.
- **Tablet:** 8-column grid; sidebar collapses into a drawer or bottom bar.
- **Mobile:** 4-column grid with 16px horizontal margins.

Spacing follows an 8px rhythmic scale. Use "extra-large" vertical spacing (64px+) between major sections to emphasize the "generous white space" philosophy.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Ambient Shadows**. Instead of harsh black shadows, we use "Botanical Shadows"—soft, diffused blurs tinted with a deep forest green or warm umber (#2F352F at 5-10% opacity).

- **Level 0 (Floor):** The Cream background (#FDFCF8).
- **Level 1 (Cards):** Pure white (#FFFFFF) surfaces with a subtle 1px border in a pale beige and a soft, wide-spread shadow.
- **Level 2 (Modals/Popovers):** Higher elevation with a more pronounced shadow and a backdrop blur (glassmorphism) applied to the obscured content to maintain a sense of space.

## Shapes
The shape language is defined by high-radius curves, reflecting the organic forms found in nature. There are no sharp corners in the design system.

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px).
- **Content Containers (Cards):** 1rem (16px).
- **Large Layout Blocks:** 1.5rem (24px).
- **Interactive Indicators (Pills/Chips):** Always fully rounded (pill-shaped).

## Components

### Buttons & Inputs
Buttons feature a subtle gradient-less fill of **Regenerative Green** with white text. Hover states should involve a gentle "lift" (increased shadow) rather than a dramatic color shift. Inputs use a thick 2px border in a soft neutral, turning green only on focus.

### Cards
Cards are the primary vehicle for content. They should have a 1px border (color: #E6E2D3) and a soft shadow. Padding within cards should be generous (24px to 32px) to prevent information density from feeling overwhelming.

### Navigation (Sidebar)
The persistent left sidebar uses a "ghost" styling approach. Active states are indicated by a soft sage-green background highlight and a thick vertical pill-shaped indicator on the left.

### Status Indicators
- **Progress Bars:** Use a thick, rounded track (8px height) with a smooth green fill.
- **Checkmarks:** Enclosed in a circular "leaf" icon to reinforce the nature-inspired theme.
- **Chips:** Used for tagging community projects, employing low-saturation earth tones (e.g., dusty blue, pale ochre) to distinguish categories without creating visual noise.

### Feedback Loops
When users complete a "regenerative" action (like a donation or vote), use subtle micro-animations of growth (e.g., an icon blooming) to provide an emotional reward.