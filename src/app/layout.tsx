import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/header'
import { MSWComponent } from '@/api/MSWComponent'
import ReactQueryProvider from '@/providers/ReactQueryClient'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        {process.env.NEXT_PUBLIC_MSW === 'enable' ? (
          <MSWComponent>
            <ReactQueryProvider>
              <header className="mx-[60px]">
                <Header />
              </header>

              {children}
            </ReactQueryProvider>
          </MSWComponent>
        ) : (
          <ReactQueryProvider>
            <header className="mx-[60px]">
              <Header />
            </header>

            {children}
          </ReactQueryProvider>
        )}
      </body>
    </html>
  )
}

export default RootLayout
