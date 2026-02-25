import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await getSupabase()
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Error al cargar leads' }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, source } = body

  if (!email) {
    return NextResponse.json({ error: 'Email es obligatorio' }, { status: 400 })
  }

  const { error } = await getSupabase().from('leads').insert({
    email,
    name: name || '',
    source: source || 'web',
  })

  if (error) {
    return NextResponse.json({ error: 'Error al guardar el lead' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
