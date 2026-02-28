import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

const ALLOWED_TABLES = ['clients', 'leads', 'contacts', 'calls', 'community_posts', 'subscribers']

export async function DELETE(request: Request) {
  const body = await request.json()
  const { table, id } = body

  if (!table || !id) {
    return NextResponse.json({ error: 'table e id son obligatorios' }, { status: 400 })
  }

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 })
  }

  const { error } = await getSupabase().from(table).delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
