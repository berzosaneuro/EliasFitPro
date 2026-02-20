'use client'

import Link from 'next/link'
import Container from '@/components/Container'
import Card from '@/components/Card'
import FadeInSection from '@/components/FadeInSection'
import { usePremium } from '@/context/PremiumContext'
import { Brain, Headphones, BookOpen, ClipboardCheck, Crosshair, Timer, Moon, Zap, ChevronRight, Crown } from 'lucide-react'

const quickActions = [
  { href: '/meditacion', label: 'Meditar', icon: Headphones, color: 'bg-blue-500/15 text-blue-400' },
  { href: '/test', label: 'Test', icon: ClipboardCheck, color: 'bg-purple-500/15 text-purple-400' },
  { href: '/biblioteca', label: 'Leer', icon: BookOpen, color: 'bg-cyan-500/15 text-cyan-400' },
  { href: '/metodo', label: 'Método', icon: Brain, color: 'bg-green-500/15 text-green-400' },
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

      {/* PRO banner */}
      {!isPremium && (
        <section className="relative pb-8">
          <Container>
            <FadeInSection>
              <Link href="/planes" className="block">
                <div className="rounded-3xl p-5 relative overflow-hidden active:scale-[0.98] transition-transform"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))' }}>
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
