import { Metadata } from 'next'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contacto — Neuropresencia',
  description: 'Ponte en contacto con Neuropresencia. Escríbenos tu mensaje.',
}

export default function ContactoPage() {
  return (
    <>
      <section className="pt-24 pb-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-12">
                <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
                  CONTACTO
                </h1>
                <p className="text-text-secondary text-lg animate-fade-in-up">
                  ¿Tienes alguna pregunta o quieres colaborar? Escríbeme.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <ContactForm />
            </FadeInSection>
          </div>
        </Container>
      </section>
    </>
  )
}
