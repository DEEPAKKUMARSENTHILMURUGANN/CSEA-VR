# CSEA-VR
# PSG CSE Innovation Experience Centre — VR Experience

A browser-based WebXR experience showcasing the PSG CSE Innovation Experience Centre — its 10 zones, achievements, research, and student innovations — as an immersive virtual gallery.

This project uses a staged delivery architecture: a premium, high-fidelity ("pakka") 2D landing page shell handles onboarding and event routing before launching visitors into the optimized 3D WebXR canvas canvas loop.

---

## 🚀 Finalized Tech Stack

Our stack is explicitly engineered to balance ease of development for beginner coders with top-tier performance on standalone VR hardware (e.g., Meta Quest) over global CDNs serving 20–100 concurrent visitors.

| Layer | Technology Selected | Developer Difficulty | Purpose / Application |
| :--- | :--- | :--- | :--- |
| **App Shell** | React 18 + Vite | ⭐ (Beginner-Friendly) | Isolated component sandboxing and ultra-fast hot-reloading. |
| **Front-End UI**| Tailwind CSS | ⭐ (Beginner-Friendly) | Styling the premium cyber-dark home page and 2D menu overlays. |
| **State Engine** | Zustand | ⭐⭐ (Accessible) | High-performance state loop for zone swapping & popup states. |
| **3D Content** | `@react-three/drei` | ⭐⭐ (Accessible) | Pre-built abstract 3D elements (`<Image />`, `<Text />`) for exhibit mapping. |
| **Core Rendering**| React Three Fiber / Three.js | ⭐⭐⭐ (Intermediate) | Handling the spatial coordinates, environmental lighting, and meshes. |
| **VR Hardware** | `@react-three/xr` | ⭐⭐⭐⭐ (Advanced) | Mapping WebXR session anchors, hand-tracking, and laser pointers. |
| **Optimization** | Draco + KTX2 / Basis | ⭐⭐⭐⭐ (Advanced) | Compressing student models and textures to preserve mobile VR frame rates. |
| **Hosting** | Vercel / Netlify (HTTPS) | ⭐ (Automated) | Zero-maintenance CDN static distribution with mandatory SSL safety. |

---

## 👥 Team Workflow & Division of Labor

To prevent beginners and fresh coders from being overwhelmed by 3D math and WebXR intricacies, development tasks are strictly isolated by skill profile:

1. **Core Architecture Team (Intermediate Coders)**: Set up the global `<Canvas />`, build the central room environment, map the camera rigs, configure Zustand state parameters, and deploy the `@react-three/xr` locomotion hooks.
2. **Zone Creators (Beginner Coders)**: Focus entirely on visual layout. Beginners work inside isolated zone sandboxes (e.g., `Zone3AiPavilion.jsx`) copy-pasting structured Drei tags, arranging images, and positioning student project descriptions using simple X, Y, Z coordinates.
3. **Asset Optimization Pipeline (Asset Managers)**: Take 3D models from project teams, run them through compression tools, convert image layouts into optimized formats, and maintain the `/public` static structure.

---

## 🔀 Git Workflow & Branch Protection Rules

⚠️ **GOLDEN RULE**: Direct pushes to `main` are strictly blocked by GitHub Repository Rulesets. This repository is **PUBLIC**; rulesets are live and actively enforced. All code updates must pass peer reviews.

### Feature Development Step-by-Step

```bash
# 1. Sync your local project with the latest master code
git checkout main
git pull origin main

# 2. Spin up a separate feature branch for your assigned component
# Naming Pattern: feature/yourname-zoneX-description
git checkout -b feature/name-zone3-ai-pavilion

# 3. Stage and commit code as you make progress
git add .
git commit -m "feat(zone3): add AI pavilion live-demo panels"

# 4. Push your local feature branch to the remote repository
git push -u origin feature/name-zone3-ai-pavilion

# 5. Open a Pull Request on GitHub (feature branch → main) for review.
```

### Eliminating Merge Conflicts
If changes are merged into `main` by other developers while you are still working, sync your feature branch locally before requesting a final PR merge approval:
```bash
git checkout main
git pull origin main
git checkout feature/name-zone3-ai-pavilion
git merge main
# Resolve local code conflicts if prompted by Git, then push:
git push
```

### Git Command Cheat Sheet
* `git status` — View modified, un-staged, and untracked workspace files.
* `git diff` — Review explicit line changes before staging.
* `git log --oneline --graph --all` — Visual terminal tree map of local branch histories.
* `git stash` / `git stash pop` — Shelve current uncommitted edits to change branches cleanly.

### Conventional Commit Standard
* `feat(zoneX): ...` — Introducing new components, assets, or content layouts to a zone.
* `fix(locomotion): ...` — Resolving interaction bugs, canvas boundaries, or camera targets.
* `style(ui): ...` — Modifying structural layout padding, text styles, or color contrasts.
* `perf(assets): ...` — Optimizing meshes, shrinking assets, or implementing lazy loading hooks.

---

## 🛠️ Getting Started

### Installation & Execution
```bash
# Clone the repository
git clone <your-repo-url>
cd psg-cse-iec-vr

# Install packages
npm install

# Start local dev server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) for the desktop "magic window" layout preview.

### Testing on a Physical VR Headset (Quest, etc.)
WebXR platform layers strictly require secure context environments (**HTTPS**). To securely route your local Vite server to an external headset web browser across your network connection:
```bash
# Install and initialize local secure tunneling
npm install -g localtunnel
lt --port 5173
```
Open the generated secure `https://...loca.lt` address inside your VR headset's internet browser app.

---

## 📂 Project Directory Structure

```text
psg-cse-iec-vr/
├── public/
│   ├── models/          # Draco-compressed .glb/.gltf 3D meshes
│   ├── textures/        # KTX2/Basis compressed surface materials
│   ├── images/          # High-resolution gallery posters, exhibits, & photos
│   └── audio/           # Spatial ambient tracks & narration audio clips
├── src/
│   ├── components/
│   │   ├── zones/       # Modular components for Zones 1 through 10
│   │   ├── gallery/     # Reusable display elements (ImageWall.jsx, Carousel3D.jsx)
│   │   ├── ui/          # High-fidelity 2D landing page shell & VR HUD panels
│   │   └── locomotion/  # Teleportation wrappers & tracking setups
│   ├── scenes/
│   │   └── MainHall.jsx # Core hub world routing into individual sub-zones
│   ├── App.jsx          # UI entry switcher & Global Canvas mount
│   └── main.jsx         # DOM initialization point
├── vite.config.js       # Bundler optimization and file transformer pipelines
└── README.md
```

---

## 📐 Optimization Budgets

### Performance Budget (Targeting Stable 72/90 FPS)
* **Initial Page Payload**: Keep under **≤ 50MB** initial bundle size. Use React Suspense boundaries to lazy-load assets on a per-zone basis as users explore.
* **Geometry Processing**: Keep draw calls minimal. Batch static room geometries and utilize instancing for repeated assets (frames, labels, stanchions).
* **Texture Maps**: Compress images using KTX2/Basis configurations to avoid GPU memory overhead on standalone headsets (e.g., Quest 2/3).

### VR Design Guardrails
1. **Locomotion**: Standardize on **Teleportation** and **Snap-Turning** to mitigate simulator sickness. Continuous smooth locomotion must remain strictly opt-in.
2. **Hitboxes**: UI buttons and selectable assets must feature oversized interaction bounds for easy targeting via controller lasers or hand-tracked pinch rays.
3. **Typography**: Build all spatial text panels with high-contrast ratios and bold sizing. Avoid relying on thin serif fonts inside 3D space.
4. **2D Fallback**: All scenes must automatically fall back to standard desktop controls (click-and-drag mouse tracking) for non-headset viewers.

---

## 📦 Deployment Configuration

```bash
# Generate the production production bundle
npm run build
```
The optimized bundle is outputted directly to the `/dist` directory. 

### Critical Host Headers
When deploying this build to providers like Vercel, Netlify, or Cloudflare Pages, verify the following configurations are present:
1. **HTTPS Enforcement**: Active (WebXR Web APIs require secure origins).
2. **Permissions Policy**: The server response header must allow permission for spatial tracking:
   ```text
   Permissions-Policy: xr-spatial-tracking=(self)
   ```
