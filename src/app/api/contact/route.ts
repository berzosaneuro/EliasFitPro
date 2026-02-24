import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 })
  }

  const { error } = await getSupabase().from('contacts').insert({ name, email, message })

  if (error) {
    return NextResponse.json({ error: 'Error al guardar el mensaje' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
