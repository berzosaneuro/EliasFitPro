'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import {
  Phone, PhoneCall, PhoneOff, PhoneMissed, Calendar, Clock, User,
  Plus, X, Check, Bell, MessageSquare, ChevronRight, Repeat, Send
} from 'lucide-react'

const STORAGE_KEY = 'neuropresencia_llamadas'

type Llamada = {
  id: string
  clienteNombre: string
  telefono: string
  tipo: 'programada' | 'completada' | 'perdida' | 'cancelada'
  fecha: string
  hora: string
  duracion: number // minutos
  notas: string
  recordatorio: boolean
  motivo: string
}

type Plantilla = {
  id: string
  nombre: string
  mensaje: string
  tipo: 'recordatorio' | 'seguimiento' | 'bienvenida' | 'reactivacion'
}

const PLANTILLAS: Plantilla[] = [
  {
    id: '1', nombre: 'Recordatorio de sesión', tipo: 'recordatorio',
    mensaje: 'Hola {nombre}, te recordamos tu sesión de mañana a las {hora}. ¿Confirmas asistencia?'
  },
  {
    id: '2', nombre: 'Seguimiento post-sesión', tipo: 'seguimiento',
    mensaje: 'Hola {nombre}, ¿cómo te has sentido después de nuestra última sesión? Recuerda practicar los ejercicios que comentamos.'
  },
  {
    id: '3', nombre: 'Bienvenida nuevo cliente', tipo: 'bienvenida',
    mensaje: 'Hola {nombre}, bienvenido/a a Neuropresencia. Soy tu guía en este camino de consciencia. ¿Cuándo te vendría bien nuestra primera sesión?'
  },
  {
    id: '4', nombre: 'Reactivación', tipo: 'reactivacion',
    mensaje: 'Hola {nombre}, hace tiempo que no nos vemos. ¿Te gustaría retomar las sesiones? Tengo disponibilidad esta semana.'
  },
]

const DEMO_LLAMADAS: Llamada[] = [
  {
    id: '1', clienteNombre: 'María García', telefono: '+34 612 345 678',
    tipo: 'programada', fecha: '2026-02-25', hora: '10:00', duracion: 0,
    notas: 'Sesión semanal de seguimiento', recordatorio: true, motivo: 'Sesión regular'
  },
  {
    id: '2', clienteNombre: 'Carlos Ruiz', telefono: '+34 634 567 890',
    tipo: 'programada', fecha: '2026-02-25', hora: '12:30', duracion: 0,
    notas: 'Revisión de progreso mensual', recordatorio: true, motivo: 'Revisión'
  },
  {
    id: '3', clienteNombre: 'Diego Herrera', telefono: '+34 611 222 333',
    tipo: 'programada', fecha: '2026-02-26', hora: '16:00', duracion: 0,
    notas: 'Sesión de neuroplasticidad avanzada', recordatorio: false, motivo: 'Sesión regular'
  },
  {
    id: '4', clienteNombre: 'Ana Fernández', telefono: '+34 656 789 012',
    tipo: 'completada', fecha: '2026-02-24', hora: '11:00', duracion: 45,
    notas: 'Primera sesión completa. Muy receptiva.', recordatorio: false, motivo: 'Primera sesión'
  },
  {
    id: '5', clienteNombre: 'Laura Moreno', telefono: '+34 690 123 456',
    tipo: 'perdida', fecha: '2026-02-22', hora: '09:30', duracion: 0,
    notas: 'No contestó. Tercer intento.', recordatorio: false, motivo: 'Seguimiento'
  },
  {
    id: '6', clienteNombre: 'Pablo Sánchez', telefono: '+34 678 901 234',
    tipo: 'programada', fecha: '2026-02-27', hora: '18:00', duracion: 0,
    notas: 'Llamada de captación inicial', recordatorio: true, motivo: 'Captación'
  },
]

function loadLlamadas(): Llamada[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEMO_LLAMADAS
}

function saveLlamadas(llamadas: Llamada[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(llamadas))
}

const tipoConfig = {
  programada: { color: 'text-accent-blue', bg: 'bg-accent-blue/10', icon: PhoneCall, label: 'Programada' },
  completada: { color: 'text-green-400', bg: 'bg-green-500/10', icon: Phone, label: 'Completada' },
  perdida: { color: 'text-red-400', bg: 'bg-red-500/10', icon: PhoneMissed, label: 'Perdida' },
  cancelada: { color: 'text-text-muted', bg: 'bg-white/5', icon: PhoneOff, label: 'Cancelada' },
}

export default function LlamadasPage() {
  const [llamadas, setLlamadas] = useState<Llamada[]>([])
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<'agenda' | 'historial' | 'bot'>('agenda')
  const [showNueva, setShowNueva] = useState(false)
  const [showPlantilla, setShowPlantilla] = useState<Plantilla | null>(null)
  const [nuevaForm, setNuevaForm] = useState({ clienteNombre: '', telefono: '', fecha: '', hora: '', notas: '', motivo: '' })

  useEffect(() => {
    setMounted(true)
    setLlamadas(loadLlamadas())
  }, [])

  const hoy = new Date().toISOString().split('T')[0]
  const programadas = llamadas.filter((l) => l.tipo === 'programada').sort((a, b) => `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`))
  const historial = llamadas.filter((l) => l.tipo !== 'programada').sort((a, b) => b.fecha.localeCompare(a.fecha))
  const llamadasHoy = programadas.filter((l) => l.fecha === hoy)
  const llamadasProximas = programadas.filter((l) => l.fecha > hoy)

  const stats = {
    hoy: llamadasHoy.length,
    semana: programadas.filter((l) => {
      const d = new Date(l.fecha)
      const now = new Date()
      const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      return diff >= 0 && diff <= 7
    }).length,
    completadas: llamadas.filter((l) => l.tipo === 'completada').length,
    perdidas: llamadas.filter((l) => l.tipo === 'perdida').length,
  }

  const addLlamada = () => {
    if (!nuevaForm.clienteNombre.trim() || !nuevaForm.fecha || !nuevaForm.hora) return
    const nueva: Llamada = {
      id: Date.now().toString(),
      clienteNombre: nuevaForm.clienteNombre,
      telefono: nuevaForm.telefono,
      tipo: 'programada',
      fecha: nuevaForm.fecha,
      hora: nuevaForm.hora,
      duracion: 0,
      notas: nuevaForm.notas,
      recordatorio: true,
      motivo: nuevaForm.motivo || 'Sesión',
    }
    const updated = [nueva, ...llamadas]
    setLlamadas(updated)
    saveLlamadas(updated)
    setShowNueva(false)
    setNuevaForm({ clienteNombre: '', telefono: '', fecha: '', hora: '', notas: '', motivo: '' })
  }

  const marcarCompletada = (id: string) => {
    const updated = llamadas.map((l) =>
      l.id === id ? { ...l, tipo: 'completada' as const, duracion: 45 } : l
    )
    setLlamadas(updated)
    saveLlamadas(updated)
  }

  const marcarPerdida = (id: string) => {
    const updated = llamadas.map((l) =>
      l.id === id ? { ...l, tipo: 'perdida' as const } : l
    )
    setLlamadas(updated)
    saveLlamadas(updated)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="orb w-80 h-80 bg-green-600 top-10 -right-24" />
      <div className="orb w-64 h-64 bg-accent-blue top-96 -left-32" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white animate-fade-in">
              Llamadas
            </h1>
            <button
              onClick={() => setShowNueva(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-500 rounded-xl text-white text-sm font-medium active:scale-95 transition-transform"
            >
              <Plus className="w-4 h-4" />
              Agendar
            </button>
          </div>
          <p className="text-text-secondary text-sm animate-fade-in-up">
            Agenda, seguimiento y bot de llamadas.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-4">
        <Container>
          <FadeInSection>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Hoy', value: stats.hoy, color: 'text-accent-blue' },
                { label: 'Semana', value: stats.semana, color: 'text-white' },
                { label: 'Hechas', value: stats.completadas, color: 'text-green-400' },
                { label: 'Perdidas', value: stats.perdidas, color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-3 text-center">
                  <p className={`font-heading text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-text-muted text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Tabs */}
      <section className="pb-4">
        <Container>
          <div className="flex gap-1 glass rounded-xl p-1">
            {[
              { id: 'agenda' as const, label: 'Agenda', icon: Calendar },
              { id: 'historial' as const, label: 'Historial', icon: Clock },
              { id: 'bot' as const, label: 'Bot mensajes', icon: MessageSquare },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  tab === t.id ? 'bg-white/10 text-white' : 'text-text-muted'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Tab content */}
      <section className="pb-12">
        <Container>
          <FadeInSection>
            {tab === 'agenda' && (
              <div className="space-y-4">
                {/* Today */}
                {llamadasHoy.length > 0 && (
                  <div>
                    <h2 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Hoy
                    </h2>
                    <div className="space-y-2">
                      {llamadasHoy.map((l) => {
                        const cfg = tipoConfig[l.tipo]
                        return (
                          <div key={l.id} className="glass rounded-2xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                                <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm font-medium">{l.clienteNombre}</p>
                                <p className="text-text-muted text-xs">{l.hora} · {l.motivo}</p>
                              </div>
                              {l.recordatorio && <Bell className="w-4 h-4 text-yellow-400" />}
                            </div>
                            {l.notas && <p className="text-text-secondary text-xs mb-3">{l.notas}</p>}
                            <div className="flex gap-2">
                              <a
                                href={`tel:${l.telefono}`}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-500/10 text-green-400 text-xs font-medium active:scale-95 transition-transform"
                              >
                                <Phone className="w-3.5 h-3.5" /> Llamar
                              </a>
                              <button
                                onClick={() => marcarCompletada(l.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-accent-blue/10 text-accent-blue text-xs font-medium active:scale-95 transition-transform"
                              >
                                <Check className="w-3.5 h-3.5" /> Hecha
                              </button>
                              <button
                                onClick={() => marcarPerdida(l.id)}
                                className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-red-500/10 text-red-400 text-xs active:scale-95 transition-transform"
                              >
                                <PhoneMissed className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Upcoming */}
                {llamadasProximas.length > 0 && (
                  <div>
                    <h2 className="text-white text-sm font-semibold mb-2">Próximas</h2>
                    <div className="space-y-2">
                      {llamadasProximas.map((l) => {
                        const cfg = tipoConfig[l.tipo]
                        return (
                          <div key={l.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                              <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{l.clienteNombre}</p>
                              <p className="text-text-muted text-xs">{l.fecha} · {l.hora} · {l.motivo}</p>
                            </div>
                            {l.recordatorio && <Bell className="w-3.5 h-3.5 text-yellow-400" />}
                            <a href={`tel:${l.telefono}`}>
                              <Phone className="w-4 h-4 text-green-400" />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {programadas.length === 0 && (
                  <div className="glass rounded-2xl p-8 text-center">
                    <Calendar className="w-10 h-10 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary text-sm">No hay llamadas programadas</p>
                    <button
                      onClick={() => setShowNueva(true)}
                      className="mt-3 px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-xl text-sm font-medium"
                    >
                      Agendar llamada
                    </button>
                  </div>
                )}
              </div>
            )}

            {tab === 'historial' && (
              <div className="space-y-2">
                {historial.length === 0 ? (
                  <div className="glass rounded-2xl p-8 text-center">
                    <Clock className="w-10 h-10 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary text-sm">Sin historial de llamadas</p>
                  </div>
                ) : (
                  historial.map((l) => {
                    const cfg = tipoConfig[l.tipo]
                    return (
                      <div key={l.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                          <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{l.clienteNombre}</p>
                          <p className="text-text-muted text-xs">
                            {l.fecha} · {l.hora}
                            {l.duracion > 0 && ` · ${l.duracion}min`}
                          </p>
                          {l.notas && <p className="text-text-secondary text-xs mt-1">{l.notas}</p>}
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {tab === 'bot' && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold">Bot de mensajes</h3>
                      <p className="text-text-muted text-xs">Plantillas automáticas para WhatsApp</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-xs">
                    Usa estas plantillas para enviar mensajes de recordatorio, seguimiento y captación a tus clientes.
                  </p>
                </div>

                <div className="space-y-2">
                  {PLANTILLAS.map((p) => {
                    const colorMap = {
                      recordatorio: { color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                      seguimiento: { color: 'text-green-400', bg: 'bg-green-500/10' },
                      bienvenida: { color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
                      reactivacion: { color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    }
                    const col = colorMap[p.tipo]
                    return (
                      <button
                        key={p.id}
                        onClick={() => setShowPlantilla(p)}
                        className="w-full glass rounded-2xl p-4 flex items-center gap-3 card-hover text-left"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${col.bg}`}>
                          <Send className={`w-4 h-4 ${col.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{p.nombre}</p>
                          <p className="text-text-muted text-xs capitalize">{p.tipo}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </FadeInSection>
        </Container>
      </section>

      {/* New call modal */}
      {showNueva && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNueva(false)} />
          <div className="relative glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-white">Agendar llamada</h2>
              <button onClick={() => setShowNueva(false)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del cliente *"
                value={nuevaForm.clienteNombre}
                onChange={(e) => setNuevaForm({ ...nuevaForm, clienteNombre: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={nuevaForm.telefono}
                onChange={(e) => setNuevaForm({ ...nuevaForm, telefono: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={nuevaForm.fecha}
                  onChange={(e) => setNuevaForm({ ...nuevaForm, fecha: e.target.value })}
                  className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                />
                <input
                  type="time"
                  value={nuevaForm.hora}
                  onChange={(e) => setNuevaForm({ ...nuevaForm, hora: e.target.value })}
                  className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                />
              </div>
              <input
                type="text"
                placeholder="Motivo (ej: Sesión regular, Seguimiento...)"
                value={nuevaForm.motivo}
                onChange={(e) => setNuevaForm({ ...nuevaForm, motivo: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <textarea
                placeholder="Notas"
                value={nuevaForm.notas}
                onChange={(e) => setNuevaForm({ ...nuevaForm, notas: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50 resize-none"
              />
              <button
                onClick={addLlamada}
                disabled={!nuevaForm.clienteNombre.trim() || !nuevaForm.fecha || !nuevaForm.hora}
                className="w-full py-3 bg-green-500 rounded-xl text-white font-medium text-sm active:scale-95 transition-transform disabled:opacity-40"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Agendar llamada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template preview modal */}
      {showPlantilla && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPlantilla(null)} />
          <div className="relative glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-bold text-white">{showPlantilla.nombre}</h2>
              <button onClick={() => setShowPlantilla(null)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="glass-light rounded-2xl p-4 mb-4">
              <p className="text-white text-sm leading-relaxed">{showPlantilla.mensaje}</p>
            </div>

            <p className="text-text-muted text-xs mb-4">
              Los campos {'{nombre}'} y {'{hora}'} se reemplazarán automáticamente con los datos del cliente.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(showPlantilla.mensaje)
                  setShowPlantilla(null)
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-blue/10 text-accent-blue text-sm font-medium active:scale-95 transition-transform"
              >
                <Repeat className="w-4 h-4" /> Copiar
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(showPlantilla.mensaje)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-medium active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
