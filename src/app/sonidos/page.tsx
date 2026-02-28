'use client'

import { useState, useRef, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import { CloudRain, Wind, Waves, Flame, TreePine, Bird, Volume2, VolumeX, Moon, Zap } from 'lucide-react'

type SoundConfig = {
  id: string
  label: string
  icon: typeof CloudRain
  color: string
  frequency: number
  type: OscillatorType | 'noise'
}

const sounds: SoundConfig[] = [
  { id: 'rain', label: 'Lluvia', icon: CloudRain, color: 'text-blue-400 bg-blue-500/15', frequency: 200, type: 'noise' },
  { id: 'wind', label: 'Viento', icon: Wind, color: 'text-cyan-400 bg-cyan-500/15', frequency: 120, type: 'noise' },
  { id: 'waves', label: 'Olas', icon: Waves, color: 'text-sky-400 bg-sky-500/15', frequency: 80, type: 'noise' },
  { id: 'fire', label: 'Fuego', icon: Flame, color: 'text-orange-400 bg-orange-500/15', frequency: 300, type: 'noise' },
  { id: 'forest', label: 'Bosque', icon: TreePine, color: 'text-green-400 bg-green-500/15', frequency: 150, type: 'noise' },
  { id: 'birds', label: 'Pájaros', icon: Bird, color: 'text-amber-400 bg-amber-500/15', frequency: 2000, type: 'sine' },
  { id: 'bowl', label: 'Cuenco', icon: Moon, color: 'text-violet-400 bg-violet-500/15', frequency: 432, type: 'sine' },
  { id: 'binaural', label: 'Binaural', icon: Zap, color: 'text-rose-400 bg-rose-500/15', frequency: 200, type: 'sine' },
]

function createNoise(audioCtx: AudioContext, frequency: number): { source: AudioBufferSourceNode; gain: GainNode } {
  const bufferSize = audioCtx.sampleRate * 4
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)

  // Brown noise for natural ambient sounds
  let lastOut = 0
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1
    data[i] = (lastOut + 0.02 * white) / 1.02
    lastOut = data[i]
    data[i] *= 3.5
  }

  const source = audioCtx.createBufferSource()
  source.buffer = buffer
  source.loop = true

  // Filter to shape the sound
  const filter = audioCtx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = frequency

  const gain = audioCtx.createGain()
  gain.gain.value = 0

  source.connect(filter)
  filter.connect(gain)
  gain.connect(audioCtx.destination)
  source.start()

  return { source, gain }
}

function createTone(audioCtx: AudioContext, frequency: number, type: OscillatorType): { source: OscillatorNode; gain: GainNode } {
  const osc = audioCtx.createOscillator()
  osc.type = type
  osc.frequency.value = frequency

  const gain = audioCtx.createGain()
  gain.gain.value = 0

  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start()

  return { source: osc, gain }
}

type ActiveSound = {
  source: AudioBufferSourceNode | OscillatorNode
  gain: GainNode
  volume: number
}

export default function SonidosPage() {
  const [volumes, setVolumes] = useState<Record<string, number>>({})
  const [muted, setMuted] = useState(false)
  const [activeSounds, setActiveSounds] = useState<Record<string, ActiveSound>>({})
  const audioCtxRef = useRef<AudioContext | null>(null)

  const getOrCreateCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  useEffect(() => {
    return () => {
      Object.values(activeSounds).forEach(s => {
        try { s.source.stop() } catch {}
      })
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const toggleSound = (sound: SoundConfig) => {
    const ctx = getOrCreateCtx()

    if (activeSounds[sound.id]) {
      // Stop
      try { activeSounds[sound.id].source.stop() } catch {}
      const newActive = { ...activeSounds }
      delete newActive[sound.id]
      setActiveSounds(newActive)
      const newVolumes = { ...volumes }
      delete newVolumes[sound.id]
      setVolumes(newVolumes)
      return
    }

    // Start
    const defaultVolume = 0.5
    let result: { source: any; gain: GainNode }

    if (sound.type === 'noise') {
      result = createNoise(ctx, sound.frequency)
    } else {
      result = createTone(ctx, sound.frequency, sound.type)
    }

    result.gain.gain.setValueAtTime(muted ? 0 : defaultVolume * 0.3, ctx.currentTime)

    setActiveSounds(prev => ({
      ...prev,
      [sound.id]: { source: result.source, gain: result.gain, volume: defaultVolume }
    }))
    setVolumes(prev => ({ ...prev, [sound.id]: defaultVolume }))
  }

  const updateVolume = (soundId: string, value: number) => {
    setVolumes(prev => ({ ...prev, [soundId]: value }))
    if (activeSounds[soundId] && !muted) {
      const ctx = getOrCreateCtx()
      activeSounds[soundId].gain.gain.setTargetAtTime(value * 0.3, ctx.currentTime, 0.1)
    }
  }

  const toggleMute = () => {
    const ctx = getOrCreateCtx()
    const newMuted = !muted
    setMuted(newMuted)
    Object.entries(activeSounds).forEach(([id, sound]) => {
      sound.gain.gain.setTargetAtTime(
        newMuted ? 0 : (volumes[id] || 0.5) * 0.3,
        ctx.currentTime,
        0.1
      )
    })
  }

  const activeCount = Object.keys(activeSounds).length

  return (
    <div className="relative overflow-hidden">
      <div className="orb w-72 h-72 bg-blue-600 top-10 -left-24" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-white mb-1 animate-fade-in">Sonidos</h1>
              <p className="text-text-secondary text-sm animate-fade-in-up">Mezcla tu ambiente perfecto.</p>
            </div>
            {activeCount > 0 && (
              <button
                onClick={toggleMute}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-text-secondary active:scale-90 transition-transform"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <FadeInSection>
            <div className="grid grid-cols-2 gap-3">
              {sounds.map((sound) => {
                const isActive = !!activeSounds[sound.id]
                return (
                  <div key={sound.id} className={`glass rounded-2xl p-4 transition-all ${isActive ? 'ring-1 ring-white/10' : ''}`}>
                    <button
                      onClick={() => toggleSound(sound)}
                      className="w-full flex flex-col items-center gap-3 mb-3 active:scale-95 transition-transform"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${sound.color} flex items-center justify-center transition-all ${
                        isActive ? 'scale-110' : ''
                      }`}>
                        <sound.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-text-secondary'}`}>
                        {sound.label}
                      </span>
                    </button>
                    {isActive && (
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(volumes[sound.id] || 0.5) * 100}
                        onChange={(e) => updateVolume(sound.id, parseInt(e.target.value) / 100)}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, rgba(255,255,255,0.3) ${(volumes[sound.id] || 0.5) * 100}%, rgba(255,255,255,0.06) ${(volumes[sound.id] || 0.5) * 100}%)`,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {activeCount > 0 && (
              <div className="mt-6 glass rounded-2xl p-4 text-center">
                <p className="text-text-secondary text-sm">
                  {activeCount} sonido{activeCount > 1 ? 's' : ''} activo{activeCount > 1 ? 's' : ''}
                </p>
                <p className="text-text-muted text-xs mt-1">Usa mientras meditas, trabajas o descansas</p>
              </div>
            )}
          </FadeInSection>
        </Container>
      </section>
    </div>
  )
}
