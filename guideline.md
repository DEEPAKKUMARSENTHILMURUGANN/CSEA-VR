# VISUAL PRESERVATION CONTRACT — HIGHEST PRIORITY

This project is undergoing an ARCHITECTURAL REFACTOR, NOT A UI REDESIGN.

The existing visual appearance is considered APPROVED and MUST be preserved.

During restructuring, the following must remain visually and behaviorally equivalent:

- Colors
- Typography
- Font sizes
- Font weights
- Spacing
- Margins
- Padding
- Borders
- Border radius
- Shadows
- Gradients
- Backgrounds
- Images
- Image dimensions
- Image positioning
- Icons
- Button appearance
- Navigation appearance
- Card appearance
- Section heights
- Layout structure
- Responsive behavior
- Animations
- Transitions
- Hover effects
- Scroll effects
- Parallax effects
- 3D/VR presentation
- Canvas/WebGL presentation
- Loading states
- Modal appearance
- Existing visual effects

## DO NOT

DO NOT:

- redesign the UI
- modernize the UI
- improve the UI
- change colors
- change typography
- replace fonts
- replace icons
- redesign components
- simplify the layout visually
- change spacing
- change animation timing
- remove animations
- replace CSS with Tailwind
- replace CSS with CSS Modules
- introduce a new styling system
- "clean up" CSS by changing its visual behavior
- change responsive breakpoints unless required to preserve existing behavior
- replace existing components with visually different components
- invent new UI
- make the application "more modern"
- make the application "more minimal"
- make the application "more polished"

## CSS IS SOURCE OF TRUTH

During HTML → JSX migration, existing CSS should be preserved whenever possible.

If:

existing HTML + existing CSS

produces the current appearance,

then:

React JSX + existing CSS

should produce the same appearance.

Do NOT rewrite existing CSS merely because it is not considered "clean".

CSS restructuring is allowed ONLY when necessary to make the existing styles work correctly with React.

Even then, the rendered appearance must remain unchanged.

## HTML → JSX MEANS STRUCTURAL CONVERSION

The goal is:

HTML
+
existing CSS
+
existing JS behavior

↓

React JSX
+
existing CSS
+
React-compatible behavior

NOT:

HTML
→
new React design

## VISUAL REGRESSION RULE

Before modifying a page, understand its current appearance.

After converting it to React, verify that the page visually matches the original.

If the new implementation looks different, treat that as a BUG.

Do not "fix" the difference by creating a new design.

Fix the implementation so that it matches the original.

## PRESERVE CLASS NAMES

Existing CSS class names should be preserved whenever practical.

For example:

Existing:

<div class="hero-section">

Prefer:

<div className="hero-section">

NOT:

<div className="hero-container-modern">

Do not rename classes unnecessarily.

## PRESERVE DOM STRUCTURE

The existing DOM structure should be preserved as closely as practical.

Do not reorganize elements merely for architectural cleanliness if doing so changes CSS behavior.

CSS selectors may depend on:

- nesting
- sibling relationships
- child selectors
- nth-child
- pseudo-elements
- positioning contexts

Therefore, changing DOM structure can cause visual regressions.

## PRESERVE IDs

Do not rename or remove existing IDs unless there is a strong technical reason.

Existing JavaScript may depend on:

document.getElementById()

querySelector()

anchors

CSS selectors

third-party libraries

animations

## PRESERVE JAVASCRIPT BEHAVIOR

When converting imperative JavaScript to React:

Preserve the same:

- interactions
- timing
- animations
- event behavior
- state transitions
- keyboard behavior
- scroll behavior
- mouse behavior

Convert the implementation, not the behavior.

Example:

Old:

element.addEventListener("click", handler)

New:

onClick={handler}

The behavior should remain the same.

## PRESERVE ANIMATIONS

Animations are part of the existing design.

Do not remove or simplify:

- GSAP
- ScrollTrigger
- CSS animations
- CSS transitions
- requestAnimationFrame
- canvas animations
- WebGL animations
- Three.js animations
- scroll animations
- parallax effects

If an animation uses direct DOM manipulation, use refs or an appropriate React lifecycle mechanism rather than removing the animation.

## NO NEW DESIGN SYSTEM

Do not introduce:

- Tailwind
- shadcn
- Material UI
- Chakra
- Bootstrap
- a new component library

unless explicitly requested.

The existing styling system is the project's design system.

## NO UNREQUESTED DEPENDENCY CHANGES

Do not:

- upgrade packages
- replace libraries
- install UI libraries
- replace animation libraries
- replace routing libraries
- replace state libraries

unless explicitly requested.

## REFACTORING SUCCESS CRITERIA

The refactor is successful if:

BEFORE:

Existing HTML
+
Existing CSS
+
Existing JS

AFTER:

React JSX
+
Existing CSS
+
Equivalent React behavior

And:

Visual appearance ≈ identical
Behavior ≈ identical
Architecture = significantly better

A structurally cleaner project with a different visual appearance is considered a FAILED refactor.