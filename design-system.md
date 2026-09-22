# Bajaj Finserv App — Design Language Reference

Extracted from 8 screenshots of the live app (Home dashboard + Bajaj Pay
bill-payment module). Use this as the single source of truth when
designing new screens/wireframes so they feel native to the existing app.
Every value below is an approximation read from photos, not exact hex
codes from a design tool — treat colors as "close enough to match," not
pixel-perfect brand values.

---

## 1. Screen Inventory (source screenshots)

| # | Screen | Module |
|---|--------|--------|
| 1 | Home dashboard | Core App |
| 2 | Electricity bill entry form | Bajaj Pay |
| 3 | Bills & Recharges hub (top) | Bajaj Pay |
| 4 | Cable bill entry form | Bajaj Pay |
| 5 | Bills & Recharges hub (scrolled — Pay Bills / Products & Loans) | Bajaj Pay |
| 6 | My Bills (saved billers list) | Bajaj Pay |
| 7 | Bills & Recharges hub (top, alt state — FASTag promo, My billers, Top Categories) | Bajaj Pay |
| 8 | Bills & Recharges — full category grid expanded | Bajaj Pay |

Two distinct "sub-brands" of UI exist in the app and both must be
respected depending on context:

- **Core App (Home)** — dark navy top bar, orange active bottom-nav item.
- **Bajaj Pay (mini-app / bill-pay flows)** — bright blue top bar, modal-style
  navigation (back + logo + partner badge + help + close), its own 5-item
  bottom nav.

When designing a new screen, decide first which shell it belongs to.

---

## 2. Color Palette

### Primary / Brand
| Token | Approx. value | Usage |
|---|---|---|
| `navy-header` | `#152B54` (dark navy/indigo) | Home top app bar background |
| `pay-blue` | `#1768C4` (medium/bright blue) | Bajaj Pay top app bar background, tab active underline area |
| `orange-primary` | `#F5941F` → `#F2711C` (gradient, gold→orange) | Primary CTA buttons ("FETCH YOUR BILL", "ADD ACCOUNT") |
| `orange-accent` | `#E8531F` / coral-red-orange | Text links ("Change", "Know more", "Recharge Now", "ADD NOW", tab underline, "My bills") |

### Neutrals
| Token | Approx. value | Usage |
|---|---|---|
| `bg-white` | `#FFFFFF` | Card & screen backgrounds |
| `bg-light-gray` | `#F4F5F7` | Section separators, subtle card fills |
| `border-gray` | `#DADCE0` | Input borders, dividers |
| `text-primary` | `#1A1A2E` / near-black | Headings, primary labels |
| `text-secondary` | `#5F6368` | Subtext, helper copy |
| `text-disabled` | `#9AA0A6` | Placeholder text |

### Semantic
| Token | Approx. value | Usage |
|---|---|---|
| `success-green` | `#2E7D32` (badge bg lighter `#E6F4EA`) | "Paid on [date]" status pill, check icon |
| `error-red` | `#D93025` | Invalid input border + helper text + warning icon |
| `offer-green` | `#3BAA35` | "Offer" ribbon badge, "Up to ₹3L" tag |

### Icon Fill Colors (category tiles — flat, single-color per icon)
Icons are NOT monochrome — each has its own brand-ish flat color on a
white or tinted rounded-square/circle container:
blue, purple, yellow/gold, red, teal, green, orange, maroon, navy — pulled
per-category (e.g. Electricity = yellow bulb, Water = blue tap, Piped Gas
= orange flame, Cable TV = green TV, Donation = green heart-box,
Municipal Taxes = orange house, EV Recharge = green plug, Echallan = red
traffic light). When adding a new category icon, pick a color not already
adjacent in the grid so tiles stay visually distinct.

---

## 3. Typography

No custom display font is evident — reads as a standard humanist sans
(system default, e.g. Roboto-equivalent).

| Style | Size (approx) | Weight | Usage |
|---|---|---|---|
| Screen title | 20–22px | Bold (700) | "Electricity", "My Bills", "Bills and Recharges" |
| Section heading | 16–18px | SemiBold (600) | "Popular billers", "Top Categories", "Products and Loans" |
| Card title | 14–16px | SemiBold | Biller name, offer headline |
| Body text | 13–14px | Regular (400) | Descriptions, helper copy |
| Button label | 13–14px | Bold, UPPERCASE | "FETCH YOUR BILL", "ADD ACCOUNT", "LINK" |
| Caption / label | 11–12px | Regular / Medium | Icon tile labels, input field labels, timestamps |
| Link text | 13–14px | SemiBold, orange-accent color | "Change", "Know more", "Recharge Now" |

Icon-grid labels are set in small (~11px) uppercase-or-title-case text,
centered under the icon, max 2 lines.

---

## 4. Spacing & Layout

- **Screen side padding:** ~16px consistently.
- **Card corner radius:** ~12–16px (generous rounding on all cards/banners).
- **Button corner radius:** fully pill-shaped (radius = height/2) for all
  primary/secondary CTAs.
- **Icon tile container:** rounded-square (~12px radius) or circle,
  roughly 48–56px square, icon glyph centered, label below with ~6–8px gap.
- **Section vertical rhythm:** ~20–24px gap between major sections (each
  introduced by a bold section heading, left-aligned, no card wrapper).
- **Grid:** category/icon grids are 4-columns wide on a standard phone,
  evenly spaced.
- **List rows:** icon/logo (~40px) + text block, ~12px gap, full-width
  divider below each row, ~14px vertical padding per row.
- **Card shadow:** soft, low-elevation drop shadow on promo banners and
  list-item cards; flat (no shadow) on inline icon tiles.

---

## 5. Component Library

### 5.1 Top App Bar — Core (Home)
- Dark navy background.
- Row of quick-action icon buttons (Loans, EMI, Rewards/trophy, Cart,
  Notifications) — each in its own rounded-rect dark-blue chip, icon +
  label stacked, white icon/text. Notification icon carries a small red
  dot badge.
- Search bar directly below: white rounded pill, orange search icon
  (left), placeholder "Search Bajaj Finance", camera-scan + mic icons
  (right).

### 5.2 Top App Bar — Bajaj Pay (modal/sub-flow)
- Bright blue background, shorter height than Home's navy bar.
- Left: back chevron + small "Bajaj Pay" logo lockup.
- Right: "Bharat Connect" partner badge/logo, circular "?" help icon, "✕"
  close icon.
- Below the bar (white area): large screen-title text (e.g. "Electricity").
- This bar pattern = "modal flow" signal; use it for any bill-pay /
  transactional sub-journey launched from the main app.

### 5.3 Buttons
- **Primary CTA** — full-width or content-width pill, orange→gold
  gradient fill, bold uppercase white text (e.g. "FETCH YOUR BILL",
  "ADD ACCOUNT"). Reserved for the single most important action on screen,
  usually docked at the bottom.
- **Secondary (dark) CTA** — black/near-black pill button, white text,
  smaller, used inside promo cards (e.g. "Apply Now").
  Also seen as white pill with dark text/border on dark promo banners.
- **Outline CTA** — white background, colored (orange or navy) border and
  text, pill shape (e.g. "Get It Now", "CHECK NOW").
- **Text link** — no container, orange-accent colored text, used for
  in-context navigation ("Change", "Know more", "Show More/Show Less",
  "Recharge Now", "My bills").

### 5.4 Cards / Banners
- **Promo banner card:** rounded rect, background image or gradient/photo,
  headline (bold, large) + short subtext + CTA button inside the card;
  optional small badge/tag pinned to a corner (e.g. "LOAN UTSAV",
  "Bajaj Pay FASTag Exclusive Offer").
- **Info/utility card:** white card, icon or illustration on the left,
  title + description text, CTA on the right (pill button or link) — used
  for "Free Credit Score Check", "Link your accounts", "Add bills &
  recharges through SMS".
- **Guide card:** image on top, title + short description + "Know more"
  link below — used in "Bill payment guides" horizontal scroller.

### 5.5 Icon Tiles (category shortcuts)
- Two visual variants observed:
  1. **Circular icon, no fill container**, colorful illustrated icon,
     label below (Home screen top categories — Mobiles on EMI, Personal
     Loan, etc.)
  2. **Flat-color rounded-square/icon glyph**, white icon on solid color
     fill, label below in small caps (Bajaj Pay category grids — Mobile
     Recharge, Electricity, Book a Cylinder, etc.)
- Use variant 1 for high-level product/service entry points on the Home
  surface; use variant 2 for dense utility/category grids inside Bajaj Pay.
- Grids expand/collapse via a centered "Show More ⌄ / Show Less ⌃" link
  below the fold.

### 5.6 List / Row Items
- **Biller row:** circular logo/avatar, name + subtitle (account/phone
  number), right-aligned link or chevron ("Change" / chevron-right).
- **Bill status row (My Bills):** top strip with a green check-badge
  ("✓ Paid on 20 Sep") and a "⋮" overflow menu; below it, biller
  logo + name + number; divider; footer strip repeating the paid date
  with a right-aligned orange "Recharge Now" link.
- **Settings-style row:** icon in a light rounded-square chip + label +
  chevron-right, used for "Offers and rewards", "Autopay".

### 5.7 Tabs
- Simple text tabs, active tab colored (orange-accent) with a colored
  underline bar; inactive tabs gray/neutral text. Seen in "ALL /
  MOBILE PREPAID" on the My Bills screen.

### 5.8 Form Fields
- Label (small, dark text) above the input.
- Input: white background, thin gray border, generous height, rounded
  corners (~8px, less rounded than buttons/cards).
- **Error state:** border turns red, a red warning-triangle icon + red
  helper text appears directly below the field ("Please enter a valid
  Consumer Number between 9 - 12 digits").
- Optional fields explicitly labeled "(Optional)" in the field label.
- Checkbox + multi-line consent/legal text pattern before the final CTA.

### 5.9 Badges / Tags
- Small pill or ribbon tags in green ("Offer", "Up to ₹3L") or dark
  ("LOAN UTSAV") pinned to the corner of a card or icon tile.
- Status badge: green pill with check icon + date text.

### 5.10 Bottom Navigation
Two separate 5-item bottom nav bars depending on shell:
- **Home:** Home (active/orange, filled icon) · Service · Scan QR
  (center, visually emphasized) · Offers · Menu · *(Chat sometimes shown
  as a 6th / overflow)*. Active item = orange icon + orange label;
  inactive = gray outline icon + gray label.
- **Bajaj Pay:** Bajaj Pay (active) · Passbook · Scan QR (center) ·
  Settings · Chat. Same active/inactive coloring convention; a thin
  green progress/indicator line was observed under the active tab in one
  capture — treat as a possible in-app-tour/highlight state rather than
  a permanent style.
- Scan QR is consistently the visually distinct, centered nav item across
  both shells (larger icon size treatment) — it's the app's signature
  action.

---

## 6. Iconography Style
- Category/product icons: flat, filled, full-color illustrations or
  glyphs — not outline/line-art. Each category owns a distinct flat
  color so grids stay scannable.
- Navigation icons (bottom bar): simple line/outline icons, minimal
  detail, colored only in active state.
- Utility icons (search, mic, camera, help "?", close "✕", back chevron,
  chevron-right, overflow "⋮"): thin-line, monochrome (white on dark bars,
  gray/dark on white surfaces).

---

## 7. Interaction / Navigation Patterns
- **Modal sub-flows** (Bajaj Pay bill payment) open with a distinct blue
  header carrying back + close, signaling "you're in a focused task, not
  the main app" — always give the user an explicit close ("✕") escape
  hatch, not just back.
- **Progressive disclosure**: dense category grids default to a partial
  view (e.g. 2 rows) with "Show More" to expand — avoid dumping 20+ icons
  on first paint.
- **Inline validation**: form errors appear immediately under the field,
  not in a toast/summary — red border + icon + message triples.
- **Primary action is always docked**: the single most important CTA per
  screen sits full-width at the very bottom, gradient-filled, uppercase.
- **Cross-sell is constant but contained**: promo banners for loans/EMI
  cards are inserted between utility content (e.g. inside a bill-payment
  form) but always as a self-contained card, never blocking the primary
  task.

---

## 8. Design Tokens Summary (for quick reuse)

```
colors:
  navy-header:      #152B54
  pay-blue:         #1768C4
  orange-gradient:  linear-gradient(#F5941F, #F2711C)
  orange-accent:    #E8531F
  bg-white:         #FFFFFF
  bg-light-gray:    #F4F5F7
  border-gray:      #DADCE0
  text-primary:     #1A1A2E
  text-secondary:   #5F6368
  text-disabled:    #9AA0A6
  success-green:    #2E7D32
  success-green-bg: #E6F4EA
  error-red:        #D93025
  offer-green:      #3BAA35

radius:
  button:  9999px (pill)
  card:    12-16px
  input:   8px
  tile:    12px

spacing:
  screen-padding: 16px
  section-gap:    20-24px
  row-padding-v:  14px

type:
  screen-title:   22px / 700
  section-head:   17px / 600
  card-title:     15px / 600
  body:           14px / 400
  button-label:   14px / 700 / uppercase
  caption:        11px / 400-500
```

---

## 9. Open Questions / Assumptions to Confirm
- Exact hex values are estimated from photographs (lighting/color-cast
  varies across shots) — verify against brand guidelines if available
  before finalizing high-fidelity mocks.
- Whether "Scan QR" always sits center-and-emphasized on every bottom nav
  variant, or only these two — assumed universal signature element.
- Dark-mode equivalents were not observed in any screenshot — none
  assumed here.

---

*This document is the reference for building wireframes. When asked to
design a new screen, default to reusing the components/tokens above
rather than introducing new colors, radii, or button styles.*
