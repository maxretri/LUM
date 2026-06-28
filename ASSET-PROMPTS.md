# LUM LEV 01 — Image Generation Prompts

Production-ready prompts for the whole site. Every prompt is **self-contained** — you
don't need to remember a style token. Just:

1. **Attach a LUM LEV 01 reference photo** that matches the angle of the shot (front
   3/4, side, rear, rear 3/4) and run in **image-to-image / "use reference" / "edit"**
   mode so the car's exact body, proportions, light bars and badging stay identical.
2. Paste the prompt.
3. Set the **aspect ratio** noted on each shot.
4. Save the result over the matching filename in `public/images/` (see `ASSETS.md`),
   then run `rm -rf .next/cache/images` so it re-optimises.

**Recommended models:** Nano Banana Pro (Higgsfield), Seedream/Seedance, or Midjourney v6+
with an image prompt. For video heroes, Seedance image-to-video from the still.

### Which reference to attach
| Reference angle | Use it for |
|-----------------|------------|
| Front 3/4 (sunset hero) | hero, lifestyle, performance, gallery front shots |
| Full side profile | configurator colours, side gallery, explore-gallery |
| Rear straight-on | gallery rear, tail-light details |
| Rear 3/4 | explore-performance, safety braking, gallery |

### Global negative prompt (append to any generator that supports it)
> other car brands, competitor logos, badges other than LUM, watermark, text,
> caption, deformed body, wrong proportions, extra doors, extra wheels, melted
> reflections, plastic look, cartoon, illustration, oversaturated, HDR halo, lowres,
> blurry car, duplicate car

### House style (baked into every prompt below)
Photoreal, cinematic, editorial. Warm-neutral palette, soft natural light, gentle
reflections, shallow depth of field, lots of clean negative space, calm and expensive.
35–85mm look, true-to-reference body. 8k, crisp on the car.

---

# LANDING PAGE

### `images/home/hero.jpg` — 16:9 — *(already final; here for reference)*
> Cinematic photoreal front three-quarter shot of the LUM LEV 01 electric crossover SUV
> (taupe/champagne metallic, gloss-black roof, full-width LED light bars, black aero
> alloys), parked on a polished concrete plaza at golden-hour sunset. Low warm sun
> flaring softly from the left, distant mountain range, a minimalist wood-panelled
> architectural wall on the right, long mirror-like reflections on the floor. Wide
> framing with open sky in the upper-left for a headline. Expensive, serene, editorial.

### `images/home/lifestyle.jpg` — 16:9
> Cinematic photoreal shot of the LUM LEV 01 driving along an empty coastal mountain
> road at dusk. Subtle motion blur on the tarmac and guardrail, the car sharp and
> planted, ocean and cliffs softly out of focus in the distance, warm fading sun, cool
> blue shadows. Calm, premium, full of air, with negative space in the sky for a
> centred headline. Keep the car identical to the attached reference.

### Configurator — 4 colours × 4 angles, 3:2, **pure white seamless studio**
The configurator has an angle switcher, so each colour needs **four shots** on the same
pure-white background and same framing. File names: `home/car-<colour>-<view>.jpg` where
colour ∈ {taupe, grey, black, white} and view ∈ {front, threequarter, side, back}.

Base prompt (swap {COLOUR} and {ANGLE}):
> Studio product photo of the LUM LEV 01, **{ANGLE}**, centred on a seamless pure-white
> background, even soft box lighting, subtle realistic contact shadow under the wheels,
> no environment, no surrounding reflections, consistent framing and camera height
> across all angles. Body paint: **{COLOUR}**. Identical car to the reference.

- {ANGLE} options (attach the matching reference each time):
  - `…-front.jpg` → "straight-on front view, slight high angle"
  - `…-threequarter.jpg` → "front three-quarter (45°) view"
  - `…-side.jpg` → "perfect full side profile"
  - `…-back.jpg` → "straight-on rear view"
- {COLOUR} options:
  - taupe → "taupe / champagne metallic" *(side already final)*
  - grey → "graphite metallic grey, satin sheen"
  - black → "deep obsidian gloss black with crisp specular highlights"
  - white → "pearlescent lunar white with soft cool shadows"

> Tip: shoot/generate all four angles of ONE colour first with identical lighting, then
> repeat per colour — keeps the switcher seamless.

### Explore cards — 3:4 **portrait**, moody low-key
> Tall vertical editorial shot of the LUM LEV 01 in a dark low-key studio, deep graduated
> charcoal background, a single dramatic rim light tracing the car's edges, premium and
> minimal, generous dark negative space at the top for a label. Subject: **{SUBJECT}**.
> Same car as the reference.

- `images/home/explore-performance.jpg` → SUBJECT = "tight rear three-quarter, sense of motion, wheels turned"
- `images/home/explore-interior.jpg` → SUBJECT = "warm-lit detail of the cabin — steering wheel and central display through the side window"
- `images/home/explore-safety.jpg` → SUBJECT = "close detail of the front LED light bar and sensor array glowing"
- `images/home/explore-gallery.jpg` → SUBJECT = "elegant full side silhouette against a soft graduated light"

---

# PERFORMANCE PAGE  (`/performance`)

### `images/performance/hero.jpg` — 16:10
> Cinematic photoreal LUM LEV 01 carving a sweeping empty mountain road at blue-hour
> dusk, low dramatic key light raking across the body, faint motion in the background,
> the car crisp and confident, wide negative space in the sky for a title. Identical to
> the reference.

### `images/performance/block-1.jpg` — 4:3 — *Electric Drive*
> Front three-quarter of the LUM LEV 01 accelerating on open tarmac at golden hour,
> subtle radial motion blur in the background, the car razor-sharp, warm reflections
> along the bodywork, dynamic but elegant. Same car as the reference.

### `images/performance/block-2.jpg` — 4:3 — *Chassis*
> Low close-up of the LUM LEV 01's front wheel arch and aero detailing in a dark studio,
> dramatic side light defining the alloy wheel, brake and air-curtain detail, glossy
> black surfaces, engineering-beauty feel. Same car as the reference.

---

# INTERIOR PAGE  (`/interior`)  — attach an interior reference if you have one; otherwise describe-only

### `images/interior/hero.jpg` — 16:10
> Wide photoreal interior of the LUM LEV 01 cabin shot from the rear seats looking
> forward through a panoramic glass roof, warm daylight pouring in, minimalist
> dashboard with a large central screen, beige nappa and gloss-black trim, airy and
> serene, shallow depth of field.

### `images/interior/block-1.jpg` — 4:3 — *Cabin*
> Spacious front cabin of the LUM LEV 01, two sculpted front seats, open uncluttered
> layout, soft natural daylight, premium beige + black materials, calm and minimal.

### `images/interior/block-2.jpg` — 4:3 — *Cockpit*
> Driver-focused cockpit of the LUM LEV 01, large 15.6" central touchscreen and a clean
> two-spoke steering wheel, minimal physical controls, ambient light line across the
> dash, shallow depth of field, evening cabin glow.

### `images/interior/block-3.jpg` — 4:3 — *Materials*
> Macro detail of the LUM LEV 01 interior — stitched soft-touch dashboard, knurled metal
> switchgear, and a thin ambient light strip, warm key light, luxurious tactile texture,
> very shallow depth of field.

---

# SAFETY PAGE  (`/safety`)

### `images/safety/hero.jpg` — 16:10
> The LUM LEV 01 in a clean bright high-key studio, confident front three-quarter
> stance, soft even wraparound light, solid and reassuring mood, lots of clean space.
> Identical to the reference.

### `images/safety/block-1.jpg` — 4:3 — *Structure*
> Technical hero of the LUM LEV 01 in a dark studio with a subtle X-ray-style glow
> revealing the high-strength safety cage and crumple zones inside the body, cool blue
> accent light, premium engineering visualisation, the exterior still photoreal and
> true to the reference.

### `images/safety/block-2.jpg` — 4:3 — *Driver Assistance*
> Front three-quarter of the LUM LEV 01 at dusk with restrained holographic ADAS
> graphics — faint sensor arcs and lane-detection lines projected on the road ahead —
> high-tech but tasteful, not cluttered. Same car as the reference.

### `images/safety/block-3.jpg` — 4:3 — *Braking*
> Dynamic low shot of the LUM LEV 01 braking firmly on wet night tarmac, fine water
> spray, red tail-light glow reflecting on the road, controlled and dramatic, cinematic.
> Same car as the reference (use the rear or rear-3/4 reference).

---

# GALLERY PAGE  (`/gallery`)  — shoot these as ONE cohesive set (same light & background)

### `images/gallery/hero.jpg` — 16:10
> Definitive beauty portrait of the LUM LEV 01, front three-quarter, dramatic graduated
> studio light from behind, glossy floor, the hero portrait of the car. Identical to the
> reference.

Six tiles, 4:3, consistent premium studio set (tile 1 is large):
- `images/gallery/1.jpg` → front three-quarter, golden-hour environment, wide
- `images/gallery/2.jpg` → rear three-quarter in studio, rim-lit *(use rear-3/4 ref)*
- `images/gallery/3.jpg` → full side profile, studio *(use side ref)*
- `images/gallery/4.jpg` → rear straight-on, studio, tail light bar lit *(use rear ref)*
- `images/gallery/5.jpg` → macro detail — alloy wheel + air curtain
- `images/gallery/6.jpg` → front straight-on, low dramatic key light *(use front ref)*

> Studio shot of the LUM LEV 01, {SUBJECT}, on a smooth graduated grey-to-charcoal
> background with a polished reflective floor, consistent soft key + edge light so all
> six images read as one shoot, premium and minimal. Same car as the reference.

---

## Tips for a clean, consistent result
- Generate **2–4 variations** per slot and keep the best.
- Keep the **same background description** across a page so blocks feel like one set.
- If a generator drifts the body shape, lower the prompt strength / raise the
  image-reference weight, or switch to an "edit/restyle" mode on the reference.
- For moving hero shots, generate the still first, then **image-to-video (Seedance)**
  with a short prompt like "slow cinematic dolly, gentle parallax, subtle ambient
  motion, 4s loop".

---

# LUM ENERGY  (landing teaser + `/energy`)
Clean, premium, eco-tech mood. Warm-neutral with subtle green/solar accents. Keep it
calm and architectural — not busy.

### `energy/teaser.jpg` — 16:9 (landing teaser)
> Cinematic wide shot at golden hour: the LUM LEV 01 parked beside a modern minimalist
> villa whose roof carries sleek solar panels, a discreet wall charger and a small ESS
> battery cabinet on the wall. Warm low sun, long shadows, calm and expensive, generous
> empty sky on the left for a headline. Photoreal, editorial. Same car as the reference.

### `energy/hero.jpg` — 16:10 (/energy hero)
> Architectural dusk shot of a LUM Energy ecosystem — villa with solar roof, the LEV 01
> charging in the driveway, soft warm light, minimalist and serene, space for a title.

### `energy/home.jpg` — 4:3 — Home
> A single compact LUM wall charger mounted on a clean modern garage/house wall, the
> LEV 01 plugged in at night, soft warm interior light, minimal and tidy.

### `energy/villa.jpg` — 4:3 — Villa · Solar + ESS
> Two LUM vehicles charging at a villa, solar panels on the roof catching golden light,
> a wall-mounted ESS battery unit visible, bright optimistic daytime, energy-independent
> lifestyle feel.

### `energy/commercial.jpg` — 4:3 — Commercial
> A row of LUM commercial chargers at a modern parking structure / business campus,
> several vehicles charging, clean corporate architecture, wide scalable feel, dusk.

# LUM COMMERCIAL  (`/commercial`, B2B)
### `commercial/hero.jpg` — 16:10
> Wide shot of a large-scale LUM charging site — fleet vehicles charging in an orderly
> modern depot or campus at blue hour, professional, infrastructural, confident.

### `commercial/block-1.jpg` — 4:3 — Infrastructure
> Overhead or wide view of a LUM charging installation across a parking structure,
> orderly rows of chargers, clean engineering, corporate premium.

### `commercial/block-2.jpg` — 4:3 — Scalability
> A LUM commercial site combining chargers, solar canopy and an ESS battery cabinet,
> showing an integrated scalable energy network, daytime, optimistic and clean.
