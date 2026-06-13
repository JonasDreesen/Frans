export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/woordenschat/:path*', '/grammatica/:path*', '/oefenen/:path*', '/profiel/:path*', '/onboarding/:path*'],
}
