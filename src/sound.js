export const SOUND_HOOKS = [
  'pack-open',
  'stage-reveal',
  'team-reveal',
  'rating-reveal',
  'final-reveal'
]

const TONE_LIBRARY = {
  'pack-open': [
    { frequency: 164, duration: 0.1, type: 'sawtooth', gain: 0.05 },
    { frequency: 220, duration: 0.12, type: 'triangle', gain: 0.04, offset: 0.06 }
  ],
  'stage-reveal': [{ frequency: 320, duration: 0.08, type: 'triangle', gain: 0.04 }],
  'team-reveal': [{ frequency: 420, duration: 0.09, type: 'square', gain: 0.04 }],
  'rating-reveal': [{ frequency: 520, duration: 0.1, type: 'sine', gain: 0.05 }],
  'final-reveal': [
    { frequency: 620, duration: 0.12, type: 'triangle', gain: 0.05 },
    { frequency: 930, duration: 0.18, type: 'sine', gain: 0.035, offset: 0.08 }
  ]
}

export function getTonePlan(hook) {
  return TONE_LIBRARY[hook] ?? []
}

export function createSoundSystem({ contextFactory, globalObject = globalThis } = {}) {
  const AudioContextCtor =
    contextFactory ? null : globalObject?.AudioContext ?? globalObject?.webkitAudioContext ?? null

  let context = null
  let enabled = false

  const isAvailable = () => Boolean(contextFactory || AudioContextCtor)
  const isEnabled = () => enabled

  const ensureContext = () => {
    if (context) {
      return context
    }

    try {
      context = contextFactory ? contextFactory() : new AudioContextCtor()
      return context
    } catch {
      context = null
      return null
    }
  }

  const enable = async () => {
    if (!isAvailable()) {
      enabled = false
      return false
    }

    const nextContext = ensureContext()
    if (!nextContext) {
      enabled = false
      return false
    }

    try {
      if (nextContext.state === 'suspended' && typeof nextContext.resume === 'function') {
        await nextContext.resume()
      }
      enabled = true
      return true
    } catch {
      enabled = false
      return false
    }
  }

  const disable = () => {
    enabled = false
  }

  const toggle = async () => {
    if (enabled) {
      disable()
      return false
    }
    return enable()
  }

  const play = (hook) => {
    if (!enabled) {
      return false
    }

    const nextContext = ensureContext()
    if (!nextContext) {
      return false
    }

    const tones = getTonePlan(hook)
    if (!tones.length) {
      return false
    }

    try {
      for (const tone of tones) {
        const oscillator = nextContext.createOscillator()
        const gainNode = nextContext.createGain()
        const startAt = nextContext.currentTime + (tone.offset ?? 0)
        const stopAt = startAt + tone.duration

        oscillator.type = tone.type
        oscillator.frequency.setValueAtTime(tone.frequency, startAt)
        gainNode.gain.setValueAtTime(tone.gain, startAt)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, stopAt)

        oscillator.connect(gainNode)
        gainNode.connect(nextContext.destination)
        oscillator.start(startAt)
        oscillator.stop(stopAt)
      }
      return true
    } catch {
      return false
    }
  }

  return {
    disable,
    enable,
    isAvailable,
    isEnabled,
    play,
    toggle
  }
}
