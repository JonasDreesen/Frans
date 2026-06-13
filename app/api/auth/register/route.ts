import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = schema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'Dit e-mailadres is al in gebruik.' }, { status: 400 })
    }

    const hash = await bcrypt.hash(password, 12)
    await prisma.user.create({ data: { name, email: email.toLowerCase(), password: hash } })

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ongeldige invoer.' }, { status: 400 })
    }
    console.error(e)
    return NextResponse.json({ error: 'Serverfout. Probeer later opnieuw.' }, { status: 500 })
  }
}
