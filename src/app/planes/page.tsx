'use client'

import { Check, X, Crown, Sparkles, Brain, Users, Video, Star } from 'lucide-react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import { usePremium } from '@/context/PremiumContext'

const tiers = [
  {
    name: 'Free',
    price: '0',
    period: '/siempre',
    description: 'Para empezar tu camino',
    icon: Brain,
    color: 'text-accent-blue',
    bgColor: 'bg-accent-blue/10',
    features: [
      { name: 'Test de ruido mental', included: true },
      { name: 'Método N.E.U.R.O. completo', included: true },
      { name: '6 meditaciones gratuitas', included: true },
      { name: 'Timer de presencia', included: true },
      { name: 'Modo SOS básico', included: true },
      { name: 'Biblioteca (2 artículos)', included: true },
      { name: 'Meditaciones premium (20+)', included: false },
      { name: 'Programa 21 Días', included: false },
      { name: 'Retos semanales', included: false },
      { name: 'Masterclasses en video', included: false },
      { name: 'NeuroPodcast completo', included: false },
      { name: 'IA Coach ilimitado', included: false },
      { name: 'Círculos de consciencia', included: false },
      { name: 'Llamadas grupales', included: false },
    ],
  },
  {
    name: 'Premium',
    price: '4,99',
    period: '/mes',
    description: 'Acceso completo a todo',
    icon: Crown,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    popular: true,
    features: [
      { name: 'Todo lo de Free', included: true },
      { name: 'Meditaciones premium (20+)', included: true },
      { name: 'Programa 21 Días completo', included: true },
      { name: 'Retos semanales', included: true },
      { name: 'Masterclasses en video', included: true },
      { name: 'NeuroPodcast completo', included: true },
      { name: 'IA Coach ilimitado', included: true },
      { name: 'Círculos de consciencia', included: true },
      { name: 'Leaderboard y logros', included: true },
      { name: 'Diario con análisis IA', included: true },
      { name: 'Sonidos ambientales premium', included: true },
      { name: 'Sin publicidad', included: true },
      { name: 'Llamadas grupales en vivo', included: false },
      { name: 'Sesión 1-a-1 mensual con Berzosa', included: false },
    ],
  },
  {
    name: 'Mentorship',
    price: '49,99',
    period: '/mes',
    description: 'Acceso directo a Berzosa',
    icon: Star,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    features: [
      { name: 'Todo lo de Premium', included: true },
      { name: 'Llamadas grupales en vivo (4/mes)', included: true },
      { name: 'Sesión 1-a-1 mensual con Berzosa', included: true },
      { name: 'Acceso prioritario al IA Coach', included: true },
      { name: 'Grupo privado de WhatsApp', included: true },
      { name: 'Revisión personalizada del diario', included: true },
      { name: 'Plan de meditación a medida', included: true },
      { name: 'Descuento 50% en certificación', included: true },
      { name: 'Acceso anticipado a nuevas funciones', included: true },
      { name: 'Badge exclusivo de Mentorship', included: true },
      { name: 'Contenido exclusivo mensual', included: true },
      { name: 'Prioridad en Círculos', included: true },
      { name: 'NeuroConciencia Kids incluido', included: true },
      { name: 'Soporte prioritario 24h', included: true },
    ],
  },
]

export default function PlanesPage() {
  const { isPremium, upgradeToPremium, downgradeToFree } = usePremium()

  return (
    <div className="bg-dark-primary py-12 md:py-20 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-accent-blue top-20 left-1/2 -translate-x-1/2" />

      <Container>
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span className="text-accent-blue text-sm font-medium">Elige tu camino</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Invierte en tu <span className="gradient-text">mente</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Desde gratis hasta mentoría directa. Tú decides cuánto quieres profundizar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {tiers.map((tier) => {
            const isCurrentFree = !isPremium && tier.name === 'Free'
            const isCurrentPremium = isPremium && tier.name === 'Premium'
            const isCurrent = isCurrentFree || isCurrentPremium

            return (
              <FadeInSection key={tier.name}>
                <div className={`relative rounded-3xl p-6 md:p-8 border transition-all h-full flex flex-col ${
                  tier.popular
                    ? 'border-amber-500/40 bg-dark-surface ring-1 ring-amber-500/20'
                    : isCurrent
                    ? 'border-accent-blue/40 bg-dark-surface ring-1 ring-accent-blue/20'
                    : 'border-dark-border bg-dark-surface/50 hover:border-white/10'
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                      Más popular
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-blue text-white text-xs font-semibold rounded-full">
                      Plan actual
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4 mt-1">
                    <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center`}>
                      <tier.icon className={`w-6 h-6 ${tier.color}`} />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-white">{tier.name}</h2>
                      <p className="text-text-secondary text-xs">{tier.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{tier.price}{tier.price !== '0' ? '' : ''} &euro;</span>
                    <span className="text-text-secondary ml-1 text-sm">{tier.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f.name} className="flex items-start gap-2.5">
                        {f.included ? (
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-white/10 mt-0.5 shrink-0" />
                        )}
                        <span className={`text-sm ${f.included ? 'text-text-primary' : 'text-white/20'}`}>{f.name}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.name === 'Free' && isPremium && (
                    <button
                      onClick={downgradeToFree}
                      className="w-full py-3 rounded-xl border border-dark-border text-text-secondary hover:text-white hover:border-white/30 transition-all font-medium text-sm"
                    >
                      Cambiar a Free
                    </button>
                  )}
                  {tier.name === 'Premium' && !isPremium && (
                    <button
                      onClick={upgradeToPremium}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                      <Crown className="w-4 h-4" />
                      Activar Premium
                    </button>
                  )}
                  {tier.name === 'Premium' && isPremium && (
                    <div className="w-full py-3 rounded-xl bg-amber-500/15 text-amber-400 font-bold text-center text-sm">
                      Plan activo
                    </div>
                  )}
                  {tier.name === 'Mentorship' && (
                    <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                      <Star className="w-4 h-4" />
                      Solicitar Mentorship
                    </button>
                  )}
                </div>
              </FadeInSection>
            )
          })}
        </div>

        <p className="text-center text-text-muted text-xs mt-8 max-w-lg mx-auto">
          El botón &quot;Activar Premium&quot; simula la suscripción localmente. Para pagos reales se integrará Stripe próximamente.
        </p>
      </Container>
    </div>
  )
}
