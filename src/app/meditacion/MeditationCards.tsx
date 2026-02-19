'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import { Brain, Timer, Moon, Crosshair, Play, Pause } from 'lucide-react'

const meditations = [
  { title: 'Reset mental', duration: '5 min', icon: Brain, description: 'Limpia tu mente y empieza de cero. Ideal para momentos de saturación.' },
  { title: 'Ansiedad', duration: '8 min', icon: Timer, description: 'Reduce la activación del sistema nervioso y regresa al presente.' },
  { title: 'Insomnio', duration: '12 min', icon: Moon, description: 'Relaja cuerpo y mente para facilitar un sueño profundo y reparador.' },
  { title: 'Presencia profunda', duration: '10 min', icon: Crosshair, description: 'Entra en un estado de conciencia expandida y observación pura.' },
]

export default function MeditationCards() {
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {meditations.map((m) => (
        <Card key={m.title} className="flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <m.icon className="w-8 h-8 text-accent-blue" />
            <span className="text-text-secondary text-xs font-mono">{m.duration}</span>
          </div>
          <h3 className="font-heading font-semibold text-white text-lg mb-2">{m.title}</h3>
          <p className="text-text-secondary text-sm mb-6 flex-1">{m.description}</p>
          <button
            onClick={() => setPlaying(playing === m.title ? null : m.title)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-dark-primary border border-dark-border rounded-lg text-sm text-white hover:border-accent-blue/50 transition-all cursor-pointer"
          >
            {playing === m.title ? (
              <>
                <Pause className="w-4 h-4 text-accent-blue" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-accent-blue" />
                <span>Reproducir</span>
              </>
            )}
          </button>
        </Card>
      ))}
    </div>
  )
}
