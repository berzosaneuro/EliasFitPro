import { Metadata } from 'next'
import Container from '@/components/Container'
import Button from '@/components/Button'
import FadeInSection from '@/components/FadeInSection'
import { Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre — Neuropresencia',
  description: 'Soy Berzosa Neuro. Neuropresencia nace para enseñar lo que casi nadie explica.',
}

export default function SobrePage() {
  return (
    <>
      <section className="pt-24 pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-10 animate-fade-in">
                NO SOY UN GURÚ.
              </h1>
            </FadeInSection>

            <FadeInSection>
              <div className="flex items-center gap-3 mb-8">
                <Brain className="w-6 h-6 text-accent-blue" />
                <span className="text-accent-blue font-heading font-semibold text-lg">Berzosa Neuro</span>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>
                  Soy Berzosa Neuro.
                </p>
                <p>
                  Neuropresencia nace para enseñar lo que casi nadie explica: el ruido mental es un patrón aprendido y la conciencia se puede entrenar.
                </p>
                <p>
                  No necesitas escapar de tu vida. Necesitas dejar de vivir secuestrado por tu mente.
                </p>
                <p>
                  Todo lo que comparto aquí está basado en neurociencia, metacognición y experiencia real. Sin misticismo innecesario, sin promesas vacías, sin espiritualidad de escaparate.
                </p>
                <p>
                  La mente es una herramienta. Aprende a usarla en lugar de ser usado por ella.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Button href="/metodo">Ver el método</Button>
                <Button href="/contacto" variant="secondary">Contactar</Button>
              </div>
            </FadeInSection>
          </div>
        </Container>
      </section>
    </>
  )
}
