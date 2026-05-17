---
name: Paranormal Retro-Grid
colors:
  surface: "#121317"
  surface-dim: "#121317"
  surface-bright: "#38393e"
  surface-container-lowest: "#0d0e12"
  surface-container-low: "#1a1b20"
  surface-container: "#1e1f24"
  surface-container-high: "#292a2e"
  surface-container-highest: "#343439"
  on-surface: "#e3e2e8"
  on-surface-variant: "#baccb1"
  inverse-surface: "#e3e2e8"
  inverse-on-surface: "#2f3035"
  outline: "#84967d"
  outline-variant: "#3b4b36"
  surface-tint: "#00e615"
  primary: "#edffe2"
  on-primary: "#003a01"
  primary-container: "#2aff2a"
  on-primary-container: "#007104"
  inverse-primary: "#006e04"
  secondary: "#e5b5ff"
  on-secondary: "#4e0078"
  secondary-container: "#a100f0"
  on-secondary-container: "#f7e1ff"
  tertiary: "#fff8f7"
  on-tertiary: "#5c1900"
  tertiary-container: "#ffd4c6"
  on-tertiary-container: "#b03700"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#76ff64"
  primary-fixed-dim: "#00e615"
  on-primary-fixed: "#002200"
  on-primary-fixed-variant: "#005302"
  secondary-fixed: "#f4d9ff"
  secondary-fixed-dim: "#e5b5ff"
  on-secondary-fixed: "#30004b"
  on-secondary-fixed-variant: "#7000a8"
  tertiary-fixed: "#ffdbcf"
  tertiary-fixed-dim: "#ffb59c"
  on-tertiary-fixed: "#390c00"
  on-tertiary-fixed-variant: "#832700"
  background: "#121317"
  on-background: "#e3e2e8"
  surface-variant: "#343439"
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.2"
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.4"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
  container-max: 1200px
---

## Brand & Style

The design system is built on a "Spooky-Cute" aesthetic that blends the nostalgia of 80s analog horror with modern, high-fidelity UI patterns. It targets an adventurous audience interested in urban legends and the paranormal, evoking a sense of "digital exorcism"—where technical precision meets supernatural chaos.

The visual style is a hybrid of **Retro-Vaporwave** and **Glassmorphism**. It utilizes dark, ink-like backgrounds to represent the void, contrasted with vibrant, glowing UI elements that mimic CRT phosphors. To achieve the "Spooky-Cute" balance, we pair large, friendly rounded containers with razor-sharp iconography and glitch-inspired textures. Every interaction should feel like operating a piece of haunted, high-end hardware.

## Colors

The palette is centered around **"Ecto-Green"** (Primary), a high-energy fluorescent green used for vital tracking data and active supernatural signatures. **"Psychic Purple"** (Secondary) serves as the mystical accent for exploration and discovery features, while **"Warning Orange"** (Tertiary) is reserved for high-danger zones and system alerts.

The background is not a true black but a **"Deep Void Navy"** (#08090D), providing enough depth for subtle noise textures and neon glows to vibrate against. All colors should be applied with high saturation to ensure they pop against the dark canvas, mimicking the light emission of a cathode-ray tube.

## Typography

This design system utilizes a tiered typographic approach to reinforce the technical/horror narrative.

- **Space Grotesk** is used for headlines; its geometric, slightly eccentric curves provide the "modern" edge to the spooky theme.
- **Geist** handles the body copy, offering a clean, technical readability that grounds the more expressive elements.
- **JetBrains Mono** is the "system" font, used for labels, coordinates, and data-heavy readouts to evoke the feeling of a terminal or a spirit-hunting device.

For an authentic VHS feel, headlines should occasionally employ a 1px horizontal offset (glitch effect) in secondary colors during hover states.

## Layout & Spacing

The layout follows a **Strict 8px Grid**, but with a twist: certain "haunted" elements may break the grid by 2-4 pixels to create a subtle sense of unease.

The system uses a **12-column fluid grid** for desktop and a **4-column grid** for mobile. Margins are generous to allow the dark background to breathe, making the glowing UI elements feel like they are floating in space.

Containers should use "Safe Zone" padding (minimum 24px) to ensure that the heavy border-glows do not interfere with content legibility.

## Elevation & Depth

Depth in this design system is achieved through **Luminescence and Transparency** rather than traditional shadows.

1.  **Ghostly Layers:** Surfaces use semi-transparent glassmorphism (10-20% opacity) with a heavy backdrop blur (20px+).
2.  **Neon Diffusion:** Instead of black shadows, "Elevated" elements (like primary action buttons or active ghost cards) use an outer glow matching their primary or secondary color. The glow should be soft, with a 15-20px spread at low opacity.
3.  **Scanline Overlays:** The highest elevation level (modals and alerts) includes a subtle, animated CRT scanline pattern and a grain texture to signify "Priority Signal."

## Shapes

The design system embraces a "Soft-Sharp" contrast.

- **Containers & Cards:** Use a **Rounded (0.5rem)** base. This makes the UI feel approachable and "cute," softening the intensity of the horror theme.
- **Interactive Elements:** Buttons and inputs follow the same rounded language but feature a sharp, 1px high-contrast inner stroke to maintain a technical feel.
- **Icons & Pointers:** Icons must be **Razor Sharp** and geometric. The juxtaposition of soft containers and needle-sharp iconography creates a distinctive visual tension.

## Components

### Buttons

Primary buttons are solid "Ecto-Green" with black text. They feature a "flicker" animation on hover. Secondary buttons are ghost-style (transparent with a 1px glow-border).

### Paranormal Cards

Used for ghost sightings. These feature a heavy backdrop blur and a grain texture overlay. The header of the card uses the Mono font for "Spirit Type" and "Danger Level."

### Input Fields

Inputs are dark, recessed rectangles with a 1px bottom border that glows when focused. The cursor should be a solid block, blinking in the primary color.

### Glitch-Chips

Small badges for tags (e.g., "Poltergeist," "Abandoned"). These have slightly irregular borders or a subtle "chromatic aberration" effect on the text.

### The Map Interface

The core component. The map itself should be desaturated (dark mode), with "Spirit Spots" appearing as pulsating neon orbs. When tapped, the orbs should "glitch" into a detailed info-view.
