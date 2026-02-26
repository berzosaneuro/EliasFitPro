'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Brain, Crown, Shield } from 'lucide-react'
import { usePremium } from '@/context/PremiumContext'
import { useAdmin } from '@/context/AdminContext'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/meditacion', label: 'Meditar' },
  { href: '/programa', label: '21 Días' },
  { href: '/retos', label: 'Retos' },
  { href: '/masterclass', label: 'Masterclass' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/ia-coach', label: 'IA Coach' },
  { href: '/comunidad', label: 'Comunidad' },
  { href: '/circulos', label: 'Círculos' },
  { href: '/leaderboard', label: 'Ranking' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/llamadas', label: 'Llamadas' },
]

const mobileLinks = [
  { category: 'Practicar', items: [
    { href: '/', label: 'Inicio' },
    { href: '/meditacion', label: 'Meditar' },
    { href: '/sonidos', label: 'Sonidos' },
    { href: '/ejercicios', label: 'Ejercicios' },
    { href: '/sos', label: 'SOS' },
    { href: '/programa', label: '21 Días' },
    { href: '/retos', label: 'Retos' },
  ]},
  { category: 'Aprender', items: [
    { href: '/masterclass', label: 'Masterclass' },
    { href: '/podcast', label: 'NeuroPodcast' },
    { href: '/biblioteca', label: 'Biblioteca' },
    { href: '/despertar', label: 'Despertar' },
    { href: '/ia-coach', label: 'IA Coach' },
  ]},
  { category: 'Comunidad', items: [
    { href: '/comunidad', label: 'Foro' },
    { href: '/circulos', label: 'Círculos' },
    { href: '/leaderboard', label: 'Ranking' },
    { href: '/historias', label: 'Historias' },
    { href: '/referidos', label: 'Referidos' },
  ]},
  { category: 'Herramientas', items: [
    { href: '/diario', label: 'Diario' },
    { href: '/neuroscore', label: 'NeuroScore' },
    { href: '/mapa', label: 'Mapa' },
    { href: '/notificaciones', label: 'Notificaciones' },
  ]},
  { category: 'Pro', items: [
    { href: '/clientes', label: 'Clientes' },
    { href: '/llamadas', label: 'Llamadas' },
    { href: '/captacion', label: 'Captación' },
    { href: '/corporativo', label: 'Empresas' },
    { href: '/certificacion', label: 'Certificación' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/kids', label: 'Kids' },
    { href: '/retiro', label: 'Retiro' },
  ]},
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isPremium } = usePremium()
  const { isAdmin } = useAdmin()
  const pathname = usePathname()

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:block sticky top-0 z-50 ios-header">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                <Brain className="w-4.5 h-4.5 text-accent-blue" />
              </div>
              <span className="font-heading font-bold text-lg text-white">NeuroConciencia</span>
            </Link>

            <div className="flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'text-white bg-white/10 font-medium'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {isPremium ? (
                <span className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-yellow-500/15 text-yellow-400 text-sm font-semibold rounded-full border border-yellow-500/20">
                  <Crown className="w-3.5 h-3.5" />
                  PRO
                </span>
              ) : (
                <Link
                  href="/planes"
                  className="ml-3 px-5 py-2 bg-accent-blue text-white text-sm font-semibold rounded-full hover:bg-accent-blue-hover transition-all active:scale-95"
                >
                  Empezar
                </Link>
              )}
              <Link
                href={isAdmin ? '/admin' : '/admin/login'}
                className={`ml-1 p-2 rounded-lg transition-all ${
                  pathname.startsWith('/admin')
                    ? 'text-accent-blue bg-accent-blue/10'
                    : 'text-text-muted hover:text-white hover:bg-white/5'
                }`}
                title="Panel Admin"
              >
                <Shield className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile top bar - minimal */}
      <div className="md:hidden sticky top-0 z-50 ios-header">
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-accent-blue" />
            </div>
            <span className="font-heading font-semibold text-white">NeuroConciencia</span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-text-secondary active:scale-90 transition-transform"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute top-full left-0 right-0 glass p-4 animate-slide-up max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            <div className="space-y-4">
              {mobileLinks.map((group) => (
                <div key={group.category}>
                  <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold px-4 mb-1">{group.category}</p>
                  <div className="space-y-0.5">
                    {group.items.map((link) => {
                      const isActive = pathname === link.href
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block px-4 py-2 rounded-xl text-sm transition-all ${
                            isActive
                              ? 'text-white bg-accent-blue/10 font-medium'
                              : 'text-text-secondary hover:text-white'
                          }`}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
              <div className="border-t border-white/5 pt-2">
                <Link
                  href={isAdmin ? '/admin' : '/admin/login'}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                    pathname.startsWith('/admin')
                      ? 'text-accent-blue bg-accent-blue/10 font-medium'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Panel Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
