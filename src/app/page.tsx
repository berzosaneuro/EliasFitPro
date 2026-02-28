'use client'

import Link from 'next/link'
import Container from '@/components/Container'
import Card from '@/components/Card'
import FadeInSection from '@/components/FadeInSection'
import { usePremium } from '@/context/PremiumContext'
import { Brain, Headphones, BookOpen, ClipboardCheck, Crosshair, Timer, Moon, Zap, ChevronRight, Crown, Sparkles, Activity, AlertCircle, Flame, Calendar, Dumbbell, PenLine, Volume2, Trophy, Podcast, GraduationCap, Users, Video, Gift } from 'lucide-react'

const quickActions = [
  { href: '/meditacion', label: 'Meditar', icon: Headphones, color: 'bg-blue-500/15 text-blue-400' },
  { href: '/despertar', label: 'Despertar', icon: Sparkles, color: 'bg-violet-500/15 text-violet-400' },
  { href: '/neuroscore', label: 'Score', icon: Activity, color: 'bg-green-500/15 text-green-400' },
  { href: '/sos', label: 'SOS', icon: AlertCircle, color: 'bg-red-500/15 text-red-400' },
]

const moreActions = [
  { href: '/programa', label: '21 Días', icon: Calendar, desc: 'Programa completo', color: 'bg-orange-500/15 text-orange-400' },
  { href: '/ejercicios', label: 'Ejercicios', icon: Dumbbell, desc: 'Metacognición interactiva', color: 'bg-emerald-500/15 text-emerald-400' },
  { href: '/diario', label: 'Diario', icon: PenLine, desc: 'Registra tu presencia', color: 'bg-cyan-500/15 text-cyan-400' },
  { href: '/sonidos', label: 'Sonidos', icon: Volume2, desc: 'Ambiente perfecto', color: 'bg-sky-500/15 text-sky-400' },
]

const meditations = [
  { title: 'Reset mental', duration: '5 min', icon: Brain, free: true },
  { title: 'Ansiedad', duration: '8 min', icon: Timer, free: false },
  { title: 'Insomnio', duration: '12 min', icon: Moon, free: false },
  { title: 'Presencia profunda', duration: '10 min', icon: Crosshair, free: false },
]

const neuroSteps = [
  { letter: 'N', text: 'Neutraliza', full: 'Neutraliza el pensamiento' },
  { letter: 'E', text: 'Entrena', full: 'Entrena la atención' },
  { letter: 'U', text: 'Ubícate', full: 'Ubícate en el cuerpo' },
  { letter: 'R', text: 'Regula', full: 'Regula la emoción' },
  { letter: 'O', text: 'Observa', full: 'Observa sin identificarte' },
]

export default function Home() {
  const { isPremium } = usePremium()

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Buenos días'
    if (h < 20) return 'Buenas tardes'
    return 'Buenas noches'
  }

  return (
    <div className="relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="orb w-72 h-72 bg-accent-blue top-20 -left-20" />
      <div className="orb w-56 h-56 bg-accent-purple top-96 -right-16" />

      {/* Hero greeting */}
      <section className="relative pt-8 pb-6 md:pt-20 md:pb-16">
        <Container>
          <div className="md:text-center">
            <p className="text-text-secondary text-sm mb-1 animate-fade-in">{getGreeting()}</p>
            <h1 className="font-heading text-3xl md:text-6xl font-bold tracking-tight text-white mb-3 animate-fade-in">
              Recupera tu <span className="text-accent-blue">atención</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg animate-fade-in-up max-w-lg md:mx-auto">
              Entrena tu mente. Sin misticismo, sin humo.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick actions grid */}
      <section className="relative pb-6">
        <Container>
          <div className="grid grid-cols-4 gap-3 animate-fade-in-up">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col items-center gap-2 py-3 rounded-2xl glass-light active:scale-95 transition-transform"
              >
                <div className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-text-secondary">{action.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Daily tip card */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <div className="glass rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Dato del día</span>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">
                  Tu cerebro recibe más estímulos en un día que el de tus abuelos en un mes. Entrenar la atención ya no es opcional.
                </p>
              </div>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* NeuroScore widget */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <Link href="/neuroscore" className="block">
              <div className="glass rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform">
                <div className="absolute top-0 right-0 w-28 h-28 bg-green-500/8 rounded-full -translate-y-1/3 translate-x-1/3" />
                <div className="relative flex items-center gap-4">
                  <div className="relative">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle cx="28" cy="28" r="24" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * 0.7}`} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">30</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-heading font-semibold text-white text-base">NeuroScore</h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400 text-[10px] font-bold">0 días</span>
                      </div>
                    </div>
                    <p className="text-text-secondary text-xs">Completa tu entrenamiento diario</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
                </div>
              </div>
            </Link>
          </FadeInSection>
        </Container>
      </section>

      {/* Despertar en Vida - Hero CTA */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <Link href="/despertar" className="block">
              <div className="rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(244,63,94,0.08))' }}>
                <div className="absolute inset-0 border border-white/5 rounded-3xl" />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-500/10 rounded-full" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-rose-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-white text-base mb-0.5">Despertar en Vida</h3>
                    <p className="text-text-secondary text-xs">No hace falta morir para despertar</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
                </div>
              </div>
            </Link>
          </FadeInSection>
        </Container>
      </section>

      {/* Meditation section */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white text-lg">Meditaciones</h2>
              <Link href="/meditacion" className="flex items-center gap-1 text-accent-blue text-sm font-medium active:opacity-70">
                Ver todo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {meditations.map((m) => (
                <Link
                  key={m.title}
                  href="/meditacion"
                  className="flex-shrink-0 w-36 snap-start"
                >
                  <div className="glass rounded-2xl p-4 h-full active:scale-95 transition-transform">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center mb-3">
                      <m.icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <h3 className="font-medium text-white text-sm mb-1">{m.title}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-muted text-xs">{m.duration}</span>
                      {!m.free && (
                        <Crown className="w-3 h-3 text-yellow-400" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Método N.E.U.R.O. compact */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white text-lg">Método N.E.U.R.O.</h2>
              <Link href="/metodo" className="flex items-center gap-1 text-accent-blue text-sm font-medium active:opacity-70">
                Explorar <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="glass rounded-2xl p-4 space-y-2.5">
              {neuroSteps.map((step, i) => (
                <div key={step.letter} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-accent-blue/10 text-accent-blue font-heading font-bold text-sm rounded-lg shrink-0">
                    {step.letter}
                  </span>
                  <span className="text-text-primary text-sm font-medium">{step.full}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* More tools */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-4">Herramientas</h2>
            <div className="grid grid-cols-2 gap-3">
              {moreActions.map((action) => (
                <Link key={action.href} href={action.href} className="block">
                  <div className="glass rounded-2xl p-4 h-full active:scale-95 transition-transform">
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-white text-sm mb-0.5">{action.label}</h3>
                    <p className="text-text-muted text-xs">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Test CTA */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <Link href="/test" className="block">
              <div className="glass rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full translate-y-1/2 translate-x-1/2" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-white text-base mb-0.5">Test de ruido mental</h3>
                    <p className="text-text-secondary text-xs">Descubre tu nivel en 2 minutos</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
                </div>
              </div>
            </Link>
          </FadeInSection>
        </Container>
      </section>

      {/* New features grid */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-4">Explora</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { href: '/retos', label: 'Retos', icon: Trophy, color: 'bg-amber-500/15 text-amber-400' },
                { href: '/masterclass', label: 'Masterclass', icon: Video, color: 'bg-violet-500/15 text-violet-400' },
                { href: '/podcast', label: 'Podcast', icon: Podcast, color: 'bg-rose-500/15 text-rose-400' },
                { href: '/circulos', label: 'Círculos', icon: Users, color: 'bg-teal-500/15 text-teal-400' },
                { href: '/leaderboard', label: 'Ranking', icon: Trophy, color: 'bg-emerald-500/15 text-emerald-400' },
                { href: '/referidos', label: 'Referidos', icon: Gift, color: 'bg-pink-500/15 text-pink-400' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block">
                  <div className="glass rounded-2xl p-3 text-center active:scale-95 transition-transform">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-2`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-text-secondary text-xs font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Historias de transformación CTA */}
      <section className="relative pb-6">
        <Container>
          <FadeInSection>
            <Link href="/historias" className="block">
              <div className="glass rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-white text-base mb-0.5">Historias de transformación</h3>
                    <p className="text-text-secondary text-xs">Personas reales con NeuroScore verificado</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
                </div>
              </div>
            </Link>
          </FadeInSection>
        </Container>
      </section>

      {/* PRO banner */}
      {!isPremium && (
        <section className="relative pb-8">
          <Container>
            <FadeInSection>
              <Link href="/planes" className="block">
                <div className="rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(139,92,246,0.15))' }}>
                  <div className="absolute inset-0 border border-white/5 rounded-3xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center shrink-0">
                      <Crown className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-white text-base mb-0.5">Desbloquea Premium</h3>
                      <p className="text-text-secondary text-xs">Todas las meditaciones y artículos por 4,99 &euro;/mes</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted shrink-0" />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          </Container>
        </section>
      )}
    </div>
  )
}
