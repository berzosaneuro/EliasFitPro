'use client'

import { Check, X, Crown, Sparkles, Brain } from 'lucide-react'
import Container from '@/components/Container'
import { usePremium } from '@/context/PremiumContext'

const features = [
  { name: 'Test de ruido mental', free: true, premium: true },
  { name: 'Método N.E.U.R.O. completo', free: true, premium: true },
  { name: 'Biblioteca básica (2 artículos)', free: true, premium: true },
  { name: 'Meditación: Reset Mental (5 min)', free: true, premium: true },
  { name: 'Timer de presencia', free: true, premium: true },
  { name: 'Biblioteca completa (6+ artículos)', free: false, premium: true },
  { name: 'Meditación: Ansiedad (8 min)', free: false, premium: true },
  { name: 'Meditación: Insomnio (12 min)', free: false, premium: true },
  { name: 'Meditación: Presencia profunda (10 min)', free: false, premium: true },
  { name: 'Nuevas meditaciones cada mes', free: false, premium: true },
  { name: 'Sin publicidad', free: false, premium: true },
  { name: 'Acceso anticipado a funciones', free: false, premium: true },
]

export default function PlanesPage() {
  const { isPremium, upgradeToPremium, downgradeToFree } = usePremium()

  return (
    <div className="bg-dark-primary py-20">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-blue/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span className="text-accent-blue text-sm font-medium">Elige tu plan</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Invierte en tu <span className="text-accent-blue">mente</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-lg">
            Empieza gratis y desbloquea todo el potencial de NeuroConciencia cuando estés listo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan FREE */}
          <div className={`relative rounded-2xl p-8 border transition-all ${
            !isPremium
              ? 'border-accent-blue bg-dark-surface ring-2 ring-accent-blue/30'
              : 'border-dark-border bg-dark-surface/50'
          }`}>
            {!isPremium && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-blue text-white text-xs font-semibold rounded-full">
                Plan actual
              </div>
            )}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent-blue" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">Free</h2>
                <p className="text-text-secondary text-sm">Para empezar</p>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-white">0 &euro;</span>
              <span className="text-text-secondary ml-1">/siempre</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.name} className="flex items-start gap-3">
                  {f.free ? (
                    <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-600 mt-0.5 shrink-0" />
                  )}
                  <span className={f.free ? 'text-text-primary' : 'text-gray-600'}>{f.name}</span>
                </li>
              ))}
            </ul>

            {isPremium && (
              <button
                onClick={downgradeToFree}
                className="w-full py-3 rounded-xl border border-dark-border text-text-secondary hover:text-white hover:border-white/30 transition-all font-medium"
              >
                Cambiar a Free
              </button>
            )}
          </div>

          {/* Plan PREMIUM */}
          <div className={`relative rounded-2xl p-8 border transition-all ${
            isPremium
              ? 'border-yellow-500 bg-dark-surface ring-2 ring-yellow-500/30'
              : 'border-dark-border bg-dark-surface/50 hover:border-yellow-500/50'
          }`}>
            {isPremium && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
                Plan actual
              </div>
            )}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">Premium</h2>
                <p className="text-text-secondary text-sm">Acceso completo</p>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-white">4,99 &euro;</span>
              <span className="text-text-secondary ml-1">/mes</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f.name} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 mt-0.5 shrink-0 ${f.free ? 'text-green-400' : 'text-yellow-400'}`} />
                  <span className="text-text-primary">
                    {f.name}
                    {!f.free && (
                      <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                        PRO
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {!isPremium ? (
              <button
                onClick={upgradeToPremium}
                className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Activar Premium
              </button>
            ) : (
              <div className="w-full py-3 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold text-center">
                Plan activo
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-text-secondary text-sm mt-10 max-w-lg mx-auto">
          El botón &quot;Activar Premium&quot; simula la suscripción localmente.
          Para pagos reales se integrará Stripe próximamente.
        </p>
      </Container>
    </div>
  )
}
