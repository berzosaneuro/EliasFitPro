import { Metadata } from 'next'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import Button from '@/components/Button'
import Card from '@/components/Card'
import FadeInSection from '@/components/FadeInSection'
import { Brain, Rewind, FastForward, Crosshair, BookOpen, Timer, ClipboardCheck } from 'lucide-react'
import EmailForm from './EmailForm'

export const metadata: Metadata = {
  title: 'Neuropresencia — Recupera tu atención',
  description: 'Supraconciencia, metacognición y neuroplasticidad para apagar el ruido mental y vivir desde el presente.',
}

const meditations = [
  { title: 'Reset mental', duration: '5 min', icon: Brain },
  { title: 'Ansiedad', duration: '8 min', icon: Timer },
  { title: 'Insomnio', duration: '12 min', icon: Timer },
  { title: 'Presencia profunda', duration: '10 min', icon: Crosshair },
]

const articles = [
  { title: 'Por qué tu mente no se calla', slug: 'por-que-tu-mente-no-se-calla' },
  { title: 'Ego: mecanismo defensivo', slug: 'ego-mecanismo-defensivo' },
  { title: 'Neuroplasticidad aplicada al ahora', slug: 'neuroplasticidad-aplicada-al-ahora' },
  { title: 'Cómo cortar la rumiación', slug: 'como-cortar-la-rumiacion' },
]

const neuroSteps = [
  { letter: 'N', text: 'Neutraliza el pensamiento' },
  { letter: 'E', text: 'Entrena la atención' },
  { letter: 'U', text: 'Ubícate en el cuerpo' },
  { letter: 'R', text: 'Regula la emoción' },
  { letter: 'O', text: 'Observa sin identificarte' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-36 md:pb-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              RECUPERA TU ATENCIÓN.
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-10 animate-fade-in-up max-w-2xl mx-auto">
              Supraconciencia, metacognición y neuroplasticidad para apagar el ruido mental y vivir desde el presente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Button href="/metodo">Empezar ahora</Button>
              <Button href="/meditacion" variant="secondary">Sala de meditación</Button>
            </div>
          </div>
          <p className="text-center text-text-secondary text-sm mt-16 tracking-widest uppercase">
            No es espiritualidad. Es entrenamiento mental.
          </p>
        </Container>
      </section>

      {/* El problema */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <SectionTitle title="Tu mente no para porque nadie la entrenó." />
          </FadeInSection>
          <FadeInSection>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center">
                <Rewind className="w-8 h-8 text-text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">PASADO</h3>
                <p className="text-text-secondary text-sm">Rumiación, culpa, repetición.</p>
              </Card>
              <Card className="text-center">
                <FastForward className="w-8 h-8 text-text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-white mb-2">FUTURO</h3>
                <p className="text-text-secondary text-sm">Ansiedad, anticipación, miedo.</p>
              </Card>
              <Card className="text-center border-accent-blue/50">
                <Crosshair className="w-8 h-8 text-accent-blue mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-accent-blue mb-2">PRESENTE</h3>
                <p className="text-text-secondary text-sm">Claridad, control, calma.</p>
              </Card>
            </div>
          </FadeInSection>
          <FadeInSection>
            <p className="text-center text-text-secondary mt-12 text-lg italic">
              La mente vive en el tiempo. La conciencia vive en el ahora.
            </p>
          </FadeInSection>
        </Container>
      </section>

      {/* Qué es Neuropresencia */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <SectionTitle title="Qué es Neuropresencia" />
              <p className="text-text-secondary text-lg mb-6">
                Neuropresencia es un espacio dedicado a enseñar cómo funciona la mente desde un enfoque real: atención, neuroplasticidad y metacognición aplicada.
              </p>
              <p className="text-text-secondary text-lg">
                No se trata de pensar positivo. Se trata de observar el pensamiento sin ser arrastrado por él.
              </p>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Método N.E.U.R.O. */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <SectionTitle
              title="MÉTODO N.E.U.R.O."
              subtitle="Un framework práctico para entrenar conciencia y cortar el ruido mental."
            />
          </FadeInSection>
          <FadeInSection>
            <div className="max-w-2xl mx-auto space-y-4">
              {neuroSteps.map((step) => (
                <div key={step.letter} className="flex items-center gap-4 p-4 rounded-lg bg-dark-surface border border-dark-border hover:border-accent-blue/50 transition-all">
                  <span className="w-10 h-10 flex items-center justify-center bg-accent-blue/10 text-accent-blue font-heading font-bold text-lg rounded-lg">
                    {step.letter}
                  </span>
                  <span className="text-white font-medium">{step.text}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="text-center mt-10">
              <Button href="/metodo">Ver el método completo</Button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Sala de Meditación */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <SectionTitle title="Sala de Meditación" />
          </FadeInSection>
          <FadeInSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {meditations.map((m) => (
                <Card key={m.title} className="text-center">
                  <m.icon className="w-8 h-8 text-accent-blue mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-white mb-1">{m.title}</h3>
                  <p className="text-text-secondary text-sm">{m.duration}</p>
                </Card>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="text-center mt-10">
              <Button href="/meditacion">Entrar a la sala</Button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Biblioteca */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <SectionTitle title="Biblioteca" />
          </FadeInSection>
          <FadeInSection>
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.map((a) => (
                <Card key={a.slug}>
                  <BookOpen className="w-6 h-6 text-accent-blue mb-3" />
                  <h3 className="font-heading font-semibold text-white">{a.title}</h3>
                </Card>
              ))}
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="text-center mt-10">
              <Button href="/biblioteca">Explorar artículos</Button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Test Ruido Mental */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <div className="max-w-2xl mx-auto text-center">
              <ClipboardCheck className="w-10 h-10 text-accent-blue mx-auto mb-6" />
              <SectionTitle
                title="TEST DE RUIDO MENTAL"
                subtitle="Descubre en qué nivel está tu mente y qué necesitas entrenar."
              />
              <Button href="/test">Hacer el test (2 min)</Button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Plan 7 días */}
      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <div className="max-w-2xl mx-auto text-center">
              <SectionTitle
                title="PLAN GRATUITO: 7 DÍAS PARA APAGAR EL RUIDO MENTAL"
                subtitle="Una rutina práctica diaria con ejercicios de metacognición, respiración y presencia."
              />
              <EmailForm />
            </div>
          </FadeInSection>
        </Container>
      </section>
    </>
  )
}
