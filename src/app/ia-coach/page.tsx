'use client'

import { useState, useRef, useEffect } from 'react'
import Container from '@/components/Container'
import {
  Brain, Send, Sparkles, Mic, Volume2, RotateCcw, ChevronDown,
  Heart, Shield, Zap, Eye, Moon, Sun, Wind
} from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'coach'
  text: string
  timestamp: Date
  type?: 'text' | 'exercise' | 'meditation' | 'insight'
}

type QuickAction = {
  label: string
  icon: React.ElementType
  prompt: string
  color: string
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Ansiedad', icon: Wind, prompt: 'Siento ansiedad ahora mismo, necesito ayuda para calmarme', color: 'text-cyan-400' },
  { label: 'Meditar', icon: Moon, prompt: 'Quiero hacer una meditación guiada ahora', color: 'text-purple-400' },
  { label: 'Despertar', icon: Sun, prompt: 'Quiero un ejercicio para despertar mi consciencia', color: 'text-yellow-400' },
  { label: 'Observar', icon: Eye, prompt: 'Enséñame la técnica del observador consciente', color: 'text-accent-blue' },
]

const COACH_RESPONSES: Record<string, { text: string; type: Message['type'] }[]> = {
  ansiedad: [
    { text: 'Respira. Estoy aquí contigo. Primero, vamos a activar tu sistema nervioso parasimpático con una técnica simple.', type: 'text' },
    { text: '🫁 EJERCICIO DE COHERENCIA CARDÍACA\n\n1. Inhala por la nariz: 5 segundos\n2. Retén el aire: 5 segundos\n3. Exhala por la boca: 5 segundos\n\nRepite 6 veces. Esto sincroniza tu ritmo cardíaco y desactiva la amígdala en menos de 2 minutos.\n\n¿Lo hacemos juntos?', type: 'exercise' },
  ],
  meditar: [
    { text: 'Perfecto. Voy a guiarte una meditación basada en el protocolo de neuroplasticidad del Dr. Sanz.', type: 'text' },
    { text: '🧘 MEDITACIÓN: OBSERVAR EL SILENCIO ENTRE PENSAMIENTOS\n\nDuración: 5 minutos\n\n1. Cierra los ojos. Siente el peso de tu cuerpo.\n2. Observa tus pensamientos como nubes que pasan.\n3. Ahora, busca el ESPACIO entre un pensamiento y otro.\n4. Ese silencio eres tú. No el pensamiento. El espacio.\n5. Cada vez que un pensamiento llegue, no lo sigas. Vuelve al espacio.\n\nEse espacio es supraconsciencia. Es donde siempre has estado, solo que no lo veías.\n\n¿Cómo ha ido?', type: 'meditation' },
  ],
  despertar: [
    { text: 'El despertar no es un evento místico. Es neurociencia: es el momento en que tu corteza prefrontal toma el control sobre la amígdala y dejas de reaccionar para empezar a RESPONDER.', type: 'insight' },
    { text: '⚡ EJERCICIO DE MICRO-DESPERTAR\n\nHazlo ahora mismo:\n\n1. Mira tus manos. Realmente míralas. Como si fuera la primera vez.\n2. Siente la temperatura del aire en tu piel.\n3. Escucha el sonido más lejano que puedas detectar.\n4. Pregúntate: "¿Quién está observando esto?"\n\nEse que observa no es tu mente. Es tu consciencia pura. Acabas de despertar por un instante.\n\nLa práctica es hacer esto 20 veces al día hasta que sea automático.', type: 'exercise' },
  ],
  observar: [
    { text: 'La técnica del observador consciente es el pilar central de la supraconsciencia. El Dr. Sanz la llama "el meta-skill que cambia todos los demás".', type: 'insight' },
    { text: '👁️ TÉCNICA DEL OBSERVADOR CONSCIENTE\n\nNivel 1 - Observar pensamientos:\n• Siéntate 2 minutos. Solo observa qué pensamientos aparecen.\n• No los juzgues. No los sigas. Solo etiquétalos: "pensamiento".\n\nNivel 2 - Observar emociones:\n• Cuando sientas algo fuerte, di: "Hay tristeza" en vez de "Estoy triste".\n• Esto activa la corteza prefrontal y desactiva la respuesta emocional automática.\n\nNivel 3 - Observar al observador:\n• Pregunta: "¿Quién está observando?"\n• No busques respuesta. La pregunta ES la práctica.\n• Aquí es donde la neurociencia se encuentra con la supraconsciencia.\n\n¿En qué nivel quieres que profundicemos?', type: 'exercise' },
  ],
  default: [
    { text: 'Entiendo. Cada experiencia que describes es una oportunidad para observar cómo funciona tu mente.', type: 'text' },
    { text: 'Déjame darte una perspectiva desde la neurociencia: tu cerebro tiene patrones automáticos (la "mente por defecto"). Lo que hacemos aquí es crear nuevos caminos neuronales conscientes. Cada vez que OBSERVAS un patrón en vez de seguirlo, estás literalmente cambiando la estructura de tu cerebro.\n\n¿Quieres que te guíe un ejercicio específico para lo que sientes ahora?', type: 'insight' },
  ],
}

function getCoachResponse(input: string): { text: string; type: Message['type'] }[] {
  const lower = input.toLowerCase()
  if (lower.includes('ansiedad') || lower.includes('ansioso') || lower.includes('nervio') || lower.includes('calm'))
    return COACH_RESPONSES.ansiedad
  if (lower.includes('medita') || lower.includes('silencio') || lower.includes('paz'))
    return COACH_RESPONSES.meditar
  if (lower.includes('despiert') || lower.includes('conscienci') || lower.includes('present'))
    return COACH_RESPONSES.despertar
  if (lower.includes('observ') || lower.includes('pensamiento') || lower.includes('mente') || lower.includes('ego'))
    return COACH_RESPONSES.observar
  return COACH_RESPONSES.default
}

export default function IACoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'coach',
      text: 'Hola. Soy tu Coach de Consciencia. Estoy aquí para guiarte en tu camino de supraconsciencia con herramientas basadas en neurociencia.\n\n¿Cómo te sientes ahora mismo? O si prefieres, elige una acción rápida.',
      timestamp: new Date(),
      type: 'text',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
      type: 'text',
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const responses = getCoachResponse(text)
    let delay = 1200

    responses.forEach((resp, i) => {
      setTimeout(() => {
        const coachMsg: Message = {
          id: `${Date.now()}-${i}`,
          role: 'coach',
          text: resp.text,
          timestamp: new Date(),
          type: resp.type,
        }
        setMessages((prev) => [...prev, coachMsg])
        if (i === responses.length - 1) setIsTyping(false)
      }, delay)
      delay += 1500 + resp.text.length * 8
    })
  }

  const typeColors = {
    text: '',
    exercise: 'border-l-2 border-green-500/40 pl-3',
    meditation: 'border-l-2 border-purple-500/40 pl-3',
    insight: 'border-l-2 border-yellow-500/40 pl-3',
  }

  return (
    <div className="relative overflow-hidden flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-64px)]">
      <div className="orb w-72 h-72 bg-purple-600 -top-20 -right-20" />

      {/* Header */}
      <div className="shrink-0 pt-6 md:pt-10 pb-4 px-4">
        <Container>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-accent-blue/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                IA Coach
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h1>
              <p className="text-text-muted text-xs">Supraconsciencia guiada por neurociencia</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick actions */}
      <div className="shrink-0 px-4 pb-3">
        <Container>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => sendMessage(action.prompt)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 glass rounded-full text-xs font-medium text-white active:scale-95 transition-transform"
              >
                <action.icon className={`w-3.5 h-3.5 ${action.color}`} />
                {action.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Chat messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 pb-4">
        <Container>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-accent-blue/20 text-white rounded-br-md'
                      : 'glass text-white rounded-bl-md'
                  }`}
                >
                  <div className={msg.type ? typeColors[msg.type] || '' : ''}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-6 md:pb-4 pt-2">
        <Container>
          <div className="glass rounded-2xl flex items-center gap-2 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="¿Cómo te sientes? ¿Qué necesitas?"
              className="flex-1 bg-transparent text-white text-sm px-3 py-2 placeholder:text-text-muted focus:outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 active:scale-90 transition-transform disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}
