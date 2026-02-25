'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import EmailCapture from '@/components/EmailCapture'
import Link from 'next/link'
import { Lock, Check, Play, ChevronRight, ArrowLeft, Brain, Eye, Wind, Heart, Zap, Target, Shield, Flame, Sun, Moon, Sparkles, Crown } from 'lucide-react'

const STORAGE_KEY = 'programa21_data'

const days = [
  { day: 1, title: 'Observa sin juzgar', desc: 'Siéntate 3 minutos y cuenta tus pensamientos. Solo cuenta.', category: 'Atención', icon: Eye, exercise: 'counter' },
  { day: 2, title: 'Respiración consciente', desc: 'Respiración 4-7-8 durante 5 minutos. Conecta con tu cuerpo.', category: 'Cuerpo', icon: Wind, exercise: 'breathing' },
  { day: 3, title: 'Etiqueta mental', desc: 'Durante 3 min, etiqueta cada pensamiento: pasado, futuro o neutro.', category: 'Metacognición', icon: Brain, exercise: 'labeler' },
  { day: 4, title: 'Escaneo corporal', desc: 'Recorre tu cuerpo de pies a cabeza. ¿Dónde hay tensión?', category: 'Cuerpo', icon: Heart, exercise: 'bodyscan' },
  { day: 5, title: 'El observador', desc: 'Observa tus pensamientos como nubes. No los sigas. Déjalos pasar.', category: 'Presencia', icon: Eye, exercise: 'meditation' },
  { day: 6, title: 'Gratitud neurocientífica', desc: 'Escribe 3 cosas por las que tu cerebro debería estar agradecido hoy.', category: 'Emoción', icon: Heart, exercise: 'journal' },
  { day: 7, title: 'Reset completo', desc: 'Meditación de 10 min + revisión de la semana. ¿Qué has notado?', category: 'Integración', icon: Zap, exercise: 'meditation' },
  { day: 8, title: 'Atención selectiva', desc: 'Elige un sonido del entorno y escúchalo sin distracción durante 3 min.', category: 'Atención', icon: Target, exercise: 'focus' },
  { day: 9, title: 'Pensamiento en pausa', desc: 'Cada vez que surja un pensamiento, di mentalmente "visto" y suéltalo.', category: 'Metacognición', icon: Brain, exercise: 'counter' },
  { day: 10, title: 'Caminar presente', desc: 'Camina 5 minutos prestando atención a cada paso. Sin teléfono.', category: 'Cuerpo', icon: Wind, exercise: 'timer' },
  { day: 11, title: 'La mente del principiante', desc: 'Mira un objeto cotidiano como si fuera la primera vez. Descríbelo.', category: 'Presencia', icon: Eye, exercise: 'journal' },
  { day: 12, title: 'Control de impulsos', desc: 'Cuando sientas un impulso (mirar el móvil), espera 10 segundos antes de actuar.', category: 'Autocontrol', icon: Shield, exercise: 'timer' },
  { day: 13, title: 'Meditación de compasión', desc: 'Envía mentalmente bienestar a ti mismo, a alguien querido, y a alguien difícil.', category: 'Emoción', icon: Heart, exercise: 'meditation' },
  { day: 14, title: 'Revisión media', desc: 'Test de ruido mental + comparación con el día 1. ¿Ha cambiado algo?', category: 'Integración', icon: Zap, exercise: 'test' },
  { day: 15, title: 'Desconexión digital', desc: '2 horas sin pantallas. Registra qué sientes.', category: 'Autocontrol', icon: Shield, exercise: 'journal' },
  { day: 16, title: 'Presencia en conversación', desc: 'En tu próxima conversación, solo escucha. Sin pensar en qué vas a responder.', category: 'Atención', icon: Target, exercise: 'journal' },
  { day: 17, title: 'Meditación nocturna', desc: 'Antes de dormir, 8 min de relajación progresiva.', category: 'Cuerpo', icon: Moon, exercise: 'meditation' },
  { day: 18, title: 'Claridad vital', desc: 'Haz el ejercicio de Despertar en Vida. Confronta qué importa.', category: 'Presencia', icon: Sparkles, exercise: 'despertar' },
  { day: 19, title: 'Rastreo emocional', desc: 'Registra 5 emociones que sientas hoy. Solo observa, no juzgues.', category: 'Emoción', icon: Heart, exercise: 'journal' },
  { day: 20, title: 'Flow state', desc: 'Elige una actividad y sumérgete 20 min sin distracciones. Atención total.', category: 'Atención', icon: Flame, exercise: 'timer' },
  { day: 21, title: 'Graduación NEURO', desc: 'Test final + meditación de 15 min + reflexión escrita sobre tu transformación.', category: 'Integración', icon: Sun, exercise: 'graduation' },
]

type ProgramData = {
  startDate: string | null
  completedDays: number[]
}

function loadProgram(): ProgramData {
  if (typeof window === 'undefined') return { startDate: null, completedDays: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { startDate: null, completedDays: [] }
}

function saveProgram(data: ProgramData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export default function ProgramaPage() {
  const [data, setData] = useState<ProgramData>({ startDate: null, completedDays: [] })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setData(loadProgram())
  }, [])

  const startProgram = () => {
    const newData = { startDate: new Date().toISOString().split('T')[0], completedDays: [] }
    setData(newData)
    saveProgram(newData)
  }

  const completeDay = (dayNum: number) => {
    if (data.completedDays.includes(dayNum)) return
    const newData = { ...data, completedDays: [...data.completedDays, dayNum] }
    setData(newData)
    saveProgram(newData)
    setSelectedDay(null)
  }

  const getDayStatus = (dayNum: number): 'completed' | 'current' | 'locked' => {
    if (data.completedDays.includes(dayNum)) return 'completed'
    if (dayNum === 1 || data.completedDays.includes(dayNum - 1)) return 'current'
    return 'locked'
  }

  const progress = (data.completedDays.length / 21) * 100
  const selected = selectedDay ? days.find(d => d.day === selectedDay) : null

  const exerciseLinks: Record<string, string> = {
    counter: '/ejercicios',
    breathing: '/sos',
    labeler: '/ejercicios',
    bodyscan: '/ejercicios',
    meditation: '/meditacion',
    journal: '/diario',
    focus: '/meditacion',
    timer: '/meditacion',
    test: '/test',
    despertar: '/despertar',
    graduation: '/neuroscore',
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Detail view
  if (selected) {
    const status = getDayStatus(selected.day)
    return (
      <div className="relative overflow-hidden">
        <div className="orb w-64 h-64 bg-accent-blue top-20 -right-20" />
        <section className="pt-8 pb-6">
          <Container>
            <button onClick={() => setSelectedDay(null)} className="flex items-center gap-2 text-text-secondary text-sm mb-6 active:opacity-70">
              <ArrowLeft className="w-4 h-4" /> Volver al programa
            </button>
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold">{selected.category}</span>
                <span className="text-text-muted text-xs">Día {selected.day} de 21</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-accent-blue/15 flex items-center justify-center mb-4">
                <selected.icon className="w-7 h-7 text-accent-blue" />
              </div>
              <h2 className="font-heading font-bold text-white text-2xl mb-3">{selected.title}</h2>
              <p className="text-text-secondary text-base leading-relaxed mb-6">{selected.desc}</p>

              {status === 'locked' ? (
                <div className="py-3 px-4 bg-white/5 rounded-xl text-center">
                  <p className="text-text-muted text-sm">Completa el día {selected.day - 1} para desbloquear</p>
                </div>
              ) : status === 'completed' ? (
                <div className="py-3 px-4 bg-green-500/10 rounded-xl text-center">
                  <p className="text-green-400 text-sm font-medium">Completado</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href={exerciseLinks[selected.exercise] || '/meditacion'}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-accent-blue text-white rounded-xl font-medium text-sm active:scale-95 transition-transform"
                  >
                    <Play className="w-4 h-4" /> Ir al ejercicio
                  </Link>
                  <button
                    onClick={() => completeDay(selected.day)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500/15 text-green-400 rounded-xl font-medium text-sm active:scale-95 transition-transform"
                  >
                    <Check className="w-4 h-4" /> Marcar como completado
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
    )
  }

  // Not started
  if (!data.startDate) {
    return (
      <div className="relative overflow-hidden">
        <div className="orb w-80 h-80 bg-accent-blue top-20 -left-32" />
        <section className="pt-10 pb-8 md:pt-20">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-blue/20 to-violet-500/20 flex items-center justify-center mx-auto mb-6">
                <Flame className="w-9 h-9 text-accent-blue" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-white mb-3">21 días para apagar el ruido</h1>
              <p className="text-text-secondary text-base mb-2">Un ejercicio diario de metacognición, atención y presencia.</p>
              <p className="text-text-muted text-sm mb-8">Cada día desbloquea el siguiente. Sin atajos.</p>
              <button
                onClick={startProgram}
                className="w-full py-4 bg-accent-blue text-white rounded-2xl font-semibold text-lg active:scale-95 transition-transform mb-4"
                style={{ boxShadow: '0 0 25px rgba(59,130,246,0.3)' }}
              >
                Empezar el programa
              </button>

              <EmailCapture
                source="programa-21-dias"
                title="Recibe recordatorios diarios"
                subtitle="Te enviamos un recordatorio cada día para que no pierdas el ritmo."
                buttonText="Activar"
                compact
              />
            </div>
          </Container>
        </section>
      </div>
    )
  }

  // Main view
  return (
    <div className="relative overflow-hidden">
      <div className="orb w-64 h-64 bg-accent-blue top-10 -right-20" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-white mb-1 animate-fade-in">Programa 21 días</h1>
          <p className="text-text-secondary text-sm animate-fade-in-up">Día {data.completedDays.length + 1} de 21</p>
        </Container>
      </section>

      {/* Progress */}
      <section className="pb-6">
        <Container>
          <FadeInSection>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary text-xs font-medium">Progreso</span>
                <span className="text-white text-xs font-bold">{data.completedDays.length}/21</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full">
                <div className="h-2 bg-accent-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              {data.completedDays.length === 21 && (
                <div className="mt-3 flex items-center gap-2 justify-center">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">Programa completado</span>
                </div>
              )}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Days list */}
      <section className="pb-12">
        <Container>
          <FadeInSection>
            <div className="space-y-2.5">
              {days.map((d) => {
                const status = getDayStatus(d.day)
                return (
                  <button
                    key={d.day}
                    onClick={() => status !== 'locked' && setSelectedDay(d.day)}
                    disabled={status === 'locked'}
                    className={`w-full glass rounded-2xl p-4 flex items-center gap-3 text-left transition-all active:scale-[0.98] ${
                      status === 'locked' ? 'opacity-40' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      status === 'completed' ? 'bg-green-500/20' :
                      status === 'current' ? 'bg-accent-blue/15' :
                      'bg-white/5'
                    }`}>
                      {status === 'completed' ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : status === 'locked' ? (
                        <Lock className="w-4 h-4 text-text-muted" />
                      ) : (
                        <d.icon className="w-5 h-5 text-accent-blue" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${status === 'completed' ? 'text-green-400' : 'text-white'}`}>
                        Día {d.day}: {d.title}
                      </p>
                      <p className="text-text-muted text-xs">{d.category}</p>
                    </div>
                    {status !== 'locked' && (
                      <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </FadeInSection>
        </Container>
      </section>
    </div>
  )
}
