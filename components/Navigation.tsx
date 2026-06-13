'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Overzicht' },
  { href: '/woordenschat', icon: '📚', label: 'Woordenschat' },
  { href: '/grammatica', icon: '✏️', label: 'Grammatica' },
  { href: '/oefenen', icon: '🎯', label: 'Oefenen' },
]

const levelColors: Record<string, string> = {
  A1: 'badge-green', A2: 'badge-amber', B1: 'badge-blue', B2: 'badge-purple',
}

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen w-56 flex-col border-r border-slate-200 bg-white fixed left-0 top-0">
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-4">
          <span className="text-2xl">🇫🇷</span>
          <span className="font-bold text-slate-900">Frans Leren</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-slate-100 px-3 py-4">
          <Link
            href="/profiel"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all mb-1 ${
              pathname === '/profiel' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {session?.user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{session?.user?.name}</p>
              <span className={`badge text-xs ${levelColors[session?.user?.level ?? 'A1'] ?? 'badge-green'}`}>
                {session?.user?.level ?? 'A1'}
              </span>
            </div>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
          >
            <span>🚪</span> Uitloggen
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-200 bg-white md:hidden">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center py-3 text-xs transition-all ${
                active ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
        <Link
          href="/profiel"
          className={`flex flex-1 flex-col items-center py-3 text-xs transition-all ${
            pathname === '/profiel' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <span className="text-xl mb-0.5">👤</span>
          Profiel
        </Link>
      </nav>
    </>
  )
}
