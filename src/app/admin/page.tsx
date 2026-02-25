'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Container from '@/components/Container'
import {
  Users, Mail, Phone, MessageSquare, BarChart3, LogOut,
  ChevronRight, Loader2, Trash2, UserCheck, UserX, Crown,
  Calendar, Clock, PhoneCall, PhoneMissed, Download, RefreshCw
} from 'lucide-react'

type Tab = 'resumen' | 'clientes' | 'leads' | 'contactos' | 'llamadas' | 'comunidad'

type Cliente = {
  id: string; nombre: string; email: string; telefono: string
  estado: string; plan: string; notas: string; fechaAlta: string
  sesionesTotales: number; tags: string[]
}
type Lead = { id: string; email: string; name: string; source: string; created_at: string }
type Contacto = { id: string; name: string; email: string; message: string; created_at: string }
type Llamada = {
  id: string; clienteNombre: string; telefono: string; tipo: string
  fecha: string; hora: string; duracion: number; notas: string; motivo: string
}
type Post = {
  id: string; autor: string; avatar: string; nivel: string
  texto: string; likes: number; replies: number; tag: string; created_at: string
}

export default function AdminPage() {
  const { isAdmin, adminLogout } = useAdmin()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('resumen')
  const [loading, setLoading] = useState(true)

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [llamadas, setLlamadas] = useState<Llamada[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [cRes, lRes, coRes, llRes, pRes] = await Promise.allSettled([
        fetch('/api/clients'),
        fetch('/api/leads'),
        fetch('/api/contact'),
        fetch('/api/calls'),
        fetch('/api/community'),
      ])
      if (cRes.status === 'fulfilled' && cRes.value.ok) setClientes(await cRes.value.json())
      if (lRes.status === 'fulfilled' && lRes.value.ok) setLeads(await lRes.value.json())
      if (coRes.status === 'fulfilled' && coRes.value.ok) setContactos(await coRes.value.json())
      if (llRes.status === 'fulfilled' && llRes.value.ok) setLlamadas(await llRes.value.json())
      if (pRes.status === 'fulfilled' && pRes.value.ok) setPosts(await pRes.value.json())
    } catch (err) {
      console.error('Error loading admin data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login')
      return
    }
    fetchAll()
  }, [isAdmin, router, fetchAll])

  if (!isAdmin) return null

  const handleLogout = () => {
    adminLogout()
    router.push('/admin/login')
  }

  const deleteItem = async (table: string, id: string) => {
    try {
      await fetch(`/api/admin/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id }),
      })
      if (table === 'clients') setClientes((prev) => prev.filter((c) => c.id !== id))
      if (table === 'leads') setLeads((prev) => prev.filter((l) => l.id !== id))
      if (table === 'contacts') setContactos((prev) => prev.filter((c) => c.id !== id))
      if (table === 'calls') setLlamadas((prev) => prev.filter((l) => l.id !== id))
      if (table === 'community_posts') setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const tabs: { id: Tab; label: string; icon: typeof Users; count: number }[] = [
    { id: 'resumen', label: 'Resumen', icon: BarChart3, count: 0 },
    { id: 'clientes', label: 'Clientes', icon: Users, count: clientes.length },
    { id: 'leads', label: 'Leads', icon: Mail, count: leads.length },
    { id: 'contactos', label: 'Mensajes', icon: MessageSquare, count: contactos.length },
    { id: 'llamadas', label: 'Llamadas', icon: Phone, count: llamadas.length },
    { id: 'comunidad', label: 'Comunidad', icon: Users, count: posts.length },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent-blue animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="orb w-80 h-80 bg-accent-blue top-10 -right-24" />
      <div className="orb w-64 h-64 bg-purple-600 top-96 -left-32" />

      {/* Header */}
      <section className="pt-8 md:pt-12 pb-4">
        <Container>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-white animate-fade-in">
                Panel Admin
              </h1>
              <p className="text-text-secondary text-sm">Gestiona toda tu plataforma</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchAll}
                className="p-2.5 rounded-xl glass text-text-secondary hover:text-white transition-colors active:scale-90"
                title="Refrescar datos"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium active:scale-95 transition-transform"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Tabs */}
      <section className="pb-4">
        <Container>
          <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'glass text-text-muted hover:text-white'
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
                {t.count > 0 && (
                  <span className="px-1.5 py-0.5 bg-white/10 rounded-full text-[10px]">{t.count}</span>
                )}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="pb-16">
        <Container>
          {/* RESUMEN */}
          {tab === 'resumen' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Clientes', value: clientes.length, icon: Users, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
                  { label: 'Leads', value: leads.length, icon: Mail, color: 'text-green-400', bg: 'bg-green-500/10' },
                  { label: 'Mensajes', value: contactos.length, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { label: 'Llamadas', value: llamadas.length, icon: Phone, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                    <p className="font-heading text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-text-muted text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="glass rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-green-400" /> Clientes por estado
                  </h3>
                  <div className="space-y-2">
                    {['activo', 'nuevo', 'potencial', 'inactivo'].map((estado) => {
                      const count = clientes.filter((c) => c.estado === estado).length
                      const colors: Record<string, string> = {
                        activo: 'bg-green-400', nuevo: 'bg-blue-400',
                        potencial: 'bg-yellow-400', inactivo: 'bg-red-400',
                      }
                      return (
                        <div key={estado} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${colors[estado]}`} />
                          <span className="text-text-secondary text-sm capitalize flex-1">{estado}</span>
                          <span className="text-white font-medium text-sm">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" /> Planes
                  </h3>
                  <div className="space-y-2">
                    {['premium', 'free', 'ninguno'].map((plan) => {
                      const count = clientes.filter((c) => c.plan === plan).length
                      const colors: Record<string, string> = {
                        premium: 'bg-yellow-400', free: 'bg-blue-400', ninguno: 'bg-gray-400',
                      }
                      return (
                        <div key={plan} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${colors[plan]}`} />
                          <span className="text-text-secondary text-sm capitalize flex-1">{plan}</span>
                          <span className="text-white font-medium text-sm">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Recent leads */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-400" /> Últimos leads
                </h3>
                {leads.length === 0 ? (
                  <p className="text-text-muted text-sm">Sin leads todavía</p>
                ) : (
                  <div className="space-y-2">
                    {leads.slice(0, 5).map((l) => (
                      <div key={l.id} className="flex items-center gap-3 glass-light rounded-xl p-3">
                        <Mail className="w-4 h-4 text-green-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{l.email}</p>
                          <p className="text-text-muted text-[10px]">{l.name || 'Sin nombre'} · {l.source}</p>
                        </div>
                        <span className="text-text-muted text-[10px] shrink-0">
                          {new Date(l.created_at).toLocaleDateString('es')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CLIENTES */}
          {tab === 'clientes' && (
            <div className="space-y-2 animate-fade-in">
              {clientes.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <Users className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No hay clientes registrados</p>
                </div>
              ) : (
                clientes.map((c) => {
                  const estadoColors: Record<string, string> = {
                    activo: 'text-green-400 bg-green-500/10',
                    inactivo: 'text-red-400 bg-red-500/10',
                    nuevo: 'text-blue-400 bg-blue-500/10',
                    potencial: 'text-yellow-400 bg-yellow-500/10',
                  }
                  return (
                    <div key={c.id} className="glass rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-accent-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-white text-sm font-medium truncate">{c.nombre}</p>
                            {c.plan === 'premium' && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">PRO</span>
                            )}
                          </div>
                          <p className="text-text-muted text-xs">{c.email} · {c.telefono}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${estadoColors[c.estado] || 'text-text-muted bg-white/5'}`}>
                              {c.estado}
                            </span>
                            <span className="text-text-muted text-[10px]">{c.sesionesTotales} sesiones</span>
                            {c.fechaAlta && <span className="text-text-muted text-[10px]">Alta: {c.fechaAlta}</span>}
                          </div>
                          {c.notas && <p className="text-text-secondary text-xs mt-2">{c.notas}</p>}
                        </div>
                        <button
                          onClick={() => deleteItem('clients', c.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* LEADS */}
          {tab === 'leads' && (
            <div className="space-y-2 animate-fade-in">
              {leads.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <Mail className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No hay leads captados</p>
                </div>
              ) : (
                leads.map((l) => (
                  <div key={l.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{l.email}</p>
                      <p className="text-text-muted text-xs">
                        {l.name || 'Sin nombre'} · Fuente: {l.source} · {new Date(l.created_at).toLocaleDateString('es')}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteItem('leads', l.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* CONTACTOS / MENSAJES */}
          {tab === 'contactos' && (
            <div className="space-y-2 animate-fade-in">
              {contactos.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <MessageSquare className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No hay mensajes de contacto</p>
                </div>
              ) : (
                contactos.map((c) => (
                  <div key={c.id} className="glass rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-white text-sm font-medium">{c.name}</p>
                          <span className="text-text-muted text-[10px]">{new Date(c.created_at).toLocaleDateString('es')}</span>
                        </div>
                        <p className="text-accent-blue text-xs mb-1">{c.email}</p>
                        <p className="text-text-secondary text-sm leading-relaxed">{c.message}</p>
                      </div>
                      <button
                        onClick={() => deleteItem('contacts', c.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* LLAMADAS */}
          {tab === 'llamadas' && (
            <div className="space-y-2 animate-fade-in">
              {llamadas.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <Phone className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No hay llamadas registradas</p>
                </div>
              ) : (
                llamadas.map((l) => {
                  const tipoColors: Record<string, { color: string; bg: string; icon: typeof Phone }> = {
                    programada: { color: 'text-accent-blue', bg: 'bg-accent-blue/10', icon: PhoneCall },
                    completada: { color: 'text-green-400', bg: 'bg-green-500/10', icon: Phone },
                    perdida: { color: 'text-red-400', bg: 'bg-red-500/10', icon: PhoneMissed },
                    cancelada: { color: 'text-text-muted', bg: 'bg-white/5', icon: Phone },
                  }
                  const cfg = tipoColors[l.tipo] || tipoColors.programada
                  return (
                    <div key={l.id} className="glass rounded-2xl p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                        <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{l.clienteNombre}</p>
                        <p className="text-text-muted text-xs">
                          {l.fecha} · {l.hora} · {l.motivo}
                          {l.duracion > 0 && ` · ${l.duracion}min`}
                        </p>
                        {l.notas && <p className="text-text-secondary text-xs mt-1">{l.notas}</p>}
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${cfg.bg} ${cfg.color} shrink-0`}>
                        {l.tipo}
                      </span>
                      <button
                        onClick={() => deleteItem('calls', l.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* COMUNIDAD */}
          {tab === 'comunidad' && (
            <div className="space-y-2 animate-fade-in">
              {posts.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <Users className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">No hay posts en la comunidad</p>
                </div>
              ) : (
                posts.map((p) => (
                  <div key={p.id} className="glass rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-lg shrink-0">
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-white text-sm font-medium">{p.autor}</p>
                          <span className="text-text-muted text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full">{p.nivel}</span>
                          <span className="text-text-muted text-[10px] px-1.5 py-0.5 bg-white/5 rounded-full">{p.tag}</span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{p.texto}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-text-muted text-[10px]">{p.likes} likes</span>
                          <span className="text-text-muted text-[10px]">{p.replies} respuestas</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem('community_posts', p.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}
