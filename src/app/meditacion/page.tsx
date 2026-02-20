import { Metadata } from 'next'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import MeditationCards from './MeditationCards'
import PresenceTimer from './PresenceTimer'

export const metadata: Metadata = {
  title: 'Sala de Meditación — Neuropresencia',
  description: 'Apaga el ruido mental. Vuelve al presente. Meditaciones guiadas y temporizador de presencia.',
}

export default function MeditacionPage() {
  return (
    <div className="relative">
      <div className="orb w-64 h-64 bg-accent-blue top-10 -right-20" />

      <section className="pt-8 md:pt-16 pb-6">
        <Container>
          <div className="md:text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 animate-fade-in">
              Meditación
            </h1>
            <p className="text-text-secondary text-base animate-fade-in-up">
              Apaga el ruido. Vuelve al presente.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-4">Sesiones guiadas</h2>
            <MeditationCards />
          </FadeInSection>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-4">Timer de presencia</h2>
            <PresenceTimer />
          </FadeInSection>
        </Container>
      </section>
    </div>
  )
}
