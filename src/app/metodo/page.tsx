import { Metadata } from 'next'
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import Card from '@/components/Card'
import FadeInSection from '@/components/FadeInSection'
import { ShieldOff, Target, User, Heart, Eye, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Método N.E.U.R.O. — Neuropresencia',
  description: 'La presencia no se encuentra. Se entrena. Un framework práctico para entrenar conciencia y cortar el ruido mental.',
}

const steps = [
  {
    letter: 'N',
    title: 'Neutraliza el pensamiento',
    icon: ShieldOff,
    explanation: 'El pensamiento no es tu enemigo, pero tampoco es la realidad. La mayoría de lo que piensas son proyecciones, repeticiones y narrativas automáticas. Neutralizar no es suprimir: es quitar al pensamiento su poder de arrastre. Cuando observas un pensamiento sin engancharte, pierde fuerza. Se convierte en lo que realmente es: actividad mental, no verdad absoluta.',
    exercise: 'Siéntate 3 minutos en silencio. Cada vez que aparezca un pensamiento, etiquétalo mentalmente como "pensamiento" sin importar su contenido. No lo sigas, no lo analices. Solo etiqueta y suelta. Repite hasta que notes que los pensamientos pierden intensidad.',
  },
  {
    letter: 'E',
    title: 'Entrena la atención',
    icon: Target,
    explanation: 'La atención es la herramienta más poderosa que tienes y la menos entrenada. Sin atención, no hay presencia. Sin presencia, no hay control sobre tu experiencia. La atención se entrena como un músculo: con repeticiones. Cada vez que notas que tu mente se ha ido y la traes de vuelta, estás haciendo una repetición.',
    exercise: 'Enfócate en tu respiración durante 5 minutos. No la modifiques, solo obsérvala. Cada vez que tu mente se desvíe, nótalo y vuelve a la respiración. Cuenta cuántas veces vuelves: ese es tu entrenamiento del día.',
  },
  {
    letter: 'U',
    title: 'Ubícate en el cuerpo',
    icon: User,
    explanation: 'Tu cuerpo siempre está en el presente. Tu mente casi nunca. Cuando llevas la atención al cuerpo, sales del bucle mental automático y aterrizas en el ahora. Las sensaciones corporales son un ancla perfecta porque son inmediatas, tangibles y siempre disponibles.',
    exercise: 'Haz un escaneo corporal rápido: empieza por los pies y sube lentamente hasta la cabeza. En cada zona, nota qué sientes: tensión, calor, hormigueo, nada. No intentes cambiar nada, solo observa. Dedica 2 minutos a este recorrido.',
  },
  {
    letter: 'R',
    title: 'Regula la emoción',
    icon: Heart,
    explanation: 'Las emociones no son el problema. El problema es la reactividad automática. Regular no es reprimir ni controlar: es crear un espacio entre el estímulo y tu respuesta. En ese espacio está tu libertad. La regulación emocional se basa en tres pasos: detectar, nombrar y elegir.',
    exercise: 'La próxima vez que sientas una emoción intensa (irritación, ansiedad, frustración), para y haz esto: 1) Detecta dónde sientes la emoción en tu cuerpo. 2) Nómbrala mentalmente. 3) Respira tres veces antes de responder o actuar. Nota la diferencia.',
  },
  {
    letter: 'O',
    title: 'Observa sin identificarte',
    icon: Eye,
    explanation: 'Este es el nivel más profundo. Observar sin identificarte significa ser consciente de tus pensamientos, emociones y sensaciones sin creer que eres ellos. Tú no eres tu ansiedad. No eres tu autocrítica. No eres tu miedo. Eres la conciencia que puede observar todo eso. Cuando te identificas con un pensamiento, te arrastra. Cuando lo observas, eres libre.',
    exercise: 'Durante 5 minutos, adopta la posición del observador. Imagina que estás sentado en la orilla de un río y tus pensamientos son hojas que flotan en el agua. Obsérvalos pasar sin subirte a ninguno. Si te enganchas, nótalo y vuelve a la orilla.',
  },
]

const routine = [
  { time: '2 min', activity: 'Respiración consciente' },
  { time: '2 min', activity: 'Observar el pensamiento' },
  { time: '3 min', activity: 'Foco en la respiración' },
  { time: '3 min', activity: 'Conciencia corporal' },
]

export default function MetodoPage() {
  return (
    <>
      <section className="pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              MÉTODO N.E.U.R.O.
            </h1>
            <p className="text-text-secondary text-lg md:text-xl animate-fade-in-up">
              La presencia no se encuentra. Se entrena.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="space-y-16">
            {steps.map((step, i) => (
              <FadeInSection key={step.letter}>
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-12 flex items-center justify-center bg-accent-blue/10 text-accent-blue font-heading font-bold text-xl rounded-xl">
                      {step.letter}
                    </span>
                    <div className="flex items-center gap-3">
                      <step.icon className="w-5 h-5 text-accent-blue" />
                      <h2 className="font-heading text-2xl font-bold text-white">{step.title}</h2>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {step.explanation}
                  </p>
                  <Card className="bg-dark-surface">
                    <h3 className="text-accent-blue font-semibold text-sm uppercase tracking-wider mb-3">Ejercicio práctico</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.exercise}</p>
                  </Card>
                </div>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-dark-border">
        <Container>
          <FadeInSection>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <Clock className="w-8 h-8 text-accent-blue mx-auto mb-4" />
                <SectionTitle title="Rutina Neuropresencia (10 minutos)" />
              </div>
              <div className="space-y-3">
                {routine.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-dark-surface border border-dark-border">
                    <span className="text-accent-blue font-mono font-bold text-sm w-16">{r.time}</span>
                    <span className="text-white">{r.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </Container>
      </section>
    </>
  )
}
