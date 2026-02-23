'use client'

import { useState } from 'react'
import PremiumLock from '@/components/PremiumLock'
import PremiumBadge from '@/components/PremiumBadge'
import { Brain, Timer, Moon, Crosshair, Play, Pause, Heart, Shield, Flame, Wind, Eye, Sun, Zap, Target, Clock, Tag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Meditation = {
  title: string
  minutes: number
  icon: LucideIcon
  description: string
  free: boolean
  theme: string
}

const meditations: Meditation[] = [
  // Ansiedad / Calma
  { title: 'Calma rápida', minutes: 3, icon: Wind, description: 'Respiración guiada para cortar ansiedad en 3 minutos.', free: true, theme: 'Ansiedad' },
  { title: 'Reset mental', minutes: 5, icon: Brain, description: 'Limpia tu mente y empieza de cero. Ideal para saturación.', free: true, theme: 'Ansiedad' },
  { title: 'Reducir ansiedad', minutes: 8, icon: Timer, description: 'Reduce la activación del sistema nervioso simpático.', free: false, theme: 'Ansiedad' },
  { title: 'Ansiedad profunda', minutes: 15, icon: Shield, description: 'Sesión completa para desactivar la respuesta de estrés crónico.', free: false, theme: 'Ansiedad' },

  // Presencia / Atención
  { title: 'Micro-presencia', minutes: 3, icon: Crosshair, description: '3 minutos para volver al aquí y ahora.', free: true, theme: 'Presencia' },
  { title: 'Atención plena', minutes: 10, icon: Eye, description: 'Entrena tu foco atencional sin distracción.', free: false, theme: 'Presencia' },
  { title: 'Presencia profunda', minutes: 15, icon: Crosshair, description: 'Desactiva la red neuronal por defecto. Estado de observación pura.', free: false, theme: 'Presencia' },
  { title: 'Flow state', minutes: 20, icon: Zap, description: 'Meditación para entrar en estado de flujo antes de trabajar.', free: false, theme: 'Presencia' },

  // Sueño
  { title: 'Pre-sueño', minutes: 5, icon: Moon, description: 'Relajación rápida para facilitar el sueño.', free: true, theme: 'Sueño' },
  { title: 'Insomnio leve', minutes: 12, icon: Moon, description: 'Relaja cuerpo y mente para un sueño reparador.', free: false, theme: 'Sueño' },
  { title: 'Sueño profundo', minutes: 20, icon: Moon, description: 'Sesión completa de relajación progresiva para insomnio crónico.', free: false, theme: 'Sueño' },

  // Emociones
  { title: 'Autocompasión', minutes: 5, icon: Heart, description: 'Conecta con la bondad hacia ti mismo.', free: true, theme: 'Emociones' },
  { title: 'Soltar el enfado', minutes: 8, icon: Flame, description: 'Observa la ira sin reaccionar. Déjala pasar.', free: false, theme: 'Emociones' },
  { title: 'Regulación emocional', minutes: 12, icon: Heart, description: 'Técnicas para procesar emociones sin reprimirlas.', free: false, theme: 'Emociones' },

  // Energía / Mañana
  { title: 'Despertar consciente', minutes: 5, icon: Sun, description: 'Empieza el día con intención y claridad mental.', free: true, theme: 'Energía' },
  { title: 'Activación matutina', minutes: 8, icon: Zap, description: 'Respiración energizante + visualización del día.', free: false, theme: 'Energía' },
  { title: 'Claridad y foco', minutes: 10, icon: Target, description: 'Prepara tu mente para máximo rendimiento.', free: false, theme: 'Energía' },
]

const themes = ['Todas', 'Ansiedad', 'Presencia', 'Sueño', 'Emociones', 'Energía']
const durations = ['Todas', '3-5 min', '8-12 min', '15-20 min']

function getDurationRange(filter: string): [number, number] {
  switch (filter) {
    case '3-5 min': return [3, 5]
    case '8-12 min': return [8, 12]
    case '15-20 min': return [15, 20]
    default: return [0, 999]
  }
}

function MeditationCard({ m, playing, setPlaying }: {
  m: Meditation
  playing: string | null
  setPlaying: (v: string | null) => void
}) {
  const isPlaying = playing === m.title
  return (
    <div className="glass rounded-2xl p-4 flex flex-col card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center">
          <m.icon className="w-5 h-5 text-accent-blue" />
        </div>
        <div className="flex items-center gap-2">
          {!m.free && <PremiumBadge />}
          <span className="text-text-muted text-xs">{m.minutes} min</span>
        </div>
      </div>
      <h3 className="font-heading font-semibold text-white text-sm mb-0.5">{m.title}</h3>
      <p className="text-text-secondary text-xs mb-3 flex-1 line-clamp-2">{m.description}</p>
      <button
        onClick={() => setPlaying(isPlaying ? null : m.title)}
        className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
          isPlaying ? 'bg-accent-blue/15 text-accent-blue' : 'bg-white/5 text-white'
        }`}
      >
        {isPlaying ? <><Pause className="w-3.5 h-3.5" /> Pausar</> : <><Play className="w-3.5 h-3.5" /> Reproducir</>}
      </button>
    </div>
  )
}

export default function MeditationCards() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [themeFilter, setThemeFilter] = useState('Todas')
  const [durationFilter, setDurationFilter] = useState('Todas')

  const [minDur, maxDur] = getDurationRange(durationFilter)

  const filtered = meditations.filter((m) => {
    const themeMatch = themeFilter === 'Todas' || m.theme === themeFilter
    const durMatch = m.minutes >= minDur && m.minutes <= maxDur
    return themeMatch && durMatch
  })

  const freeCount = filtered.filter(m => m.free).length
  const premiumCount = filtered.filter(m => !m.free).length

  return (
    <div>
      {/* Theme filters */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-text-muted text-xs font-medium">Tema</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setThemeFilter(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                themeFilter === t
                  ? 'bg-accent-blue text-white'
                  : 'bg-white/5 text-text-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Duration filters */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-text-muted text-xs font-medium">Duración</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDurationFilter(d)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                durationFilter === d
                  ? 'bg-accent-blue text-white'
                  : 'bg-white/5 text-text-secondary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-text-muted text-xs">{filtered.length} meditaciones</span>
        <span className="text-text-muted text-xs">·</span>
        <span className="text-green-400 text-xs">{freeCount} gratis</span>
        {premiumCount > 0 && (
          <>
            <span className="text-text-muted text-xs">·</span>
            <span className="text-yellow-400 text-xs">{premiumCount} premium</span>
          </>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((m) =>
            m.free ? (
              <MeditationCard key={m.title} m={m} playing={playing} setPlaying={setPlaying} />
            ) : (
              <PremiumLock key={m.title} label={`${m.title}`}>
                <MeditationCard m={m} playing={playing} setPlaying={setPlaying} />
              </PremiumLock>
            )
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-text-muted text-sm">No hay meditaciones con estos filtros.</p>
          <button
            onClick={() => { setThemeFilter('Todas'); setDurationFilter('Todas') }}
            className="mt-3 text-accent-blue text-sm font-medium active:opacity-70"
          >
            Ver todas
          </button>
        </div>
      )}
    </div>
  )
}
