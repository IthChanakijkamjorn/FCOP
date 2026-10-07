export const REVEAL_PHASE = {
  IDLE: 'idle',
  CHARGING: 'charging',
  BURST: 'burst',
  REVEALED: 'revealed'
}

export function getPackById(packs, id) {
  return packs.find((pack) => pack.id === id) ?? packs[0]
}

export function pickWeighted(items, rng = Math.random) {
  const total = items.reduce((sum, item) => sum + item.weight, 0)
  if (!total) {
    throw new Error('Weighted pick requires at least one positive weight.')
  }

  const roll = rng() * total
  let cursor = 0

  for (const item of items) {
    cursor += item.weight
    if (roll < cursor) {
      return item
    }
  }

  return items[items.length - 1]
}

export function pickPlayerForPack(pack, players, rng = Math.random) {
  const selectedClass = pickWeighted(pack.dropRates, rng).cardClass
  const pool = players.filter((player) => player.cardClass === selectedClass)

  if (!pool.length) {
    throw new Error(`No players configured for card class: ${selectedClass}`)
  }

  const index = Math.floor(rng() * pool.length)
  return {
    selectedClass,
    player: pool[index]
  }
}

export function createRevealState() {
  return {
    phase: REVEAL_PHASE.IDLE,
    stageIndex: 0
  }
}

export function transitionReveal(state, event) {
  switch (event.type) {
    case 'OPEN':
      return { phase: REVEAL_PHASE.CHARGING, stageIndex: 0 }
    case 'NEXT_STAGE':
      if (state.phase !== REVEAL_PHASE.CHARGING) {
        return state
      }
      return { phase: REVEAL_PHASE.CHARGING, stageIndex: state.stageIndex + 1 }
    case 'BURST':
      if (state.phase !== REVEAL_PHASE.CHARGING) {
        return state
      }
      return { phase: REVEAL_PHASE.BURST, stageIndex: state.stageIndex }
    case 'REVEAL':
    case 'SKIP':
      if (state.phase === REVEAL_PHASE.IDLE) {
        return state
      }
      return { phase: REVEAL_PHASE.REVEALED, stageIndex: state.stageIndex }
    case 'RESET':
      return createRevealState()
    default:
      return state
  }
}
