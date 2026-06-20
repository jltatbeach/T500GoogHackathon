---
name: Nocturnal Growth
colors:
  surface: '#121412'
  surface-dim: '#121412'
  surface-bright: '#383a37'
  surface-container-lowest: '#0d0f0d'
  surface-container-low: '#1a1c1a'
  surface-container: '#1e201e'
  surface-container-high: '#292a28'
  surface-container-highest: '#333533'
  on-surface: '#e2e3df'
  on-surface-variant: '#bfcabb'
  inverse-surface: '#e2e3df'
  inverse-on-surface: '#2f312e'
  outline: '#899487'
  outline-variant: '#3f493e'
  surface-tint: '#83da8c'
  primary: '#83da8c'
  on-primary: '#003913'
  primary-container: '#2f8542'
  on-primary-container: '#fafff5'
  inverse-primary: '#0f6d2d'
  secondary: '#f4bb92'
  on-secondary: '#4a280a'
  secondary-container: '#653d1e'
  on-secondary-container: '#e1aa82'
  tertiary: '#becca3'
  on-tertiary: '#293417'
  tertiary-container: '#6d7a57'
  on-tertiary-container: '#fefff1'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9ef7a6'
  primary-fixed-dim: '#83da8c'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531e'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#f4bb92'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#653d1e'
  tertiary-fixed: '#dae8be'
  tertiary-fixed-dim: '#becca3'
  on-tertiary-fixed: '#141f05'
  on-tertiary-fixed-variant: '#3f4b2c'
  background: '#121412'
  on-background: '#e2e3df'
  surface-variant: '#333533'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
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
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system embodies a "Forest at Night" aesthetic, shifting the focus from high-noon growth to the quiet, restorative energy of a nocturnal ecosystem. It targets community organizers, environmentalists, and sustainable developers who require a workspace that reduces eye strain during deep work while maintaining a connection to the natural world.

The style is a blend of **Minimalism** and **Glassmorphism**. It utilizes expansive negative space to signify breathing room and uses translucent, blurred layers to mimic the depth of a dense canopy. The emotional response is one of calm, focused resilience—replacing the clinical coldness of typical dark modes with organic warmth and tactile depth.

## Colors
The palette is rooted in a "Forest-Black" (`#121412`), a deep charcoal with a subtle green undertone to prevent the UI from feeling "dead." 

- **Primary (Regenerative Green):** Used for calls-to-action and active states, signifying life and progress.
- **Secondary (Earthy Umber):** A warm highlight color used for accents that need to feel grounded and organic.
- **Tertiary (Moss):** A muted, desaturated green for secondary UI elements and metadata.
- **Surface Strategy:** Layers are built using slightly lighter variants of the forest-black to indicate elevation, ensuring that contrast is maintained through tonal shifts rather than harsh lines.

## Typography
The typography system balances modern structural integrity with friendly, contemporary curves. 

- **Headlines:** Uses **Manrope** for a clean, balanced, and professional look that feels authoritative yet modern.
- **Body:** **Be Vietnam Pro** provides an approachable and warm reading experience, essential for long-form community updates.
- **Labels/Technical:** **JetBrains Mono** is introduced sparingly for tags, timestamps, and data points to provide a subtle "technical/scientific" layer to the regenerative theme.

Text contrast is carefully managed: Primary text uses a high-visibility off-white (`#f8f9f8`), while secondary text uses a desaturated sage to maintain hierarchy without visual noise.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on an 8px base unit. 

- **Desktop:** 12-column grid with generous 48px outer margins to evoke a sense of premium "breathing room."
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing is used to create "clumped" ecosystems of information. Elements related to the same topic should have tighter internal spacing (8px-16px), while distinct sections are separated by large rhythmic gaps (64px-80px) to simulate natural clearings.

## Elevation & Depth
In this dark UI, depth is communicated through **Tonal Layers** and **Backdrop Blurs** rather than traditional black shadows.

1.  **Level 0 (Base):** Forest-Black (`#121412`).
2.  **Level 1 (Cards/Surfaces):** A slightly lifted grey-green (`#1a1d1a`).
3.  **Level 2 (Modals/Popovers):** Semi-transparent surfaces (80% opacity) with a 20px backdrop blur to create a frosted glass effect that retains the background's organic hues.
4.  **Highlights:** Instead of drop shadows, use a 1px inner border (stroke) with a low-opacity "Primary Green" to simulate a top-down light source catching the edge of an organic object.

## Shapes
The shape language is **Rounded**, avoiding sharp "aggressive" corners in favor of the softer geometry found in nature (stones, leaves, seeds). 

- **Standard Elements:** 0.5rem (8px) radius for buttons and input fields.
- **Containers/Cards:** 1rem (16px) radius to create a soft, inviting frame.
- **Feature Elements:** Use 1.5rem (24px) for prominent hero sections or specific "organic" callouts.

## Components
- **Buttons:** Primary buttons are solid `#2f8542` with white text. Secondary buttons use a ghost style with the primary green border and a subtle hover fill.
- **Chips/Tags:** Small, pill-shaped elements using the **Label-sm** typography. Use desaturated Earth Umber for category tags and Moss Green for status tags.
- **Input Fields:** Darker than the card surface with a 1px border that glows slightly (low-spread outer glow) when focused in Primary Green.
- **Lists:** Clean, borderless rows separated by subtle 1px dividers in a very dark forest-grey.
- **Cards:** Utilize the "Level 1" surface color. Ensure images within cards have a slight desaturation to blend harmoniously with the dark theme.
- **Progress Bars:** Use a "Growth" metaphor—a thin track in Forest-Black with a Primary Green fill that has a subtle gradient trailing into Earthy Umber.