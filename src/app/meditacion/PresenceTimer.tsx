'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const presets = [3, 5, 10, 20]

export default function PresenceTimer() {
  const [duration, setDuration] = useState(5)
  const [remaining, setRemaining] = useState(5 * 60)
  const [running, setRunning] = useState(false)
  const [custom, setCustom] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => r - 1)
      }, 1000)
    } else if (remaining === 0) {
      setRunning(false)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, remaining])

  const selectDuration = (mins: number) => {
    setDuration(mins)
    setRemaining(mins * 60)
    setRunning(false)
  }

  const handleCustom = () => {
    const mins = parseInt(custom)
    if (mins > 0 && mins <= 120) {
      selectDuration(mins)
      setCustom('')
    }
  }

  const reset = () => {
    setRunning(false)
    setRemaining(duration * 60)
  }

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => selectDuration(p)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              duration === p && !running
                ? 'bg-accent-blue text-white glow-blue'
                : 'bg-dark-surface border border-dark-border text-text-secondary hover:border-accent-blue/50'
            }`}
          >
            {p} min
          </button>
        ))}
        <div className="flex gap-2">
          <input
            type="number"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Min"
            min="1"
            max="120"
            className="w-20 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-white text-sm text-center placeholder:text-text-secondary focus:outline-none focus:border-accent-blue"
          />
          <button
            onClick={handleCustom}
            className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-text-secondary text-sm hover:border-accent-blue/50 transition-all cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>

      <div className="mb-8">
        <span className="font-mono text-6xl md:text-7xl font-light text-white tracking-wider">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setRunning(!running)}
          className="flex items-center gap-2 px-8 py-3 bg-accent-blue text-white rounded-lg font-medium hover:bg-accent-blue-hover transition-all glow-blue glow-blue-hover cursor-pointer"
        >
          {running ? (
            <>
              <Pause className="w-5 h-5" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5" /> {remaining === duration * 60 ? 'Iniciar' : 'Continuar'}
            </>
          )}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-dark-surface border border-dark-border rounded-lg text-text-secondary hover:border-accent-blue/50 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>

      {remaining === 0 && (
        <div className="mt-8 p-4 bg-dark-surface border border-accent-blue/30 rounded-xl">
          <p className="text-accent-blue font-semibold">Sesión completada</p>
          <p className="text-text-secondary text-sm mt-1">Has estado presente. Eso es todo lo que necesitas.</p>
        </div>
      )}
    </div>
  )
}
