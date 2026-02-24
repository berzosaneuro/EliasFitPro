'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import {
  Search, UserPlus, Phone, Mail, Calendar, ChevronRight, Filter,
  User, X, Check
} from 'lucide-react'

const STORAGE_KEY = 'neuropresencia_clientes'

type Cliente = {
  id: string
  nombre: string
  email: string
  telefono: string
  estado: 'activo' | 'inactivo' | 'nuevo' | 'potencial'
  plan: 'free' | 'premium' | 'ninguno'
  notas: string
  ultimaSesion: string
  proximaSesion: string
  sesionesTotales: number
  fechaAlta: string
  tags: string[]
}

const DEMO_CLIENTES: Cliente[] = [
  {
    id: '1', nombre: 'María García López', email: 'maria@email.com', telefono: '+34 612 345 678',
    estado: 'activo', plan: 'premium', notas: 'Progreso excelente en mindfulness',
    ultimaSesion: '2026-02-22', proximaSesion: '2026-02-28', sesionesTotales: 24,
    fechaAlta: '2025-09-15', tags: ['ansiedad', 'meditación']
  },
  {
    id: '2', nombre: 'Carlos Ruiz Martín', email: 'carlos@email.com', telefono: '+34 634 567 890',
    estado: 'activo', plan: 'premium', notas: 'Trabajando gestión emocional',
    ultimaSesion: '2026-02-20', proximaSesion: '2026-02-27', sesionesTotales: 12,
    fechaAlta: '2025-11-03', tags: ['estrés', 'sueño']
  },
  {
    id: '3', nombre: 'Ana Fernández Díaz', email: 'ana@email.com', telefono: '+34 656 789 012',
    estado: 'nuevo', plan: 'free', notas: 'Primera consulta realizada, interesada en programa 21 días',
    ultimaSesion: '2026-02-18', proximaSesion: '2026-03-01', sesionesTotales: 1,
    fechaAlta: '2026-02-18', tags: ['nueva', 'programa-21']
  },
  {
    id: '4', nombre: 'Pablo Sánchez Torres', email: 'pablo@email.com', telefono: '+34 678 901 234',
    estado: 'potencial', plan: 'ninguno', notas: 'Contactó por Instagram, interesado en sesiones',
    ultimaSesion: '', proximaSesion: '', sesionesTotales: 0,
    fechaAlta: '2026-02-23', tags: ['lead', 'instagram']
  },
  {
    id: '5', nombre: 'Laura Moreno Vega', email: 'laura@email.com', telefono: '+34 690 123 456',
    estado: 'inactivo', plan: 'free', notas: 'No responde desde enero, hacer seguimiento',
    ultimaSesion: '2026-01-10', proximaSesion: '', sesionesTotales: 8,
    fechaAlta: '2025-07-20', tags: ['seguimiento', 'reactivar']
  },
  {
    id: '6', nombre: 'Diego Herrera Ruiz', email: 'diego@email.com', telefono: '+34 611 222 333',
    estado: 'activo', plan: 'premium', notas: 'Sesiones semanales, buen progreso en neuroplasticidad',
    ultimaSesion: '2026-02-21', proximaSesion: '2026-02-28', sesionesTotales: 32,
    fechaAlta: '2025-05-10', tags: ['neuroplasticidad', 'avanzado']
  },
]

function loadClientes(): Cliente[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEMO_CLIENTES
}

function saveClientes(clientes: Cliente[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes))
}

const estadoConfig = {
  activo: { color: 'text-green-400', bg: 'bg-green-500/10', label: 'Activo' },
  inactivo: { color: 'text-red-400', bg: 'bg-red-500/10', label: 'Inactivo' },
  nuevo: { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Nuevo' },
  potencial: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Potencial' },
}

const planConfig = {
  premium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'PRO' },
  free: { color: 'text-text-muted', bg: 'bg-white/5', label: 'Free' },
  ninguno: { color: 'text-text-muted', bg: 'bg-white/5', label: '—' },
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [mounted, setMounted] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [showNuevo, setShowNuevo] = useState(false)
  const [nuevoForm, setNuevoForm] = useState({ nombre: '', email: '', telefono: '', notas: '' })

  useEffect(() => {
    setMounted(true)
    setClientes(loadClientes())
  }, [])

  const filtrados = clientes.filter((c) => {
    const matchBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.telefono.includes(busqueda) ||
      c.tags.some((t) => t.toLowerCase().includes(busqueda.toLowerCase()))
    const matchEstado = filtroEstado === 'todos' || c.estado === filtroEstado
    return matchBusqueda && matchEstado
  })

  const stats = {
    total: clientes.length,
    activos: clientes.filter((c) => c.estado === 'activo').length,
    nuevos: clientes.filter((c) => c.estado === 'nuevo').length,
    potenciales: clientes.filter((c) => c.estado === 'potencial').length,
  }

  const addCliente = () => {
    if (!nuevoForm.nombre.trim()) return
    const nuevo: Cliente = {
      id: Date.now().toString(),
      nombre: nuevoForm.nombre,
      email: nuevoForm.email,
      telefono: nuevoForm.telefono,
      estado: 'potencial',
      plan: 'ninguno',
      notas: nuevoForm.notas,
      ultimaSesion: '',
      proximaSesion: '',
      sesionesTotales: 0,
      fechaAlta: new Date().toISOString().split('T')[0],
      tags: ['nuevo'],
    }
    const updated = [nuevo, ...clientes]
    setClientes(updated)
    saveClientes(updated)
    setShowNuevo(false)
    setNuevoForm({ nombre: '', email: '', telefono: '', notas: '' })
  }

  const toggleEstado = (id: string) => {
    const updated = clientes.map((c) => {
      if (c.id !== id) return c
      const estados: Cliente['estado'][] = ['potencial', 'nuevo', 'activo', 'inactivo']
      const idx = estados.indexOf(c.estado)
      return { ...c, estado: estados[(idx + 1) % estados.length] }
    })
    setClientes(updated)
    saveClientes(updated)
    const sel = updated.find((c) => c.id === id)
    if (sel && selectedCliente?.id === id) setSelectedCliente(sel)
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
      <div className="orb w-80 h-80 bg-cyan-600 top-10 -right-24" />
      <div className="orb w-64 h-64 bg-purple-600 top-96 -left-32" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white animate-fade-in">
              Clientes
            </h1>
            <button
              onClick={() => setShowNuevo(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent-blue rounded-xl text-white text-sm font-medium active:scale-95 transition-transform"
            >
              <UserPlus className="w-4 h-4" />
              Nuevo
            </button>
          </div>
          <p className="text-text-secondary text-sm animate-fade-in-up">
            Gestiona tus pacientes y sesiones.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-4">
        <Container>
          <FadeInSection>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Total', value: stats.total, color: 'text-white' },
                { label: 'Activos', value: stats.activos, color: 'text-green-400' },
                { label: 'Nuevos', value: stats.nuevos, color: 'text-blue-400' },
                { label: 'Leads', value: stats.potenciales, color: 'text-yellow-400' },
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

      {/* Search & Filter */}
      <section className="pb-4">
        <Container>
          <FadeInSection>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por nombre, email, tag..."
                  className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                />
              </div>
              <div className="relative">
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="appearance-none glass rounded-xl px-3 py-3 pr-8 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-blue/50 bg-transparent"
                >
                  <option value="todos" className="bg-surface">Todos</option>
                  <option value="activo" className="bg-surface">Activos</option>
                  <option value="nuevo" className="bg-surface">Nuevos</option>
                  <option value="potencial" className="bg-surface">Leads</option>
                  <option value="inactivo" className="bg-surface">Inactivos</option>
                </select>
                <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
              </div>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Client list */}
      <section className="pb-12">
        <Container>
          <FadeInSection>
            <div className="space-y-2">
              {filtrados.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <User className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No se encontraron clientes</p>
                </div>
              ) : (
                filtrados.map((c) => {
                  const est = estadoConfig[c.estado]
                  const pl = planConfig[c.plan]
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCliente(c)}
                      className="w-full glass rounded-2xl p-4 flex items-center gap-3 card-hover text-left"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${est.bg}`}>
                        <User className={`w-5 h-5 ${est.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-medium truncate">{c.nombre}</p>
                          {c.plan === 'premium' && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${pl.bg} ${pl.color}`}>
                              PRO
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${est.bg} ${est.color}`}>
                            {est.label}
                          </span>
                          {c.proximaSesion && (
                            <span className="text-text-muted text-[10px] flex items-center gap-0.5">
                              <Calendar className="w-2.5 h-2.5" />
                              {c.proximaSesion}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-muted text-xs">{c.sesionesTotales}s</span>
                        <ChevronRight className="w-4 h-4 text-text-muted" />
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Client detail modal */}
      {selectedCliente && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCliente(null)} />
          <div className="relative glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-white">{selectedCliente.nombre}</h2>
              <button onClick={() => setSelectedCliente(null)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="flex gap-2 mb-5">
              <button
                onClick={() => toggleEstado(selectedCliente.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${estadoConfig[selectedCliente.estado].bg} ${estadoConfig[selectedCliente.estado].color}`}
              >
                {estadoConfig[selectedCliente.estado].label}
                <ChevronRight className="w-3 h-3" />
              </button>
              <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${planConfig[selectedCliente.plan].bg} ${planConfig[selectedCliente.plan].color}`}>
                {planConfig[selectedCliente.plan].label}
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-blue" />
                <span className="text-white text-sm">{selectedCliente.email}</span>
              </div>
              <div className="glass-light rounded-xl p-3 flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">{selectedCliente.telefono}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="glass-light rounded-xl p-3 text-center">
                <p className="font-heading text-lg font-bold text-white">{selectedCliente.sesionesTotales}</p>
                <p className="text-text-muted text-[10px]">Sesiones</p>
              </div>
              <div className="glass-light rounded-xl p-3 text-center">
                <p className="font-heading text-sm font-bold text-white">{selectedCliente.ultimaSesion || '—'}</p>
                <p className="text-text-muted text-[10px]">Última</p>
              </div>
              <div className="glass-light rounded-xl p-3 text-center">
                <p className="font-heading text-sm font-bold text-accent-blue">{selectedCliente.proximaSesion || '—'}</p>
                <p className="text-text-muted text-[10px]">Próxima</p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-white text-sm font-medium mb-2">Notas</h3>
              <div className="glass-light rounded-xl p-3">
                <p className="text-text-secondary text-sm">{selectedCliente.notas || 'Sin notas'}</p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="text-white text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedCliente.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${selectedCliente.telefono}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-medium active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" /> Llamar
              </a>
              <a
                href={`mailto:${selectedCliente.email}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-blue/10 text-accent-blue text-sm font-medium active:scale-95 transition-transform"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* New client modal */}
      {showNuevo && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNuevo(false)} />
          <div className="relative glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-white">Nuevo cliente</h2>
              <button onClick={() => setShowNuevo(false)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre completo *"
                value={nuevoForm.nombre}
                onChange={(e) => setNuevoForm({ ...nuevoForm, nombre: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={nuevoForm.email}
                onChange={(e) => setNuevoForm({ ...nuevoForm, email: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={nuevoForm.telefono}
                onChange={(e) => setNuevoForm({ ...nuevoForm, telefono: e.target.value })}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
              />
              <textarea
                placeholder="Notas iniciales"
                value={nuevoForm.notas}
                onChange={(e) => setNuevoForm({ ...nuevoForm, notas: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50 resize-none"
              />
              <button
                onClick={addCliente}
                disabled={!nuevoForm.nombre.trim()}
                className="w-full py-3 bg-accent-blue rounded-xl text-white font-medium text-sm active:scale-95 transition-transform disabled:opacity-40"
              >
                <Check className="w-4 h-4 inline mr-2" />
                Añadir cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
