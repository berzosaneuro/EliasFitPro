import { Metadata } from 'next'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import FadeInSection from '@/components/FadeInSection'
import MeditationCards from './MeditationCards'
import PresenceTimer from './PresenceTimer'

export const metadata: Metadata = {
  title: 'Sala de Meditación — Neuropresencia',
  description: 'Apaga el ruido mental. Vuelve al presente. Meditaciones guiadas y temporizador de presencia.',
}

export default function MeditacionPage() {
  return (
    <>
      <section className="pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              SALA DE MEDITACIÓN
            </h1>
            <p className="text-text-secondary text-lg md:text-xl animate-fade-in-up">
              Apaga el ruido mental. Vuelve al presente.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <FadeInSection>
            <SectionTitle title="Meditaciones" />
            <MeditationCards />
          </FadeInSection>
        </Container>
      </section>

      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <SectionTitle
              title="Temporizador de presencia"
              subtitle="Elige la duración y practica la atención plena."
            />
            <PresenceTimer />
          </FadeInSection>
        </Container>
      </section>
    </>
  )
}
