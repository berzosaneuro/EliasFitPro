'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/Container'
import FadeInSection from '@/components/FadeInSection'
import { BookOpen, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'diario_data'

type DiaryEntry = {
  date: string
  presenceLevel: number
  mood: string
  insight: string
}

const moods = [
  { emoji: '😤', label: 'Agitado' },
  { emoji: '😟', label: 'Ansioso' },
  { emoji: '😐', label: 'Neutro' },
  { emoji: '🙂', label: 'Calmado' },
  { emoji: '😌', label: 'Presente' },
]

function loadEntries(): DiaryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveEntries(entries: DiaryEntry[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

export default function DiarioPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [mounted, setMounted] = useState(false)
  const [presenceLevel, setPresenceLevel] = useState(50)
  const [mood, setMood] = useState('')
  const [insight, setInsight] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loaded = loadEntries()
    setEntries(loaded)
    const todayEntry = loaded.find(e => e.date === getToday())
    if (todayEntry) {
      setPresenceLevel(todayEntry.presenceLevel)
      setMood(todayEntry.mood)
      setInsight(todayEntry.insight)
      setSaved(true)
    }
  }, [])

  const handleSave = () => {
    const today = getToday()
    const entry: DiaryEntry = { date: today, presenceLevel, mood, insight }
    const filtered = entries.filter(e => e.date !== today)
    const updated = [...filtered, entry]
    setEntries(updated)
    saveEntries(updated)
    setSaved(true)
  }

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const entry = entries.find(e => e.date === dateStr)
    return {
      day: ['D', 'L', 'M', 'X', 'J', 'V', 'S'][d.getDay()],
      level: entry?.presenceLevel ?? null,
      mood: entry?.mood ?? null,
      isToday: dateStr === getToday(),
    }
  })

  const avgPresence = entries.length > 0
    ? Math.round(entries.reduce((sum, e) => sum + e.presenceLevel, 0) / entries.length)
    : 0

  const bestDay = (() => {
    if (entries.length < 7) return null
    const dayTotals: Record<number, { sum: number; count: number }> = {}
    entries.forEach(e => {
      const day = new Date(e.date).getDay()
      if (!dayTotals[day]) dayTotals[day] = { sum: 0, count: 0 }
      dayTotals[day].sum += e.presenceLevel
      dayTotals[day].count++
    })
    let best = 0, bestAvg = 0
    Object.entries(dayTotals).forEach(([day, data]) => {
      const avg = data.sum / data.count
      if (avg > bestAvg) { bestAvg = avg; best = parseInt(day) }
    })
    return ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][best]
  })()

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <div className="orb w-64 h-64 bg-cyan-600 top-10 -left-20" />

      <section className="pt-8 md:pt-16 pb-4">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-white mb-1 animate-fade-in">Diario de presencia</h1>
          <p className="text-text-secondary text-sm animate-fade-in-up">Registra tu estado. Descubre tus patrones.</p>
        </Container>
      </section>

      {/* Today's entry */}
      <section className="pb-6">
        <Container>
          <FadeInSection>
            <div className="glass rounded-3xl p-6">
              <h2 className="font-heading font-semibold text-white text-lg mb-4">
                {saved ? 'Registro de hoy' : 'Hoy'}
              </h2>

              {/* Presence slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary text-sm">¿Cuánto tiempo estuviste presente hoy?</span>
                  <span className="text-white font-bold text-lg">{presenceLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={presenceLevel}
                  onChange={(e) => { setPresenceLevel(parseInt(e.target.value)); setSaved(false) }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 ${presenceLevel}%, rgba(255,255,255,0.06) ${presenceLevel}%)`,
                  }}
                />
                <div className="flex justify-between text-text-muted text-[10px] mt-1">
                  <span>Distraído</span>
                  <span>Totalmente presente</span>
                </div>
              </div>

              {/* Mood */}
              <div className="mb-6">
                <p className="text-text-secondary text-sm mb-3">Estado emocional</p>
                <div className="flex justify-between gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => { setMood(m.label); setSaved(false) }}
                      className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all active:scale-90 flex-1 ${
                        mood === m.label ? 'bg-accent-blue/15 border border-accent-blue/30' : 'bg-white/5'
                      }`}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      <span className={`text-[10px] ${mood === m.label ? 'text-accent-blue font-medium' : 'text-text-muted'}`}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insight */}
              <div className="mb-6">
                <p className="text-text-secondary text-sm mb-2">Insight del día</p>
                <textarea
                  value={insight}
                  onChange={(e) => { setInsight(e.target.value); setSaved(false) }}
                  placeholder="¿Qué has observado hoy sobre tu mente?"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-accent-blue/50 transition-colors"
                />
              </div>

              <button
                onClick={handleSave}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                  saved ? 'bg-green-500/15 text-green-400' : 'bg-accent-blue text-white'
                }`}
              >
                {saved ? 'Guardado' : 'Guardar'}
              </button>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Weekly chart */}
      <section className="pb-6">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-3">Esta semana</h2>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-end justify-between gap-2 h-28">
                {last7.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    {day.mood && <span className="text-sm mb-1">{moods.find(m => m.label === day.mood)?.emoji}</span>}
                    <div className="w-full flex items-end justify-center h-16">
                      <div
                        className={`w-6 rounded-t-lg transition-all ${
                          day.level !== null ? 'bg-accent-blue/60' : 'bg-white/5'
                        }`}
                        style={{ height: day.level !== null ? `${Math.max(day.level * 0.64, 4)}px` : '4px' }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${day.isToday ? 'text-accent-blue' : 'text-text-muted'}`}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Stats */}
      <section className="pb-12">
        <Container>
          <FadeInSection>
            <h2 className="font-heading font-semibold text-white text-lg mb-3">Patrones</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4 text-center">
                <span className="text-2xl font-bold text-accent-blue">{avgPresence}%</span>
                <p className="text-text-muted text-xs mt-1">Presencia media</p>
              </div>
              <div className="glass rounded-2xl p-4 text-center">
                <span className="text-2xl font-bold text-accent-blue">{entries.length}</span>
                <p className="text-text-muted text-xs mt-1">Días registrados</p>
              </div>
              {bestDay && (
                <div className="glass rounded-2xl p-4 text-center col-span-2">
                  <span className="text-lg font-bold text-green-400">{bestDay}</span>
                  <p className="text-text-muted text-xs mt-1">Tu mejor día de la semana</p>
                </div>
              )}
            </div>
          </FadeInSection>
        </Container>
      </section>
    </div>
  )
}
