import { describe, expect, it } from 'vitest'
import { PACKS, PLAYERS } from './data.js'
import {
  createRevealState,
  getPackById,
  pickPlayerForPack,
  pickWeighted,
  REVEAL_PHASE,
  transitionReveal
} from './packEngine.js'

describe('pack selection', () => {
  it('returns matching pack by id', () => {
    const pack = getPackById(PACKS, 'elite-ignition')
    expect(pack.name).toBe('Elite Ignition')
  })

  it('falls back to first pack when id is missing', () => {
    const pack = getPackById(PACKS, 'unknown-pack')
    expect(pack.id).toBe(PACKS[0].id)
  })
})

describe('weighted selection', () => {
  it('picks item using weight boundaries', () => {
    const pick = pickWeighted(
      [
        { value: 'A', weight: 30 },
        { value: 'B', weight: 70 }
      ],
      () => 0.5
    )

    expect(pick.value).toBe('B')
  })

  it('returns a player from chosen class pool', () => {
    const pack = getPackById(PACKS, 'legend-vault')

    const drop = pickPlayerForPack(pack, PLAYERS, () => 0.99)
    expect(['Elite', 'Legend']).toContain(drop.selectedClass)
    expect(drop.player.cardClass).toBe(drop.selectedClass)
  })
})

describe('player dataset integrity', () => {
  const roleChecks = {
    GK: (position) => position === 'GK',
    DEF: (position) => ['CB', 'RB', 'LB', 'RWB', 'LWB'].includes(position),
    MID: (position) => ['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(position),
    FWD: (position) => ['LW', 'RW', 'ST', 'CF'].includes(position)
  }

  it('contains at least 100 players', () => {
    expect(PLAYERS.length).toBeGreaterThanOrEqual(100)
  })

  it('keeps every class stocked with balanced roles', () => {
    const classes = ['Bronze', 'Silver', 'Gold', 'Elite', 'Legend']

    for (const cardClass of classes) {
      const classPlayers = PLAYERS.filter((player) => player.cardClass === cardClass)
      expect(classPlayers.length).toBeGreaterThan(0)

      for (const hasRole of Object.values(roleChecks)) {
        expect(classPlayers.some((player) => hasRole(player.position))).toBe(true)
      }
    }
  })

  it('includes local portrait and logo paths', () => {
    for (const player of PLAYERS) {
      expect(player.portrait).toMatch(/^\/assets\/players\/.+\.svg$/)
      expect(player.teamLogo).toMatch(/^\/assets\/teams\/.+\.svg$/)
    }
  })
})

describe('reveal state transitions', () => {
  it('moves from open to reveal', () => {
    let state = createRevealState()
    expect(state.phase).toBe(REVEAL_PHASE.IDLE)

    state = transitionReveal(state, { type: 'OPEN' })
    expect(state.phase).toBe(REVEAL_PHASE.CHARGING)
    expect(state.stageIndex).toBe(0)

    state = transitionReveal(state, { type: 'NEXT_STAGE' })
    expect(state.stageIndex).toBe(1)

    state = transitionReveal(state, { type: 'BURST' })
    expect(state.phase).toBe(REVEAL_PHASE.BURST)

    state = transitionReveal(state, { type: 'REVEAL' })
    expect(state.phase).toBe(REVEAL_PHASE.REVEALED)
  })

  it('supports skipping and reset', () => {
    let state = transitionReveal(createRevealState(), { type: 'OPEN' })
    state = transitionReveal(state, { type: 'SKIP' })
    expect(state.phase).toBe(REVEAL_PHASE.REVEALED)

    state = transitionReveal(state, { type: 'RESET' })
    expect(state).toEqual(createRevealState())
  })
})
