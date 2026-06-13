import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user) return null

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          level: user.level,
          focus: user.focus,
          onboarded: user.onboarded,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.level = user.level
        token.focus = user.focus
        token.onboarded = user.onboarded
      }
      if (trigger === 'update' && session) {
        token.level = session.level ?? token.level
        token.focus = session.focus ?? token.focus
        token.onboarded = session.onboarded ?? token.onboarded
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.level = token.level as string
      session.user.focus = token.focus as string[]
      session.user.onboarded = token.onboarded as boolean
      return session
    },
  },
}
