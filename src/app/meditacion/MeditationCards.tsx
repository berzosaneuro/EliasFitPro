'use client'

import { useState } from 'react'
import PremiumLock from '@/components/PremiumLock'
import PremiumBadge from '@/components/PremiumBadge'
import { Brain, Timer, Moon, Crosshair, Play, Pause, Heart, Shield, Flame, Wind, Eye, Sun, Zap, Target, Clock, Tag, Leaf, Sparkles, Users, Lightbulb, Hand, Music } from 'lucide-react'
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
  // ──────────── Ansiedad / Calma ────────────
  { title: 'Calma rápida', minutes: 3, icon: Wind, description: 'Respiración guiada para cortar ansiedad en 3 minutos.', free: true, theme: 'Ansiedad' },
  { title: 'Reset mental', minutes: 5, icon: Brain, description: 'Limpia tu mente y empieza de cero. Ideal para saturación.', free: true, theme: 'Ansiedad' },
  { title: 'Reducir ansiedad', minutes: 8, icon: Timer, description: 'Reduce la activación del sistema nervioso simpático.', free: false, theme: 'Ansiedad' },
  { title: 'Desactivar el estrés', minutes: 10, icon: Shield, description: 'Técnica de relajación muscular progresiva para cortar el cortisol.', free: false, theme: 'Ansiedad' },
  { title: 'Ansiedad profunda', minutes: 15, icon: Shield, description: 'Sesión completa para desactivar la respuesta de estrés crónico.', free: false, theme: 'Ansiedad' },
  { title: 'Liberación total', minutes: 20, icon: Wind, description: 'Body scan + respiración + visualización para soltar toda tensión acumulada.', free: false, theme: 'Ansiedad' },
  { title: 'Pausa parasimpática', minutes: 4, icon: Leaf, description: 'Activa el nervio vago y calma la amígdala en minutos.', free: true, theme: 'Ansiedad' },
  { title: 'Antídoto al pánico', minutes: 12, icon: Shield, description: 'Regula la hiperactivación amigdalina con anclaje sensorial.', free: false, theme: 'Ansiedad' },

  // ──────────── Presencia / Atención ────────────
  { title: 'Micro-presencia', minutes: 3, icon: Crosshair, description: '3 minutos para volver al aquí y ahora.', free: true, theme: 'Presencia' },
  { title: 'Atención plena', minutes: 10, icon: Eye, description: 'Entrena tu foco atencional sin distracción.', free: false, theme: 'Presencia' },
  { title: 'El observador', minutes: 12, icon: Eye, description: 'Observa tus pensamientos sin identificarte. Separación consciente.', free: false, theme: 'Presencia' },
  { title: 'Presencia profunda', minutes: 15, icon: Crosshair, description: 'Desactiva la red neuronal por defecto. Estado de observación pura.', free: false, theme: 'Presencia' },
  { title: 'Flow state', minutes: 20, icon: Zap, description: 'Meditación para entrar en estado de flujo antes de trabajar.', free: false, theme: 'Presencia' },
  { title: 'Anclaje sensorial', minutes: 5, icon: Hand, description: 'Usa los 5 sentidos para silenciar la DMN al instante.', free: true, theme: 'Presencia' },
  { title: 'Foco láser', minutes: 8, icon: Target, description: 'Fortalece la corteza prefrontal con atención sostenida.', free: false, theme: 'Presencia' },
  { title: 'Contemplación abierta', minutes: 18, icon: Eye, description: 'Conciencia panorámica sin objeto. Expande la red atencional.', free: false, theme: 'Presencia' },

  // ──────────── Sueño ────────────
  { title: 'Pre-sueño', minutes: 5, icon: Moon, description: 'Relajación rápida para facilitar el sueño.', free: true, theme: 'Sueño' },
  { title: 'Yoga Nidra express', minutes: 10, icon: Moon, description: 'Relajación consciente profunda. El estado entre vigilia y sueño.', free: false, theme: 'Sueño' },
  { title: 'Insomnio leve', minutes: 12, icon: Moon, description: 'Relaja cuerpo y mente para un sueño reparador.', free: false, theme: 'Sueño' },
  { title: 'Viaje al descanso', minutes: 15, icon: Moon, description: 'Visualización guiada que lleva tu mente a un lugar de paz total.', free: false, theme: 'Sueño' },
  { title: 'Sueño profundo', minutes: 20, icon: Moon, description: 'Sesión completa de relajación progresiva para insomnio crónico.', free: false, theme: 'Sueño' },
  { title: 'Ondas delta', minutes: 3, icon: Moon, description: 'Micro-relajación que induce ondas cerebrales lentas.', free: true, theme: 'Sueño' },
  { title: 'Descanso restaurador', minutes: 18, icon: Moon, description: 'Yoga Nidra extendido para regenerar el sistema glinfático.', free: false, theme: 'Sueño' },

  // ──────────── Emociones ────────────
  { title: 'Autocompasión', minutes: 5, icon: Heart, description: 'Conecta con la bondad hacia ti mismo.', free: true, theme: 'Emociones' },
  { title: 'Soltar el enfado', minutes: 8, icon: Flame, description: 'Observa la ira sin reaccionar. Déjala pasar.', free: false, theme: 'Emociones' },
  { title: 'Duelo consciente', minutes: 10, icon: Heart, description: 'Acompaña el dolor sin huir. Transforma el sufrimiento en aceptación.', free: false, theme: 'Emociones' },
  { title: 'Regulación emocional', minutes: 12, icon: Heart, description: 'Técnicas para procesar emociones sin reprimirlas.', free: false, theme: 'Emociones' },
  { title: 'Perdón y soltar', minutes: 15, icon: Heart, description: 'Libérate del resentimiento. El perdón es para ti, no para el otro.', free: false, theme: 'Emociones' },
  { title: 'Amor incondicional', minutes: 20, icon: Heart, description: 'Metta bhavana: expande la compasión desde ti hacia todos los seres.', free: false, theme: 'Emociones' },
  { title: 'Etiquetado emocional', minutes: 3, icon: Brain, description: 'Nombra lo que sientes y reduce la reactividad amigdalina.', free: true, theme: 'Emociones' },
  { title: 'Coherencia corazón-mente', minutes: 10, icon: Heart, description: 'Sincroniza ritmo cardíaco y ondas cerebrales con la respiración.', free: false, theme: 'Emociones' },

  // ──────────── Energía / Mañana ────────────
  { title: 'Despertar consciente', minutes: 5, icon: Sun, description: 'Empieza el día con intención y claridad mental.', free: true, theme: 'Energía' },
  { title: 'Activación matutina', minutes: 8, icon: Zap, description: 'Respiración energizante + visualización del día.', free: false, theme: 'Energía' },
  { title: 'Claridad y foco', minutes: 10, icon: Target, description: 'Prepara tu mente para máximo rendimiento.', free: false, theme: 'Energía' },
  { title: 'Intención del día', minutes: 15, icon: Sun, description: 'Visualización completa: define tu día antes de vivirlo. Programa tu mente.', free: false, theme: 'Energía' },
  { title: 'Energía vital', minutes: 20, icon: Zap, description: 'Respiración Wim Hof adaptada + visualización energizante para recargar cuerpo y mente.', free: false, theme: 'Energía' },
  { title: 'Chispa rápida', minutes: 3, icon: Zap, description: 'Micro-dosis de dopamina con respiración y movimiento.', free: true, theme: 'Energía' },
  { title: 'Recarga de mediodía', minutes: 8, icon: Sun, description: 'Combate el bajón post-almuerzo reactivando el cortex prefrontal.', free: false, theme: 'Energía' },
  { title: 'Motivación profunda', minutes: 18, icon: Flame, description: 'Conecta con tu propósito activando el sistema de recompensa.', free: false, theme: 'Energía' },

  // ──────────── Gratitud ────────────
  { title: 'Gratitud express', minutes: 3, icon: Leaf, description: 'Tres minutos para activar circuitos de recompensa con gratitud.', free: true, theme: 'Gratitud' },
  { title: 'Diario interior', minutes: 5, icon: Heart, description: 'Recorre tu día encontrando momentos de agradecimiento genuino.', free: true, theme: 'Gratitud' },
  { title: 'Gratitud corporal', minutes: 8, icon: Hand, description: 'Agradece a cada parte de tu cuerpo. Reduce cortisol un 23%.', free: false, theme: 'Gratitud' },
  { title: 'Abundancia presente', minutes: 10, icon: Sparkles, description: 'Reprograma el sesgo de negatividad con neuroplasticidad positiva.', free: false, theme: 'Gratitud' },
  { title: 'Carta de gratitud', minutes: 15, icon: Heart, description: 'Visualiza a alguien importante y activa la ínsula anterior.', free: false, theme: 'Gratitud' },
  { title: 'Gratitud profunda', minutes: 20, icon: Leaf, description: 'Sesión completa que fortalece conexiones en corteza prefrontal.', free: false, theme: 'Gratitud' },

  // ──────────── Cuerpo ────────────
  { title: 'Body check rápido', minutes: 3, icon: Hand, description: 'Escaneo corporal ultrarrápido para reconectar con sensaciones.', free: true, theme: 'Cuerpo' },
  { title: 'Escáner somático', minutes: 8, icon: Hand, description: 'Recorre tu cuerpo y libera tensión inconsciente almacenada.', free: false, theme: 'Cuerpo' },
  { title: 'Mapa de sensaciones', minutes: 10, icon: Eye, description: 'Entrena la interocepción: escucha las señales de tu cuerpo.', free: false, theme: 'Cuerpo' },
  { title: 'Relajación muscular', minutes: 12, icon: Shield, description: 'Contrae y suelta cada grupo muscular. Baja el tono simpático.', free: false, theme: 'Cuerpo' },
  { title: 'Body scan completo', minutes: 15, icon: Hand, description: 'Escaneo profundo que activa la corteza somatosensorial completa.', free: false, theme: 'Cuerpo' },
  { title: 'Conciencia embodied', minutes: 20, icon: Leaf, description: 'Integra mente y cuerpo. Fortalece la conexión interoceptiva.', free: false, theme: 'Cuerpo' },
  { title: 'Soltar tensión express', minutes: 5, icon: Hand, description: 'Localiza y libera nudos de estrés en el cuerpo rápidamente.', free: true, theme: 'Cuerpo' },

  // ──────────── Relaciones ────────────
  { title: 'Compasión rápida', minutes: 3, icon: Users, description: 'Envía bondad a alguien en 3 min. Activa la ínsula y la empatía.', free: true, theme: 'Relaciones' },
  { title: 'Límites sanos', minutes: 8, icon: Shield, description: 'Fortalece tu corteza prefrontal para decir no sin culpa.', free: false, theme: 'Relaciones' },
  { title: 'Tonglen: dar y recibir', minutes: 10, icon: Heart, description: 'Práctica tibetana que transforma el dolor en compasión activa.', free: false, theme: 'Relaciones' },
  { title: 'Conexión empática', minutes: 15, icon: Users, description: 'Activa las neuronas espejo y profundiza la conexión humana.', free: false, theme: 'Relaciones' },
  { title: 'Sanación vincular', minutes: 20, icon: Heart, description: 'Repara patrones de apego activando circuitos de seguridad social.', free: false, theme: 'Relaciones' },
  { title: 'Gratitud relacional', minutes: 5, icon: Users, description: 'Reconoce el impacto positivo de otros en tu red neuronal social.', free: true, theme: 'Relaciones' },

  // ──────────── Respiración ────────────
  { title: 'Respiración 4-7-8', minutes: 3, icon: Wind, description: 'Técnica del Dr. Weil: activa el parasimpático en segundos.', free: true, theme: 'Respiración' },
  { title: 'Box breathing', minutes: 5, icon: Wind, description: 'Respiración cuadrada de los Navy SEALs. Regula el sistema nervioso.', free: true, theme: 'Respiración' },
  { title: 'Pranayama Nadi Shodhana', minutes: 8, icon: Wind, description: 'Respiración alterna que equilibra hemisferios cerebrales.', free: false, theme: 'Respiración' },
  { title: 'Respiración Wim Hof', minutes: 10, icon: Flame, description: 'Hiperventilación controlada + retención. Libera adrenalina y endorfinas.', free: false, theme: 'Respiración' },
  { title: 'Coherencia cardíaca', minutes: 12, icon: Heart, description: 'Respiración a 6 ciclos/min. Sincroniza corazón, cerebro y emociones.', free: false, theme: 'Respiración' },
  { title: 'Respiración transformadora', minutes: 20, icon: Wind, description: 'Breathwork completo: tres rondas que alteran la bioquímica cerebral.', free: false, theme: 'Respiración' },

  // ──────────── Creatividad ────────────
  { title: 'Chispa creativa', minutes: 3, icon: Lightbulb, description: 'Desbloquea ideas activando la red neuronal por defecto.', free: true, theme: 'Creatividad' },
  { title: 'Mente divergente', minutes: 8, icon: Sparkles, description: 'Estimula ondas alfa para potenciar el pensamiento lateral.', free: false, theme: 'Creatividad' },
  { title: 'Visualización creativa', minutes: 10, icon: Lightbulb, description: 'Imagina tu proyecto terminado. La corteza visual no distingue.', free: false, theme: 'Creatividad' },
  { title: 'Flujo imaginativo', minutes: 15, icon: Sparkles, description: 'Entra en ondas theta donde surgen las mejores ideas.', free: false, theme: 'Creatividad' },
  { title: 'Musa interior', minutes: 20, icon: Music, description: 'Sesión profunda que conecta subconsciente y creatividad consciente.', free: false, theme: 'Creatividad' },
  { title: 'Desbloqueador mental', minutes: 5, icon: Lightbulb, description: 'Silencia el crítico interno y libera la corteza prefrontal creativa.', free: true, theme: 'Creatividad' },
]

const themes = ['Todas', 'Ansiedad', 'Presencia', 'Sueño', 'Emociones', 'Energía', 'Gratitud', 'Cuerpo', 'Relaciones', 'Respiración', 'Creatividad']
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
