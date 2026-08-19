


AI Coding Agent Rules — React Refactoring & Visual Preservation
1. Primary Objective
You are working on an existing React project.

Your highest priority is:

Improve or refactor the implementation WITHOUT changing the existing visual design.

The existing UI is the source of truth.

Visual preservation > code elegance > refactoring speed.

Never redesign the UI unless explicitly requested.

Never "improve" the visual design based on your own preferences.

2. Mandatory Workflow
For every task, follow this loop:

INSPECT
  ↓
UNDERSTAND
  ↓
IDENTIFY ROOT CAUSE
  ↓
MAKE ONE MINIMAL CHANGE
  ↓
RUN / BUILD
  ↓
VISUALLY VERIFY
  ↓
COMPARE
  ↓
FIX IF NECESSARY
  ↓
REPEAT
Do NOT make many speculative changes at once.

Do NOT stop after editing code. The result must be verified.

3. Before Modifying Anything
Inspect the complete relevant implementation:

Target React component

Imported CSS files

Global CSS

Parent/layout components

Tailwind configuration

Existing reusable components

JavaScript behavior

Animations

Routes

Assets

Responsive rules

Build a mental map:

React Component
      ↓
Component CSS
      ↓
Global CSS
      ↓
Tailwind Utilities
      ↓
Parent/Layout Styles
      ↓
Browser Defaults
Determine which layer controls each visual property before changing it.

4. Never Guess the Cause
When something looks wrong, do NOT immediately rewrite the CSS.

Check:

Is Tailwind generating the expected class?

Is another CSS selector overriding it?

Is the class actually present on the element?

Is the parent grid/flex layout correct?

Is the containing block correct?

Is position affecting it?

Is transform affecting it?

Is overflow clipping it?

Is z-index affecting it?

Is an animation modifying its transform?

Is responsive CSS changing it?

Is grid-auto-flow affecting placement?

Are parent dimensions incorrect?

Fix the actual cause, not the symptom.

5. Minimal Change Rule
Always change the smallest possible thing.

Good:

transform: translateY(30px);
Bad:

rewriting the entire component

replacing the entire layout

changing unrelated CSS

rebuilding the page

If one property fixes the problem, change one property.

6. Visual Preservation
Unless explicitly requested, DO NOT change:

colors

typography

font sizes

font weights

spacing

padding

margins

border radius

shadows

gradients

animations

transitions

image sizes

image positions

grid proportions

card dimensions

navbar appearance

background patterns

hover effects

responsive breakpoints

The goal is to preserve the existing visual result.

7. HTML → React Migration
When migrating an existing HTML page to React:

Preserve:

DOM hierarchy

element order

CSS class names

CSS selectors

asset paths

dimensions

spacing

animations

transitions

responsive behavior

interactions

Only convert HTML-specific syntax to React syntax.

Examples:

class=""
becomes:

className=""
and:

onclick=""
becomes:

onClick={}
Do NOT redesign the page during migration.

If a React component is already partially migrated, continue from the existing implementation. Do not rebuild it from scratch.

8. CSS Rules
Before adding CSS, check whether existing CSS already provides the required styling.

Do not duplicate styles.

Do not create competing selectors.

Avoid broad selectors such as:

div {}
section {}
h1 {}
button {}
.grid {}
.hero {}
Prefer scoped selectors:

.zone3 .hero {}
.zone3 .technology-card {}
.showcase-page .navbar {}
If a CSS file is imported by a component, inspect it completely before assuming it is responsible for a visual issue.

9. Tailwind Rules
If Tailwind is already used, preserve the existing Tailwind approach.

Before assuming a Tailwind class works, verify:

Tailwind is installed.

The file is included in Tailwind's content scanning.

The generated utility exists.

The class is not overridden by CSS.

The responsive breakpoint is correct.

Avoid dynamically constructed Tailwind class names that Tailwind cannot detect.

Bad:

`lg:col-span-${span}`
Prefer explicit classes:

"lg:col-span-2"
Do not replace Tailwind with another styling system unless explicitly requested.

10. Bento / Grid Rules
For Bento layouts, determine the intended composition before modifying spans.

Do not randomly change:

col-span

row-span

grid-cols

grid-rows

gap

grid-flow

Be especially careful with:

grid-auto-flow: dense;
or Tailwind:

grid-flow-dense
Dense placement can move later cards into earlier empty spaces and change the intended visual order.

If the design requires a deliberate Bento composition, prefer explicit placement.

Example:

"lg:col-span-2 lg:row-span-2"
Do not change the grid merely because the browser's automatic placement looks different.

11. Positioning Rules
Before changing:

top
right
bottom
left
transform
margin
padding
identify the containing block.

For:

position: absolute;
find the nearest positioned ancestor.

For:

position: fixed;
consider the browser viewport.

Never blindly move elements until the positioning context is understood.

12. Animation Rules
Do not remove animations to solve positioning problems.

Check whether an element already uses:

transform
through an animation.

Example:

@keyframes float {
    ...
}
If an animated element already controls transform, adding another transform may override the animation.

When appropriate, move positioning to a wrapper instead of modifying the animated element.

13. Assets
Never replace existing assets with placeholders.

Never change images unless explicitly requested.

Preserve:

image source

aspect ratio

object-fit

object-position

dimensions

loading behavior

14. Routing
Do not change routing architecture during UI refactoring.

Do not switch between:

HashRouter
and:

BrowserRouter
unless explicitly requested.

Preserve all existing routes.

15. Componentization
Componentize repeated structures, but do not over-componentize.

Good:

<TechnologyCard />
Avoid unnecessarily splitting every small element:

<CardTitle />
<CardDescription />
<CardBadge />
<CardNumber />
<CardIcon />
unless those pieces are independently reusable.

16. No Mass Rewrites
Never rewrite an entire file when one section needs fixing.

Never regenerate a component from scratch.

Never replace working code simply because another implementation is "cleaner."

Preserve existing code wherever possible.

17. Responsive Design
Never fix desktop by breaking mobile.

Check at minimum:

375px
768px
1024px
1440px
1920px
Before changing a breakpoint, determine which existing rule is responsible.

Do not introduce arbitrary breakpoints.

18. Visual Verification
After every meaningful change:

Run the application.

Open the affected page.

Inspect the actual rendered result.

Compare against the previous/intended design.

Check desktop.

Check mobile.

Check for console errors.

Check for build errors.

Check for unintended visual changes.

If a change makes unrelated parts worse:

Revert it.

19. Root-Cause Debugging
When debugging a visual problem, follow this order:

Step 1 — DOM
Confirm the expected element exists.

Step 2 — Classes
Confirm the expected classes are actually applied.

Step 3 — Computed styles
Determine which CSS rule is winning.

Step 4 — Parent layout
Check:

grid

flex

width

height

position

overflow

Step 5 — Responsive rules
Check media queries and Tailwind breakpoints.

Step 6 — Animation
Check whether transforms or animations are modifying the position.

Step 7 — Minimal fix
Change only the rule responsible.

20. Do Not Assume External CSS Is the Problem
If removing an imported CSS file does not change the visual result, do not continue modifying that CSS file.

Investigate:

Tailwind

global styles

parent styles

browser defaults

component structure

grid configuration

generated CSS

responsive rules

21. Preserve Existing Design During Refactoring
If an existing HTML implementation looks correct and the React implementation does not:

Compare them structurally.

Do not make the HTML version match the React version.

Make the React version match the existing HTML version.

The HTML implementation is the visual reference.

22. One Change Per Iteration
When debugging:

Change ONE thing
      ↓
Run
      ↓
Inspect
      ↓
Decide
Do not simultaneously change:

grid-cols
gap
padding
card width
card height
font size
row span
column span
because then the actual cause cannot be identified.

23. Stop Conditions
Stop when:

the requested issue is fixed

the visual design is preserved

the component behaves correctly

responsive behavior is preserved

no unrelated files were modified

no build errors were introduced

no console errors were introduced

Do not continue refactoring just because additional improvements are possible.

TASK PROMPT TEMPLATE
Use the following prompt when asking the coding agent to perform a task:

Read RULES.md before doing anything.

I need you to work on:

[TASK]

This is an existing UI.

DO NOT redesign it.

The existing implementation is the visual source of truth.

First inspect:
- the target React component
- all imported CSS
- global CSS
- parent components
- Tailwind configuration
- relevant JavaScript
- animations
- routes
- assets

Do not modify anything until you understand the cause.

Identify the exact root cause first.

Then make ONE minimal change.

After the change:
1. Run the application.
2. Open the affected page.
3. Verify the actual rendered result.
4. Compare it with the intended/original design.
5. Check responsive behavior.
6. Check console/build errors.

If it is still incorrect:
- do not rewrite the component
- identify what is still wrong
- revert speculative changes if necessary
- make ONE focused change
- verify again

Repeat:

INSPECT
→ IDENTIFY ROOT CAUSE
→ ONE CHANGE
→ RUN
→ VISUALLY VERIFY
→ REPEAT

Do not stop after editing the code.

Do not change unrelated parts of the application.

Do not change the design.

At the end report:

### Root Cause
What actually caused the issue.

### Files Changed
Only files actually modified.

### Fix
The exact minimal fix.

### Verification
How the result was tested.
SPECIAL PROMPT — HTML TO REACT
For HTML → React migrations, use:

Read RULES.md before doing anything.

Migrate the existing HTML page into React.

This is a VISUAL PRESERVATION task, NOT a redesign.

The original HTML + CSS rendering is the source of truth.

First inspect:
1. Complete HTML
2. All CSS
3. JavaScript
4. Animations
5. Responsive rules
6. Assets
7. Routing
8. Existing React implementation, if partially migrated

Preserve:
- DOM hierarchy
- CSS classes
- element order
- positioning
- dimensions
- spacing
- typography
- colors
- animations
- transitions
- hover states
- responsive behavior
- assets
- interactions

Only convert HTML-specific syntax to React syntax.

Do NOT:
- redesign
- modernize
- change colors
- change typography
- change spacing
- change animations
- change image sizes
- replace CSS with Tailwind
- remove working CSS
- restructure working components unnecessarily
- change routing

If the React implementation is partially complete, continue from it.

Do not rebuild it from scratch.

After migration:
1. Run the React application.
2. Compare the React page against the original.
3. Identify visual differences.
4. Fix one difference at a time.
5. Re-test after every change.

Continue until the React implementation visually matches the original.

At the end report:
- migrated components
- files changed
- remaining differences, if any
- verification performed
GOLDEN RULE
A successful refactor is one where the code improves while the user cannot tell that the implementation changed.