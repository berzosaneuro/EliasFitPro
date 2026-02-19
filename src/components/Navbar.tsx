'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Brain } from 'lucide-react'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/metodo', label: 'Método' },
  { href: '/meditacion', label: 'Meditación' },
  { href: '/biblioteca', label: 'Biblioteca' },
  { href: '/test', label: 'Test' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-dark-primary/80 backdrop-blur-xl border-b border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Brain className="w-6 h-6 text-accent-blue group-hover:text-accent-blue-hover transition-colors" />
            <span className="font-heading font-bold text-lg text-white">Neuropresencia</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/metodo"
              className="ml-2 px-5 py-2 bg-accent-blue text-white text-sm font-medium rounded-lg hover:bg-accent-blue-hover transition-all glow-blue glow-blue-hover"
            >
              Empezar
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-text-secondary hover:text-white transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-dark-surface border-b border-dark-border">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm text-text-secondary hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/metodo"
              onClick={() => setOpen(false)}
              className="block text-center mt-4 px-5 py-2 bg-accent-blue text-white text-sm font-medium rounded-lg hover:bg-accent-blue-hover transition-all"
            >
              Empezar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
