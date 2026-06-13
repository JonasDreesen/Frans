import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: string
    level: string
    focus: string[]
    onboarded: boolean
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      level: string
      focus: string[]
      onboarded: boolean
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    level: string
    focus: string[]
    onboarded: boolean
  }
}
