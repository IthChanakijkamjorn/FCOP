import './style.css'
import { CLASS_STYLES, PACKS, PLAYERS } from './data.js'
import {
  createRevealState,
  getPackById,
  pickPlayerForPack,
  REVEAL_PHASE,
  transitionReveal
} from './packEngine.js'

const REVEAL_STEPS = [
  'Calibrating floodlights',
  'Scanning player signal',
  'Locking final reveal'
]

const FALLBACK_PORTRAIT = '/assets/players/default.svg'
const FALLBACK_TEAM_LOGO = '/assets/teams/default.svg'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let selectedPackId = PACKS[2].id
let selectedPack = getPackById(PACKS, selectedPackId)
let revealState = createRevealState()
let currentDrop = null
let revealTimers = []

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
        <div class="arena" id="arena" data-phase="idle">
          <div class="particles" aria-hidden="true"></div>
          <div class="pack-shell" id="pack-shell">
            <p class="pack-shell__label" id="pack-shell-label"></p>
          </div>
          <div class="status" id="status-text" role="status">Ready to open.</div>
          <div class="status-detail" id="status-detail">Select a pack and start the reveal sequence.</div>
        </div>

        <div class="actions">
          <button id="open-btn" class="btn btn-primary" type="button">Open Pack</button>
          <button id="skip-btn" class="btn" type="button" disabled>Skip Reveal</button>
          <button id="again-btn" class="btn" type="button" disabled>Open Again</button>
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
const arena = document.querySelector('#arena')
const statusText = document.querySelector('#status-text')
const statusDetail = document.querySelector('#status-detail')
const resultCard = document.querySelector('#result-card')
const liveAnnouncer = document.querySelector('#live-announcer')

const openBtn = document.querySelector('#open-btn')
const skipBtn = document.querySelector('#skip-btn')
const againBtn = document.querySelector('#again-btn')
const resetBtn = document.querySelector('#reset-btn')

function clearTimers() {
  revealTimers.forEach((timer) => clearTimeout(timer))
  revealTimers = []
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

  portraitImage?.addEventListener('error', () => {
    portraitImage.src = FALLBACK_PORTRAIT
  }, { once: true })

  logoImage?.addEventListener('error', () => {
    logoImage.src = FALLBACK_TEAM_LOGO
  }, { once: true })
}

function renderRevealState() {
  arena.dataset.phase = revealState.phase
  packShellLabel.textContent = selectedPack.name

  if (revealState.phase === REVEAL_PHASE.IDLE) {
    statusText.textContent = 'Ready to open.'
    statusDetail.textContent = selectedPack.tagline
  }

  if (revealState.phase === REVEAL_PHASE.CHARGING) {
    const stepIndex = Math.min(revealState.stageIndex, REVEAL_STEPS.length - 1)
    statusText.textContent = `Charging ${stepIndex + 1}/${REVEAL_STEPS.length}`
    statusDetail.textContent = REVEAL_STEPS[stepIndex]
  }

  if (revealState.phase === REVEAL_PHASE.BURST) {
    statusText.textContent = 'Reveal blast!'
    statusDetail.textContent = 'Signal locked. Final card incoming.'
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
  renderResultCard()
}

function finalizeReveal() {
  revealState = transitionReveal(revealState, { type: 'REVEAL' })
  liveAnnouncer.textContent = `Revealed ${currentDrop.player.name}, ${currentDrop.player.rating} overall ${currentDrop.player.position} in ${currentDrop.player.cardClass} class.`
  renderRevealState()
  renderResultCard()
}

function startSequence() {
  clearTimers()
  const stageDelay = reduceMotion ? 120 : 700
  const burstDelay = reduceMotion ? 120 : 540

  const runStage = (stage) => {
    if (stage < REVEAL_STEPS.length) {
      revealTimers.push(
        setTimeout(() => {
          revealState = transitionReveal(revealState, { type: 'NEXT_STAGE' })
          renderRevealState()
          runStage(stage + 1)
        }, stageDelay)
      )
      return
    }

    revealTimers.push(
      setTimeout(() => {
        revealState = transitionReveal(revealState, { type: 'BURST' })
        renderRevealState()

        revealTimers.push(
          setTimeout(() => {
            finalizeReveal()
          }, burstDelay)
        )
      }, stageDelay)
    )
  }

  runStage(0)
}

function openPack() {
  currentDrop = pickPlayerForPack(selectedPack, PLAYERS)
  revealState = transitionReveal(revealState, { type: 'OPEN' })
  renderRevealState()
  renderResultCard()

  if (reduceMotion) {
    finalizeReveal()
    return
  }

  startSequence()
}

function skipReveal() {
  if (revealState.phase !== REVEAL_PHASE.CHARGING && revealState.phase !== REVEAL_PHASE.BURST) {
    return
  }
  clearTimers()
  revealState = transitionReveal(revealState, { type: 'SKIP' })
  renderRevealState()
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
  refresh()
})

openBtn.addEventListener('click', openPack)
againBtn.addEventListener('click', openPack)
skipBtn.addEventListener('click', skipReveal)
resetBtn.addEventListener('click', resetDemo)

refresh()
