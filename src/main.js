import './style.css'
import { CLASS_STYLES, PACKS, PLAYERS } from './data.js'
import {
  createRevealState,
  createRevealTimeline,
  getPackById,
  getRevealVisibility,
  pickPlayerForPack,
  REVEAL_PHASE,
  REVEAL_STAGES,
  transitionReveal
} from './packEngine.js'
import { createSoundSystem } from './sound.js'

const FALLBACK_PORTRAIT = '/assets/players/default.svg'
const FALLBACK_TEAM_LOGO = '/assets/teams/default.svg'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const soundSystem = createSoundSystem({ globalObject: window })

let selectedPackId = PACKS[2].id
let selectedPack = getPackById(PACKS, selectedPackId)
let revealState = createRevealState()
let currentDrop = null
let revealTimers = []
let sequenceToken = 0

const app = document.querySelector('#app')
app.innerHTML = `
  <main class="shell">
    <header class="hero">
      <p class="badge">Fan-made Demo Pack Opener</p>
      <h1>Football Pack Opening Studio</h1>
      <p class="lead">Open themed demo packs, enjoy a dramatic reveal, and discover real-world footballers with unofficial demo ratings and values.</p>
    </header>

    <section class="layout" aria-label="Pack opening panel">
      <section class="panel packs" aria-labelledby="pack-title">
        <h2 id="pack-title">Choose your pack</h2>
        <div class="pack-grid" id="pack-grid" role="radiogroup" aria-label="Pack classes"></div>
      </section>

      <section class="panel reveal" aria-labelledby="reveal-title">
        <h2 id="reveal-title">Reveal tunnel</h2>
        <div class="arena" id="arena" data-phase="idle" data-stage="0">
          <div class="arena-lights" aria-hidden="true">
            <span class="sweep sweep-a"></span>
            <span class="sweep sweep-b"></span>
            <span class="beam beam-a"></span>
            <span class="beam beam-b"></span>
            <span class="vignette"></span>
            <span class="flash"></span>
          </div>
          <div class="particles" aria-hidden="true"></div>
          <div class="burst-particles" id="burst-particles" aria-hidden="true"></div>
          <div class="pack-shell" id="pack-shell">
            <p class="pack-shell__label" id="pack-shell-label"></p>
          </div>
          <div class="stage-card" id="stage-card"></div>
          <div class="status" id="status-text" role="status">Ready to open.</div>
          <div class="status-detail" id="status-detail">Select a pack and start the reveal sequence.</div>
        </div>

        <div class="actions">
          <button id="open-btn" class="btn btn-primary" type="button">Open Pack</button>
          <button id="skip-btn" class="btn" type="button" disabled>Skip Reveal</button>
          <button id="again-btn" class="btn" type="button" disabled>Open Again</button>
          <button id="sound-toggle" class="btn" type="button" aria-pressed="false" aria-label="Enable reveal sound effects">Sound: Off</button>
        </div>
        <p class="help">Use <kbd>Enter</kbd> or <kbd>Space</kbd> on focused pack cards to select.</p>
      </section>

      <aside class="panel info" aria-labelledby="info-title">
        <h2 id="info-title">Odds & demo info</h2>
        <ul id="odds-list" class="odds-list"></ul>
        <p class="disclaimer">All ratings, drop rates, and values are unofficial fictional demo data for this personal fan project.</p>
        <button id="reset-btn" class="btn btn-subtle" type="button">Reset Demo</button>
      </aside>
    </section>

    <section class="panel result" aria-labelledby="result-title">
      <h2 id="result-title">Player reveal</h2>
      <div id="result-card" class="result-card placeholder">
        <p class="result-empty">No reveal yet. Your next star appears here.</p>
      </div>
      <p class="sr-only" aria-live="polite" id="live-announcer"></p>
    </section>
  </main>
`

const packGrid = document.querySelector('#pack-grid')
const oddsList = document.querySelector('#odds-list')
const packShellLabel = document.querySelector('#pack-shell-label')
const packShell = document.querySelector('#pack-shell')
const arena = document.querySelector('#arena')
const stageCard = document.querySelector('#stage-card')
const burstParticles = document.querySelector('#burst-particles')
const statusText = document.querySelector('#status-text')
const statusDetail = document.querySelector('#status-detail')
const resultCard = document.querySelector('#result-card')
const liveAnnouncer = document.querySelector('#live-announcer')

const openBtn = document.querySelector('#open-btn')
const skipBtn = document.querySelector('#skip-btn')
const againBtn = document.querySelector('#again-btn')
const resetBtn = document.querySelector('#reset-btn')
const soundToggleBtn = document.querySelector('#sound-toggle')

function clearTimers() {
  sequenceToken += 1
  revealTimers.forEach((timer) => clearTimeout(timer))
  revealTimers = []
}

function triggerJolt(type = 'soft') {
  if (reduceMotion) {
    return
  }

  packShell.classList.remove('jolt-soft', 'jolt-hard')
  void packShell.offsetWidth
  packShell.classList.add(type === 'hard' ? 'jolt-hard' : 'jolt-soft')
}

packShell.addEventListener('animationend', () => {
  packShell.classList.remove('jolt-soft', 'jolt-hard')
})

function spawnBurstParticles() {
  if (reduceMotion) {
    burstParticles.innerHTML = ''
    return
  }

  const count = 22
  burstParticles.innerHTML = ''

  for (let index = 0; index < count; index += 1) {
    const fragment = document.createElement('span')
    fragment.className = 'burst-fragment'
    fragment.style.setProperty('--x', `${Math.random() * 100}%`)
    fragment.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`)
    fragment.style.setProperty('--delay', `${Math.random() * 120}ms`)
    fragment.style.setProperty('--duration', `${420 + Math.random() * 340}ms`)
    burstParticles.append(fragment)
  }

  burstParticles.classList.remove('active')
  void burstParticles.offsetWidth
  burstParticles.classList.add('active')
}

function renderPackOptions() {
  packGrid.innerHTML = PACKS.map(
    (pack) => `
      <button
        class="pack-option ${pack.id === selectedPackId ? 'active' : ''} ${pack.themeClass}"
        type="button"
        role="radio"
        aria-checked="${pack.id === selectedPackId}"
        data-pack-id="${pack.id}"
      >
        <span class="pack-option__name">${pack.name}</span>
        <span class="pack-option__tagline">${pack.tagline}</span>
        <span class="pack-option__cost">${pack.costLabel}</span>
      </button>
    `
  ).join('')
}

function renderOdds() {
  oddsList.innerHTML = selectedPack.dropRates
    .map(
      (rate) => `<li><span>${rate.cardClass}</span><strong>${rate.label.replace(`${rate.cardClass} `, '')}</strong></li>`
    )
    .join('')
}

function renderSoundToggle() {
  const available = soundSystem.isAvailable()
  const enabled = soundSystem.isEnabled()

  soundToggleBtn.disabled = !available
  soundToggleBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false')

  if (!available) {
    soundToggleBtn.textContent = 'Sound unavailable'
    soundToggleBtn.setAttribute('aria-label', 'Reveal sound effects are unavailable in this browser')
    return
  }

  soundToggleBtn.textContent = `Sound: ${enabled ? 'On' : 'Off'}`
  soundToggleBtn.setAttribute(
    'aria-label',
    enabled ? 'Disable reveal sound effects' : 'Enable reveal sound effects'
  )
}

function renderStageCard() {
  if (!currentDrop) {
    stageCard.innerHTML = '<p class="stage-empty">Pack diagnostics waiting for your opening command.</p>'
    return
  }

  const visibility = getRevealVisibility(revealState.phase, revealState.stageIndex)
  const { player } = currentDrop
  const teamLogo = player.teamLogo ?? FALLBACK_TEAM_LOGO
  const portrait = player.portrait ?? FALLBACK_PORTRAIT

  stageCard.innerHTML = `
    <div class="stage-row ${visibility.position ? 'is-visible' : ''}">
      <span>Position</span>
      <strong>${visibility.position ? player.position : '??'}</strong>
    </div>
    <div class="stage-row ${visibility.nation ? 'is-visible' : ''}">
      <span>Nationality</span>
      <strong>${visibility.nation ? player.nation : '??'}</strong>
    </div>
    <div class="stage-row stage-team ${visibility.team ? 'is-visible' : ''}">
      <span>Team</span>
      <strong>
        ${
          visibility.team
            ? `<img class="team-logo stage-team-logo" src="${teamLogo}" alt="${player.team} logo" loading="lazy"> ${player.team}`
            : '<span class="team-placeholder" aria-hidden="true"></span> Hidden'
        }
      </strong>
    </div>
    <div class="stage-row ${visibility.rating ? 'is-visible' : ''}">
      <span>Overall</span>
      <strong>${visibility.rating ? `${player.rating}` : '--'}</strong>
    </div>
    <div class="stage-final ${visibility.final ? 'is-visible' : ''}">
      <div class="stage-avatar">
        ${
          visibility.final
            ? `<img class="stage-portrait" src="${portrait}" alt="${player.name} portrait" loading="lazy">`
            : '<span class="stage-silhouette" aria-hidden="true"></span>'
        }
      </div>
      <p>${visibility.final ? player.name : 'Final player identity hidden'}</p>
    </div>
  `

  const stageLogo = stageCard.querySelector('.stage-team-logo')
  const stagePortrait = stageCard.querySelector('.stage-portrait')

  stageLogo?.addEventListener(
    'error',
    () => {
      stageLogo.src = FALLBACK_TEAM_LOGO
    },
    { once: true }
  )

  stagePortrait?.addEventListener(
    'error',
    () => {
      stagePortrait.src = FALLBACK_PORTRAIT
    },
    { once: true }
  )
}

function renderResultCard() {
  if (!currentDrop || revealState.phase !== REVEAL_PHASE.REVEALED) {
    resultCard.className = 'result-card placeholder'
    resultCard.innerHTML = '<p class="result-empty">No reveal yet. Your next star appears here.</p>'
    return
  }

  const { player } = currentDrop
  const classStyle = CLASS_STYLES[player.cardClass]
  const portrait = player.portrait ?? FALLBACK_PORTRAIT
  const teamLogo = player.teamLogo ?? FALLBACK_TEAM_LOGO

  resultCard.className = `result-card ${player.cardClass.toLowerCase()}`
  resultCard.style.setProperty('--class-accent', classStyle.accent)
  resultCard.innerHTML = `
    <div class="result-head">
      <p class="result-rating">${player.rating}</p>
      <p class="result-position">${player.position}</p>
    </div>
    <div class="result-avatar">
      <img class="result-portrait" src="${portrait}" alt="${player.name} portrait" loading="lazy">
    </div>
    <div class="result-body">
      <h3>${player.name}</h3>
      <p><span>Nation</span><strong>${player.nation}</strong></p>
      <p><span>Team</span><strong class="result-team"><img class="team-logo" src="${teamLogo}" alt="${player.team} logo" loading="lazy"> ${player.team}</strong></p>
      <p><span>Class</span><strong>${classStyle.label}</strong></p>
      <p><span>Value</span><strong>${player.valueLabel}</strong></p>
    </div>
  `

  const portraitImage = resultCard.querySelector('.result-portrait')
  const logoImage = resultCard.querySelector('.team-logo')

  portraitImage?.addEventListener(
    'error',
    () => {
      portraitImage.src = FALLBACK_PORTRAIT
    },
    { once: true }
  )

  logoImage?.addEventListener(
    'error',
    () => {
      logoImage.src = FALLBACK_TEAM_LOGO
    },
    { once: true }
  )
}

function renderRevealState() {
  arena.dataset.phase = revealState.phase
  arena.dataset.stage = String(revealState.stageIndex)
  packShellLabel.textContent = selectedPack.name

  if (revealState.phase === REVEAL_PHASE.IDLE) {
    statusText.textContent = 'Ready to open.'
    statusDetail.textContent = selectedPack.tagline
  }

  if (revealState.phase === REVEAL_PHASE.CHARGING) {
    if (revealState.stageIndex === 0) {
      statusText.textContent = 'Breaking pack seal'
      statusDetail.textContent = 'Stadium lights are calibrating for the reveal tunnel.'
    } else {
      const stage = REVEAL_STAGES[Math.min(revealState.stageIndex - 1, REVEAL_STAGES.length - 2)]
      statusText.textContent = `Revealing ${stage.label}`
      statusDetail.textContent = `Only ${stage.label.toLowerCase()} is now visible.`
    }
  }

  if (revealState.phase === REVEAL_PHASE.BURST) {
    statusText.textContent = 'Impact burst!'
    statusDetail.textContent = 'Energy spike detected. Final reveal incoming.'
  }

  if (revealState.phase === REVEAL_PHASE.REVEALED && currentDrop) {
    statusText.textContent = `${currentDrop.player.cardClass} pull complete`
    statusDetail.textContent = `${currentDrop.player.name} • ${currentDrop.player.rating} OVR • ${currentDrop.player.position}`
  }

  const inProgress =
    revealState.phase === REVEAL_PHASE.CHARGING || revealState.phase === REVEAL_PHASE.BURST

  openBtn.disabled = inProgress
  skipBtn.disabled = !inProgress
  againBtn.disabled = revealState.phase !== REVEAL_PHASE.REVEALED
}

function refresh() {
  selectedPack = getPackById(PACKS, selectedPackId)
  renderPackOptions()
  renderOdds()
  renderRevealState()
  renderStageCard()
  renderResultCard()
  renderSoundToggle()
}

function finalizeReveal() {
  revealState = transitionReveal(revealState, { type: 'REVEAL' })
  triggerJolt('hard')
  soundSystem.play('final-reveal')
  liveAnnouncer.textContent = `Revealed ${currentDrop.player.name}, ${currentDrop.player.rating} overall ${currentDrop.player.position} in ${currentDrop.player.cardClass} class.`
  renderRevealState()
  renderStageCard()
  renderResultCard()
}

function startSequence() {
  clearTimers()
  const timeline = createRevealTimeline({
    stageDelay: reduceMotion ? 180 : 700,
    burstDelay: reduceMotion ? 160 : 520,
    finalDelay: reduceMotion ? 120 : 260
  })
  const runToken = sequenceToken

  let elapsed = 0
  timeline.forEach((step) => {
    elapsed += step.delay
    const timer = setTimeout(() => {
      if (runToken !== sequenceToken) {
        return
      }

      revealState = transitionReveal(revealState, { type: step.type })
      if (step.type === 'NEXT_STAGE') {
        triggerJolt('soft')
      }
      if (step.type === 'BURST') {
        triggerJolt('hard')
        spawnBurstParticles()
      }

      if (step.soundHook) {
        soundSystem.play(step.soundHook)
      }

      if (step.type === 'REVEAL') {
        finalizeReveal()
        return
      }

      renderRevealState()
      renderStageCard()
    }, elapsed)

    revealTimers.push(timer)
  })
}

function openPack() {
  clearTimers()
  burstParticles.classList.remove('active')
  burstParticles.innerHTML = ''
  currentDrop = pickPlayerForPack(selectedPack, PLAYERS)
  revealState = transitionReveal(revealState, { type: 'OPEN' })
  triggerJolt('soft')
  soundSystem.play('pack-open')
  renderRevealState()
  renderStageCard()
  renderResultCard()
  startSequence()
}

function skipReveal() {
  if (revealState.phase !== REVEAL_PHASE.CHARGING && revealState.phase !== REVEAL_PHASE.BURST) {
    return
  }
  clearTimers()
  revealState = transitionReveal(revealState, { type: 'SKIP' })
  soundSystem.play('final-reveal')
  renderRevealState()
  renderStageCard()
  renderResultCard()

  if (currentDrop) {
    liveAnnouncer.textContent = `Skipped animation. ${currentDrop.player.name} revealed.`
  }
}

function resetDemo() {
  clearTimers()
  revealState = transitionReveal(revealState, { type: 'RESET' })
  currentDrop = null
  selectedPackId = PACKS[2].id
  liveAnnouncer.textContent = 'Demo reset. Pack selection returned to default.'
  burstParticles.classList.remove('active')
  burstParticles.innerHTML = ''
  refresh()
}

packGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pack-id]')
  if (!button || revealState.phase === REVEAL_PHASE.CHARGING || revealState.phase === REVEAL_PHASE.BURST) {
    return
  }

  selectedPackId = button.dataset.packId
  revealState = transitionReveal(revealState, { type: 'RESET' })
  currentDrop = null
  burstParticles.classList.remove('active')
  burstParticles.innerHTML = ''
  refresh()
})

soundToggleBtn.addEventListener('click', async () => {
  await soundSystem.toggle()
  renderSoundToggle()
})

openBtn.addEventListener('click', openPack)
againBtn.addEventListener('click', openPack)
skipBtn.addEventListener('click', skipReveal)
resetBtn.addEventListener('click', resetDemo)

refresh()
