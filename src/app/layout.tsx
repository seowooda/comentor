import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/header'
import { MSWComponent } from '@/api/MSWComponent'
import ReactQueryProvider from '@/providers/ReactQueryClient'
import AutoRefreshToken from '@/components/AuthSetting/token'
import GlobalModal from '@/components/Modal/GlobalModal'

export const metadata: Metadata = {
  title: 'CoMentor',
  description: 'Github 커밋 기반 맞춤 CS 질문 추천 서비스',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className="flex h-dvh flex-col antialiased">
        <AutoRefreshToken />
        <GlobalModal />

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
