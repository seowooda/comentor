import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/header'
import { MSWComponent } from '@/api/MSWComponent'
import ReactQueryProvider from '@/providers/ReactQueryClient'
import AutoRefreshToken from '@/components/Auth/token'

export const metadata: Metadata = {
  title: 'CommitMentor',
  description: 'GitHub 커밋 기반 CS 질문 생성 서비스',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <AutoRefreshToken />

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
