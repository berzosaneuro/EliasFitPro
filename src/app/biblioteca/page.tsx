import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/Container'
import Card from '@/components/Card'
import FadeInSection from '@/components/FadeInSection'
import { posts } from '@/data/posts'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biblioteca — Neuropresencia',
  description: 'Artículos sobre metacognición, neuroplasticidad, atención y presencia. Conocimiento para entrenar tu mente.',
}

export default function BibliotecaPage() {
  return (
    <>
      <section className="pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fade-in">
              BIBLIOTECA
            </h1>
            <p className="text-text-secondary text-lg md:text-xl animate-fade-in-up">
              Conocimiento para entrenar tu mente. Sin misticismo, sin humo.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {posts.map((post, i) => (
              <FadeInSection key={post.slug}>
                <Link href={`/biblioteca/${post.slug}`}>
                  <Card className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <BookOpen className="w-5 h-5 text-accent-blue mt-1 shrink-0" />
                      <div>
                        <p className="text-text-secondary text-xs font-mono mb-2">{post.date}</p>
                        <h2 className="font-heading text-lg font-semibold text-white group-hover:text-accent-blue transition-colors mb-2">
                          {post.title}
                        </h2>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
