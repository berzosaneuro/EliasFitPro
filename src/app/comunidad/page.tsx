'use client'

import { useState, useEffect, useCallback } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import {
  Users, MessageCircle, Video, Calendar, Heart, Star, Send,
  Crown, Flame, Clock, ChevronRight, Radio, Globe, Award, X, Loader2
} from 'lucide-react'

type Post = {
  id: string
  autor: string
  avatar: string
  nivel: string
  texto: string
  created_at: string
  likes: number
  liked: boolean
  replies: number
  tag: string
}

type SesionGrupal = {
  id: string
  titulo: string
  guia: string
  fecha: string
  hora: string
  duracion: string
  participantes: number
  maxParticipantes: number
  tipo: 'meditacion' | 'charla' | 'taller' | 'retiro'
  enVivo: boolean
}

const SESIONES_GRUPALES: SesionGrupal[] = [
  {
    id: '1', titulo: 'Meditación grupal: El observador', guia: 'Dr. Berzosa',
    fecha: '2026-02-25', hora: '20:00', duracion: '30 min',
    participantes: 47, maxParticipantes: 100, tipo: 'meditacion', enVivo: true,
  },
  {
    id: '2', titulo: 'Charla: Neuroplasticidad y hábitos', guia: 'Equipo Neuro',
    fecha: '2026-02-26', hora: '19:00', duracion: '45 min',
    participantes: 23, maxParticipantes: 50, tipo: 'charla', enVivo: false,
  },
  {
    id: '3', titulo: 'Taller: Disolución del ego práctico', guia: 'Dr. Berzosa',
    fecha: '2026-02-28', hora: '18:00', duracion: '60 min',
    participantes: 15, maxParticipantes: 30, tipo: 'taller', enVivo: false,
  },
  {
    id: '4', titulo: 'Retiro digital: 4h de silencio consciente', guia: 'Comunidad',
    fecha: '2026-03-01', hora: '10:00', duracion: '4h',
    participantes: 8, maxParticipantes: 20, tipo: 'retiro', enVivo: false,
  },
]

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return 'ahora'
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`
  return `hace ${Math.floor(diff / 86400)}d`
}

const tipoConfig = {
  meditacion: { color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Radio },
  charla: { color: 'text-accent-blue', bg: 'bg-accent-blue/10', icon: MessageCircle },
  taller: { color: 'text-green-400', bg: 'bg-green-500/10', icon: Award },
  retiro: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: Globe },
}

const tagConfig: Record<string, { color: string; bg: string }> = {
  experiencia: { color: 'text-green-400', bg: 'bg-green-500/10' },
  pregunta: { color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
  enseñanza: { color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  progreso: { color: 'text-purple-400', bg: 'bg-purple-500/10' },
}

export default function ComunidadPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<'foro' | 'sesiones'>('foro')
  const [nuevoPost, setNuevoPost] = useState('')
  const [showNuevoPost, setShowNuevoPost] = useState(false)
  const [posting, setPosting] = useState(false)

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/community')
      if (res.ok) {
        const data = await res.json()
        setPosts(data.map((p: Post) => ({ ...p, liked: false })))
      }
    } catch {
      // Silently fail
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    loadPosts()
  }, [loadPosts])

  const toggleLike = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    const newLikes = post.liked ? post.likes - 1 : post.likes + 1
    const updated = posts.map((p) => {
      if (p.id !== id) return p
      return { ...p, liked: !p.liked, likes: newLikes }
    })
    setPosts(updated)

    try {
      await fetch('/api/community', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, likes: newLikes }),
      })
    } catch {
      // Revert on error
      setPosts(posts)
    }
  }

  const addPost = async () => {
    if (!nuevoPost.trim()) return
    setPosting(true)

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor: 'Tú',
          avatar: '🌟',
          nivel: 'Observador',
          texto: nuevoPost.trim(),
          tag: 'experiencia',
        }),
      })

      if (res.ok) {
        const newPost = await res.json()
        setPosts([{ ...newPost, liked: false }, ...posts])
      }
    } catch {
      // Silently fail
    }

    setNuevoPost('')
    setShowNuevoPost(false)
    setPosting(false)
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
      <div className="orb w-80 h-80 bg-accent-blue top-10 -right-24" />
      <div className="orb w-64 h-64 bg-purple-600 top-[600px] -left-32" />

      {/* Header */}
      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white animate-fade-in">
              Comunidad
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">247 online</span>
              </div>
            </div>
          </div>
          <p className="text-text-secondary text-sm animate-fade-in-up">
            Crece junto a otros que están despertando.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-4">
        <Container>
          <FadeInSection>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Users, value: '2.4K', label: 'Miembros', color: 'text-accent-blue' },
                { icon: Flame, value: '89%', label: 'Activos', color: 'text-orange-400' },
                { icon: Video, value: '4', label: 'Sesiones/sem', color: 'text-purple-400' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-3 text-center">
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                  <p className={`font-heading text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-text-muted text-[10px]">{s.label}</p>
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
              { id: 'foro' as const, label: 'Foro', icon: MessageCircle },
              { id: 'sesiones' as const, label: 'Sesiones en vivo', icon: Video },
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

      {/* Content */}
      <section className="pb-12">
        <Container>
          <FadeInSection>
            {tab === 'foro' && (
              <div className="space-y-3">
                {/* New post button */}
                <button
                  onClick={() => setShowNuevoPost(true)}
                  className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-left card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                    <Send className="w-4 h-4 text-accent-blue" />
                  </div>
                  <span className="text-text-muted text-sm">Comparte tu experiencia...</span>
                </button>

                {/* Posts */}
                {posts.map((post) => {
                  const tConfig = tagConfig[post.tag] || tagConfig.experiencia
                  return (
                    <div key={post.id} className="glass rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-medium">{post.autor}</span>
                            {post.autor === 'Dr. Berzosa' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 font-medium">Guía</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-text-muted text-[10px]">{post.nivel}</span>
                            <span className="text-text-muted text-[10px]">·</span>
                            <span className="text-text-muted text-[10px]">{timeAgo(post.created_at)}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tConfig.bg} ${tConfig.color}`}>
                          {post.tag}
                        </span>
                      </div>

                      <p className="text-white text-sm leading-relaxed mb-3">{post.texto}</p>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs transition-all active:scale-90 ${
                            post.liked ? 'text-red-400' : 'text-text-muted'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? 'fill-red-400' : ''}`} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-text-muted">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {tab === 'sesiones' && (
              <div className="space-y-3">
                {SESIONES_GRUPALES.map((s) => {
                  const cfg = tipoConfig[s.tipo]
                  const plazas = s.maxParticipantes - s.participantes
                  return (
                    <div key={s.id} className={`glass rounded-2xl p-4 ${s.enVivo ? 'border border-green-500/20' : ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                          <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium">{s.titulo}</p>
                            {s.enVivo && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 font-medium flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                EN VIVO
                              </span>
                            )}
                          </div>
                          <p className="text-text-muted text-xs">
                            {s.guia} · {s.fecha} · {s.hora} · {s.duracion}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-text-muted" />
                            <span className="text-text-muted text-xs">{s.participantes}/{s.maxParticipantes}</span>
                          </div>
                          <span className={`text-xs ${plazas < 10 ? 'text-orange-400' : 'text-text-muted'}`}>
                            {plazas} plazas
                          </span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-xl text-xs font-medium active:scale-95 transition-transform ${
                            s.enVivo
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-accent-blue/10 text-accent-blue'
                          }`}
                        >
                          {s.enVivo ? 'Unirse ahora' : 'Reservar plaza'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </FadeInSection>
        </Container>
      </section>

      {/* New post modal */}
      {showNuevoPost && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNuevoPost(false)} />
          <div className="relative glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-bold text-white">Compartir con la comunidad</h2>
              <button onClick={() => setShowNuevoPost(false)} className="p-2 rounded-xl bg-white/5 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <textarea
              value={nuevoPost}
              onChange={(e) => setNuevoPost(e.target.value)}
              placeholder="Comparte tu experiencia, pregunta o reflexión..."
              rows={4}
              className="w-full px-4 py-3 glass-light rounded-xl text-white text-sm placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-blue/50 resize-none mb-3"
            />
            <button
              onClick={addPost}
              disabled={!nuevoPost.trim() || posting}
              className="w-full py-3 bg-accent-blue rounded-xl text-white font-medium text-sm active:scale-95 transition-transform disabled:opacity-40"
            >
              {posting ? (
                <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 inline mr-2" />
              )}
              {posting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
