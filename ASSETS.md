# LUM LEV 01 — Asset Manifest

Where every replaceable asset lives. **Keep the exact filename** — drop your file on
top of the placeholder and it appears automatically. After replacing any image run
`rm -rf .next/cache/images` (or restart `npm run dev`) so Next.js re-optimises it.

All images live in `public/images/`. Icons and the logo live in `public/`.

---

## 1. Logo  → `public/logo.svg`
- Single-colour, transparent background SVG (it is recoloured automatically: white
  over the hero, dark when the nav is scrolled). Used in the header and footer.
- Current file is a **placeholder** — replace with the real LUM wordmark.
- Aspect ratio is read as 168 × 40. If yours differs, change the `4.2` ratio in
  `components/Logo.tsx`.

## 2. Feature icons  → `public/icons/`
Swap any of these single-colour SVGs (transparent bg). They recolour on hover automatically.
| File | Feature card |
|------|--------------|
| `public/icons/road.svg`  | Long Range |
| `public/icons/bolt.svg`  | Performance |
| `public/icons/wheel.svg` | Safety |
| `public/icons/seat.svg`  | Comfort |

---

## 3. Landing page  (`/`)
| File | Where | Recommended size | Status |
|------|-------|------------------|--------|
| `images/hero.jpg` | Hero background (front 3/4, sunset) | 1920×1080+ | ✅ real |
| **Configurator (4 colours × 4 angles = 16 files)** | see below | 1536×1024, **white bg** | mixed |

The configurator now has an **angle switcher** (Front / 45° / Side / Back). Each colour
needs four images named `car-<colour>-<view>.jpg`:
- colours: `taupe`, `grey`, `black`, `white`
- views: `front`, `threequarter` (= 45°), `side`, `back`

| File pattern | Status |
|--------------|--------|
| `car-taupe-side.jpg` | ✅ real |
| `car-{grey,black,white}-side.jpg` | 🟠 recoloured from taupe side |
| `car-{taupe,grey,black,white}-{front,threequarter,back}.jpg` (12 files) | 🟡 placeholder |

> Keep all four angles of a colour on the **same pure-white background** so switching
> views is seamless. Prompts for each angle are in `ASSET-PROMPTS.md` → "Configurator".
| `images/lifestyle.jpg` | Full-width banner ("Drive further") | 1920×1080, 16:9 | 🟡 placeholder |
| `images/explore-performance.jpg` | Explore card → /performance | 900×1200, 3:4 portrait | 🟡 placeholder |
| `images/explore-interior.jpg` | Explore card → /interior | 900×1200, 3:4 | 🟡 placeholder |
| `images/explore-safety.jpg` | Explore card → /safety | 900×1200, 3:4 | 🟡 placeholder |
| `images/explore-gallery.jpg` | Explore card → /gallery | 900×1200, 3:4 | 🟡 placeholder |

## 4. Performance page  (`/performance`)
| File | Where | Size | Status |
|------|-------|------|--------|
| `images/page-performance-hero.jpg` | Page hero | 1920×1200 | 🟡 placeholder |
| `images/showcase-performance.jpg` | Block 1 — Electric Drive | 1200×900, 4:3 | 🟡 placeholder |
| `images/page-performance-2.jpg` | Block 2 — Chassis | 1200×900, 4:3 | 🟡 placeholder |

## 5. Interior page  (`/interior`) — 3 blocks
| File | Where | Size | Status |
|------|-------|------|--------|
| `images/page-interior-hero.jpg` | Page hero | 1920×1200 | 🟡 placeholder |
| `images/showcase-interior.jpg` | Block 1 — Cabin | 1200×900 | 🟡 placeholder |
| `images/page-interior-2.jpg` | Block 2 — Cockpit | 1200×900 | 🟡 placeholder |
| `images/page-interior-3.jpg` | Block 3 — Materials | 1200×900 | 🟡 placeholder |

## 6. Safety page  (`/safety`) — 3 blocks
| File | Where | Size | Status |
|------|-------|------|--------|
| `images/page-safety-hero.jpg` | Page hero | 1920×1200 | 🟡 placeholder |
| `images/showcase-safety.jpg` | Block 1 — Structure | 1200×900 | 🟡 placeholder |
| `images/page-safety-2.jpg` | Block 2 — Driver Assistance | 1200×900 | 🟡 placeholder |
| `images/page-safety-3.jpg` | Block 3 — Braking | 1200×900 | 🟡 placeholder |

## 7. Gallery page  (`/gallery`)
| File | Where | Size | Status |
|------|-------|------|--------|
| `images/page-gallery-hero.jpg` | Page hero | 1920×1200 | 🟡 placeholder |
| `images/gallery-1.jpg` … `gallery-6.jpg` | Editorial grid (tile 1 is large) | 1200×900 each | 🟡 placeholder |

---

Generation prompts for every 🟡 slot are in **`ASSET-PROMPTS.md`**.
