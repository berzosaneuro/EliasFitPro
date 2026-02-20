'use client'

import { useState } from 'react'
import PremiumLock from '@/components/PremiumLock'
import PremiumBadge from '@/components/PremiumBadge'
import { Brain, Timer, Moon, Crosshair, Play, Pause } from 'lucide-react'

const meditations = [
  { title: 'Reset mental', duration: '5 min', icon: Brain, description: 'Limpia tu mente y empieza de cero.', free: true },
  { title: 'Ansiedad', duration: '8 min', icon: Timer, description: 'Reduce la activación nerviosa.', free: false },
  { title: 'Insomnio', duration: '12 min', icon: Moon, description: 'Relaja cuerpo y mente para dormir.', free: false },
  { title: 'Presencia profunda', duration: '10 min', icon: Crosshair, description: 'Conciencia expandida y observación.', free: false },
]

function MeditationCard({ m, playing, setPlaying }: {
  m: typeof meditations[0]
  playing: string | null
  setPlaying: (v: string | null) => void
}) {
  const isPlaying = playing === m.title
  return (
    <div className="glass rounded-2xl p-5 flex flex-col card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-accent-blue/15 flex items-center justify-center">
          <m.icon className="w-5 h-5 text-accent-blue" />
        </div>
        <div className="flex items-center gap-2">
          {!m.free && <PremiumBadge />}
          <span className="text-text-muted text-xs">{m.duration}</span>
        </div>
      </div>
      <h3 className="font-heading font-semibold text-white text-base mb-1">{m.title}</h3>
      <p className="text-text-secondary text-sm mb-4 flex-1">{m.description}</p>
      <button
        onClick={() => setPlaying(isPlaying ? null : m.title)}
        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
          isPlaying
            ? 'bg-accent-blue/15 text-accent-blue'
            : 'bg-white/5 text-white'
        }`}
      >
        {isPlaying ? (
          <><Pause className="w-4 h-4" /> Pausar</>
        ) : (
          <><Play className="w-4 h-4" /> Reproducir</>
        )}
      </button>
    </div>
  )
}

export default function MeditationCards() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {meditations.map((m) =>
        m.free ? (
          <MeditationCard key={m.title} m={m} playing={playing} setPlaying={setPlaying} />
        ) : (
          <PremiumLock key={m.title} label={`${m.title} — Premium`}>
            <MeditationCard m={m} playing={playing} setPlaying={setPlaying} />
          </PremiumLock>
        )
      )}
    </div>
  )
}
