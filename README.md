# FCOP - Football Pack Opening Demo

A fan-made, single-page football pack-opening demo inspired by the excitement of football games.

> This project is an original demo experience. All packs, drop rates, players, teams, and values are fictional and for presentation/testing only.

## Features

- Responsive pack-opening interface with five pack classes:
  - Bronze Booster
  - Silver Surge
  - Gold Gala
  - Elite Ignition
  - Legend Vault
- Distinct visual themes, demo cost labels, and fictional drop rates per pack
- Animated reveal flow with suspense stages, burst phase, skip control, and open-again interaction
- Fictional footballer cards with rating, position, nation, team label, class, and demo value label
- Keyboard-accessible controls, visible focus states, and aria-live reveal announcements
- Reduced-motion support via `prefers-reduced-motion`
- Testable logic modules for pack selection, weighted drops, and reveal-state transitions

## Scripts

```bash
npm install
npm run dev
npm run test
npm run build
npm run preview
```

## Testing Notes

Unit tests cover:

- Pack lookup/selection behavior
- Weighted class/player selection behavior
- Reveal state machine transitions (`OPEN`, `NEXT_STAGE`, `BURST`, `SKIP`, `REVEAL`, `RESET`)
