export const REVEAL_PHASE = {
  IDLE: 'idle',
  CHARGING: 'charging',
  BURST: 'burst',
  REVEALED: 'revealed'
}

export const REVEAL_STAGES = [
  { key: 'position', label: 'Position', soundHook: 'stage-reveal' },
  { key: 'nation', label: 'Nationality', soundHook: 'stage-reveal' },
  { key: 'team', label: 'Team', soundHook: 'team-reveal' },
  { key: 'rating', label: 'Overall Rating', soundHook: 'rating-reveal' },
  { key: 'final', label: 'Final Reveal', soundHook: 'final-reveal' }
]

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

export function createRevealTimeline({ stageDelay, burstDelay, finalDelay } = {}) {
  const resolvedStageDelay = stageDelay ?? 700
  const resolvedBurstDelay = burstDelay ?? 540
  const resolvedFinalDelay = finalDelay ?? 260
  const timeline = []

  for (const stage of REVEAL_STAGES.slice(0, -1)) {
    timeline.push({
      type: 'NEXT_STAGE',
      delay: resolvedStageDelay,
      stageKey: stage.key,
      soundHook: stage.soundHook
    })
  }

  timeline.push({ type: 'BURST', delay: resolvedBurstDelay, soundHook: 'stage-reveal' })
  timeline.push({ type: 'REVEAL', delay: resolvedFinalDelay, soundHook: 'final-reveal' })

  return timeline
}

export function getRevealVisibility(phase, stageIndex) {
  const visible = {
    position: false,
    nation: false,
    team: false,
    rating: false,
    final: false
  }

  if (phase === REVEAL_PHASE.IDLE) {
    return visible
  }

  const revealedCount =
    phase === REVEAL_PHASE.REVEALED
      ? REVEAL_STAGES.length
      : Math.max(0, Math.min(stageIndex, REVEAL_STAGES.length - 1))

  for (const stage of REVEAL_STAGES.slice(0, revealedCount)) {
    visible[stage.key] = true
  }

  return visible
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
