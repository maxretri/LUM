# LUM — Asset Manifest

Images are now organised **per page** under `public/images/<page>/`. Replace any file
with the same name/path and it appears automatically. After swapping images run
`rm -rf .next/cache/images` (or restart `npm run dev`).

Logo → `public/logo.svg` · Feature icons → `public/icons/{road,bolt,wheel,seat}.svg`
(both single-colour SVGs, recoloured automatically). Generation prompts → `ASSET-PROMPTS.md`.

---

## `public/images/home/` — landing page
| File | Where | Size |
|------|-------|------|
| `hero.jpg` | Hero (front 3/4, sunset) | 1920×1080+ |
| `lifestyle.jpg` | "Drive further" banner | 1920×1080, 16:9 |
| `car-<colour>-<view>.jpg` | Configurator — 4 colours × 4 angles (16 files) | 1536×1024, white bg |
| `explore-performance.jpg` | Explore card → /performance | 900×1200, 3:4 |
| `explore-interior.jpg` | Explore card → /interior | 900×1200 |
| `explore-safety.jpg` | Explore card → /safety | 900×1200 |
| `explore-gallery.jpg` | Explore card → **/energy** (reused slot) | 900×1200 |

Configurator detail: colour ∈ `taupe,grey,black,white`; view ∈ `front,threequarter,side,back`.
Only `car-taupe-side.jpg` is real; grey/black/white side are recolours; the 12 other
angles are placeholders. Keep all angles of a colour on the same pure-white background.

## `public/images/energy/` — LUM Energy (teaser + /energy page)
| File | Where | Size |
|------|-------|------|
| `teaser.jpg` | Landing teaser banner | 1920×1080, 16:9 |
| `hero.jpg` | /energy page hero | 1920×1200 |
| `home.jpg` | Block 1 — Home charging | 1200×900 |
| `villa.jpg` | Block 2 — Villa · Solar + ESS | 1200×900 |
| `commercial.jpg` | Block 3 — Commercial | 1200×900 |

## `public/images/commercial/` — /commercial (B2B) page
| File | Where | Size |
|------|-------|------|
| `hero.jpg` | Page hero | 1920×1200 |
| `block-1.jpg` | Infrastructure | 1200×900 |
| `block-2.jpg` | Scalability | 1200×900 |

## `public/images/performance/` — /performance
`hero.jpg` (1920×1200) · `block-1.jpg` Electric Drive · `block-2.jpg` Chassis (1200×900)

## `public/images/interior/` — /interior
`hero.jpg` · `block-1.jpg` Cabin · `block-2.jpg` Cockpit · `block-3.jpg` Materials

## `public/images/safety/` — /safety
`hero.jpg` · `block-1.jpg` Structure · `block-2.jpg` Driver Assistance · `block-3.jpg` Braking

## `public/images/gallery/` — /gallery page + landing gallery strip
`hero.jpg` (1920×1200) · `1.jpg` … `6.jpg` (1200×900). The landing "Gallery" section
reuses `1.jpg`–`6.jpg`.

---

All placeholders are labelled SVGs saved as `.jpg`. Generation prompts per slot live in
`ASSET-PROMPTS.md`.
