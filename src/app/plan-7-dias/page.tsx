'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import Link from 'next/link'
import {
  Eye, Wind, Brain, Heart, Zap, Target, Shield,
  Check, ChevronRight, ArrowLeft, Play, Lock, Gift,
  Loader2, Send, Mail, Flame, Star
} from 'lucide-react'

const STORAGE_KEY = 'plan7_data'
const SUB_KEY = 'plan7_subscribed'

const days = [
  {
    day: 1,
    title: 'Cuenta tus pensamientos',
    icon: Eye,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    desc: 'Tu primer paso es darte cuenta de cuánto ruido mental tienes. Sin juzgar, sin cambiar nada. Solo observar.',
    exercise: 'Siéntate 3 minutos en silencio con los ojos cerrados. Cada vez que aparezca un pensamiento, cuenta uno. Al final, anota el número. Ese es tu punto de partida.',
    neuro: 'Estás activando la corteza prefrontal para monitorizar la DMN (Red Neuronal por Defecto). Es el primer paso para sacar al cerebro del piloto automático.',
    link: '/ejercicios',
    duration: '3 min',
  },
  {
    day: 2,
    title: 'Respira con intención',
    icon: Wind,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    desc: 'La respiración consciente es la herramienta más rápida para cambiar tu estado cerebral. Hoy la usas por primera vez.',
    exercise: 'Respiración 4-7-8: Inhala 4 segundos por la nariz, retén 7 segundos, exhala 8 segundos por la boca. Repite 4 ciclos. Hazlo 2 veces hoy: mañana y noche.',
    neuro: 'La exhalación larga activa el nervio vago, que frena el sistema simpático (estrés) y enciende el parasimpático (calma). En 4 ciclos reduces cortisol de forma medible.',
    link: '/sos',
    duration: '5 min',
  },
  {
    day: 3,
    title: 'Etiqueta mental',
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    desc: 'Hoy aprendes la técnica más potente del Método N.E.U.R.O.: etiquetar pensamientos para quitarles poder.',
    exercise: 'Durante 3 minutos, cada vez que aparezca un pensamiento, clasifícalo mentalmente: "pasado", "futuro" o "juicio". No lo sigas, solo clasifica y suelta. Repite hasta que notes que pierden intensidad.',
    neuro: 'Al nombrar el contenido mental activas la corteza prefrontal y reduces la actividad de la amígdala hasta un 50% (affect labeling, Lieberman). Literalmente desactivas la alarma cerebral con una palabra.',
    link: '/ejercicios',
    duration: '3 min',
  },
  {
    day: 4,
    title: 'Aterriza en tu cuerpo',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    desc: 'Tu mente viaja al pasado y al futuro. Tu cuerpo siempre está aquí. Hoy aprendes a usarlo como ancla.',
    exercise: 'Escaneo corporal: empieza por los pies y sube lentamente hasta la cabeza. En cada zona, nota qué sientes: tensión, calor, hormigueo, nada. No intentes cambiar nada. Solo observa. 5 minutos.',
    neuro: 'El escaneo corporal fortalece la ínsula, la región encargada de la interocepción. Mayor conciencia corporal = mejor regulación emocional + mejores decisiones. Damasio lo demostró con sus marcadores somáticos.',
    link: '/ejercicios',
    duration: '5 min',
  },
  {
    day: 5,
    title: 'El observador',
    icon: Eye,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    desc: 'Este es el corazón del método. No eres tus pensamientos. Eres quien los observa. Hoy lo experimentas.',
    exercise: 'Imagina que estás sentado en la orilla de un río. Tus pensamientos son hojas que flotan en el agua. Obsérvalos pasar sin subirte a ninguno. Si te enganchas, nótalo y vuelve a la orilla. 5 minutos.',
    neuro: 'Al adoptar la posición del observador, activas la red de atención ejecutiva y desactivas la corteza prefrontal medial (el "yo" narrativo). El ego tiene una dirección en el cerebro, y aquí empiezas a apagarlo.',
    link: '/meditacion',
    duration: '5 min',
  },
  {
    day: 6,
    title: 'Detectar, nombrar, elegir',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    desc: 'La reactividad automática es tu mayor enemigo. Hoy aprendes el protocolo de 3 pasos para frenarla.',
    exercise: 'La próxima vez que sientas una emoción intensa: 1) Detecta dónde la sientes en tu cuerpo. 2) Nómbrala mentalmente. 3) Respira 3 veces antes de actuar. Practica al menos 2 veces hoy.',
    neuro: 'Cada paso tiene un correlato neuronal: detectar activa la ínsula, nombrar frena la amígdala via corteza prefrontal, y respirar activa el nervio vago. Tres capas de regulación en 10 segundos.',
    link: '/ejercicios',
    duration: 'Todo el día',
  },
  {
    day: 7,
    title: 'Integración NEURO',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    desc: 'Último día. Hoy juntas todo lo aprendido en una sola sesión. Y mides si ha cambiado algo.',
    exercise: '1) Cuenta tus pensamientos 3 min (compara con el día 1). 2) Respiración 4-7-8 (2 ciclos). 3) Escaneo corporal (2 min). 4) Observador (3 min). Anota qué ha cambiado esta semana.',
    neuro: 'En 7 días de práctica consistente ya se observan cambios en la conectividad funcional del cerebro. No es suficiente para cambios estructurales (eso requiere semanas), pero sí para crear el hábito neuronal. El siguiente paso es el Programa de 21 días.',
    link: '/meditacion',
    duration: '10 min',
  },
]

type PlanData = {
  completedDays: number[]
}

export default function Plan7DiasPage() {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [data, setData] = useState<PlanData>({ completedDays: [] })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setSubscribed(localStorage.getItem(SUB_KEY) === 'true')
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) setData(JSON.parse(raw))
      } catch {}
    }
  }, [])

  const save = (newData: PlanData) => {
    setData(newData)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    }
  }

  const handleSubscribe = async () => {
    if (!email.trim()) return
    setSending(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'plan-7-dias' }),
      })
    } catch {}
    if (typeof window !== 'undefined') {
      localStorage.setItem(SUB_KEY, 'true')
    }
    setSubscribed(true)
    setSending(false)
  }

  const completeDay = (dayNum: number) => {
    if (data.completedDays.includes(dayNum)) return
    const newData = { completedDays: [...data.completedDays, dayNum] }
    save(newData)
    setSelectedDay(null)
  }

  const getDayStatus = (dayNum: number): 'completed' | 'current' | 'locked' => {
    if (data.completedDays.includes(dayNum)) return 'completed'
    if (dayNum === 1 || data.completedDays.includes(dayNum - 1)) return 'current'
    return 'locked'
  }

  const progress = (data.completedDays.length / 7) * 100
  const selected = selectedDay ? days.find(d => d.day === selectedDay) : null

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Gate: email subscription
  if (!subscribed) {
    return (
      <div className="relative overflow-hidden">
        <div className="orb w-96 h-96 bg-purple-600 top-0 -right-32" />
        <div className="orb w-80 h-80 bg-accent-blue top-[400px] -left-40" />

        <section className="pt-10 md:pt-24 pb-12">
          <Container>
            <FadeInSection>
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-accent-blue/20 flex items-center justify-center mx-auto mb-6 border border-purple-500/10">
                  <Gift className="w-9 h-9 text-purple-400" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium mb-4">
                  <Star className="w-3 h-3" />
                  100% Gratis
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                  Plan de 7 días
                </h1>
                <p className="text-text-secondary mb-2">
                  Tu introducción al Método N.E.U.R.O. en una semana.
                </p>
                <p className="text-text-muted text-sm mb-8">
                  Un ejercicio diario de neurociencia aplicada. Cada día trabajas una letra del método. Gratis al suscribirte.
                </p>

                {/* Preview of what they get */}
                <div className="glass rounded-2xl p-4 mb-6 text-left">
                  <h3 className="text-white text-sm font-semibold mb-3">Lo que incluye:</h3>
                  <div className="space-y-2">
                    {[
                      '7 ejercicios prácticos guiados',
                      'Base neurocientífica de cada ejercicio',
                      'Progreso desbloqueado día a día',
                      'Acceso al Método N.E.U.R.O. completo',
                      'Enlace directo al Programa de 21 días',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-text-secondary text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe form */}
                <div className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                      placeholder="Tu email"
                      className="w-full pl-11 pr-4 py-3.5 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    disabled={!email.trim() || sending}
                    className="w-full py-3.5 bg-accent-blue rounded-xl text-white font-semibold active:scale-95 transition-transform disabled:opacity-40 glow-blue"
                  >
                    {sending ? (
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 inline mr-2" />
                    )}
                    {sending ? 'Activando...' : 'Acceder gratis'}
                  </button>
                  <p className="text-text-muted text-[10px]">
                    Sin spam. Solo contenido de neurociencia y consciencia.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </Container>
        </section>
      </div>
    )
  }

  // Day detail view
  if (selected) {
    const status = getDayStatus(selected.day)
    return (
      <div className="relative overflow-hidden">
        <div className="orb w-64 h-64 bg-purple-600 top-20 -right-20" />
        <section className="pt-8 pb-6">
          <Container>
            <button onClick={() => setSelectedDay(null)} className="flex items-center gap-2 text-text-secondary text-sm mb-6 active:opacity-70">
              <ArrowLeft className="w-4 h-4" /> Volver al plan
            </button>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full ${selected.bg} ${selected.color} text-xs font-semibold`}>
                  Día {selected.day}
                </span>
                <span className="text-text-muted text-xs">{selected.duration}</span>
              </div>

              <div className={`w-14 h-14 rounded-2xl ${selected.bg} flex items-center justify-center mb-4`}>
                <selected.icon className={`w-7 h-7 ${selected.color}`} />
              </div>

              <h2 className="font-heading font-bold text-white text-2xl mb-3">{selected.title}</h2>
              <p className="text-text-secondary leading-relaxed mb-6">{selected.desc}</p>

              {/* Exercise */}
              <div className="glass-light rounded-xl p-4 mb-4">
                <h3 className="text-accent-blue text-sm font-semibold uppercase tracking-wider mb-2">Ejercicio</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{selected.exercise}</p>
              </div>

              {/* Neuro basis */}
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <h3 className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Qué pasa en tu cerebro</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{selected.neuro}</p>
              </div>

              {status === 'locked' ? (
                <div className="py-3 px-4 bg-white/5 rounded-xl text-center">
                  <p className="text-text-muted text-sm">Completa el día {selected.day - 1} para desbloquear</p>
                </div>
              ) : status === 'completed' ? (
                <div className="py-3 px-4 bg-green-500/10 rounded-xl text-center">
                  <p className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Completado
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href={selected.link}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-accent-blue/10 text-accent-blue rounded-xl font-medium text-sm active:scale-95 transition-transform"
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

            {/* Next step after day 7 */}
            {selected.day === 7 && status === 'completed' && (
              <FadeInSection>
                <div className="glass rounded-2xl p-5 mt-4 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-white font-semibold">¿Y ahora qué?</h3>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    Has completado los 7 días. Tu cerebro ya ha empezado a cambiar. El Programa de 21 días lleva esto al siguiente nivel con cambios estructurales reales.
                  </p>
                  <Link
                    href="/programa"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-500/15 text-yellow-400 rounded-xl font-medium text-sm active:scale-95 transition-transform"
                  >
                    <Flame className="w-4 h-4" /> Continuar con 21 días
                  </Link>
                </div>
              </FadeInSection>
            )}
          </Container>
        </section>
      </div>
    )
  }

  // Main plan view
  return (
    <div className="relative overflow-hidden">
      <div className="orb w-64 h-64 bg-purple-600 top-10 -right-20" />
      <div className="orb w-48 h-48 bg-accent-blue top-[500px] -left-24" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-heading text-3xl font-bold text-white animate-fade-in">Plan 7 días</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
              <Star className="w-3 h-3" />
              Gratis
            </div>
          </div>
          <p className="text-text-secondary text-sm animate-fade-in-up">
            Introducción al Método N.E.U.R.O.
          </p>
        </Container>
      </section>

      {/* Progress */}
      <section className="pb-4">
        <Container>
          <FadeInSection>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary text-xs font-medium">Progreso</span>
                <span className="text-white text-xs font-bold">{data.completedDays.length}/7</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-accent-blue rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              {data.completedDays.length === 7 && (
                <div className="mt-3 flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">Plan completado</span>
                </div>
              )}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Days */}
      <section className="pb-6">
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
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      status === 'completed' ? 'bg-green-500/20' :
                      status === 'current' ? d.bg :
                      'bg-white/5'
                    }`}>
                      {status === 'completed' ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : status === 'locked' ? (
                        <Lock className="w-4 h-4 text-text-muted" />
                      ) : (
                        <d.icon className={`w-5 h-5 ${d.color}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${status === 'completed' ? 'text-green-400' : 'text-white'}`}>
                        Día {d.day}: {d.title}
                      </p>
                      <p className="text-text-muted text-xs">{d.duration}</p>
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

      {/* CTA to 21 days */}
      {data.completedDays.length === 7 && (
        <section className="pb-12">
          <Container>
            <FadeInSection>
              <div className="glass rounded-2xl p-5 border border-accent-blue/20 text-center">
                <Flame className="w-8 h-8 text-accent-blue mx-auto mb-3" />
                <h3 className="font-heading text-lg font-bold text-white mb-2">¿Listo para el siguiente nivel?</h3>
                <p className="text-text-secondary text-sm mb-4">
                  El Programa de 21 días consolida los cambios neuronales y crea hábitos permanentes.
                </p>
                <Link
                  href="/programa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue rounded-xl text-white font-medium text-sm active:scale-95 transition-transform glow-blue"
                >
                  Continuar con 21 días <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInSection>
          </Container>
        </section>
      )}

      {/* Link from captación */}
      {data.completedDays.length < 7 && (
        <section className="pb-12">
          <Container>
            <FadeInSection>
              <div className="glass rounded-2xl p-4 flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-400 shrink-0" />
                <p className="text-text-secondary text-xs flex-1">
                  Cada ejercicio está basado en el Método N.E.U.R.O. y tiene respaldo en neurociencia.
                </p>
                <Link href="/metodo" className="text-accent-blue text-xs font-medium shrink-0">
                  Ver método
                </Link>
              </div>
            </FadeInSection>
          </Container>
        </section>
      )}
    </div>
  )
}
