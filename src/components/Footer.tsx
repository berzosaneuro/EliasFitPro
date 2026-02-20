import { Brain } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="hidden md:block border-t border-dark-border/50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent-blue" />
            <span className="text-text-muted text-sm">
              Neuropresencia · Berzosa Neuro
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:contacto@neuropresencia.com"
              className="text-sm text-text-muted hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
