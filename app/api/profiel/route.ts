import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  focus: z.array(z.enum(['schrijven', 'luisteren', 'spreken'])).min(1),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const body = await req.json()
  const { focus } = schema.parse(body)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { focus },
  })

  return NextResponse.json({ ok: true })
}
