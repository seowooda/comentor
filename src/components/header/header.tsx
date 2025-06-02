'use client'

import { Bookmark, Menu, MessageSquareCode, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SlideMenu from './SlideMenu'
import DayStreak from './DayStreak'
import { useRouter } from 'next/navigation'
import { NotificationDropdown } from './Notification/NotificationDropdown'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-[#D9D9D9] bg-white px-2 sm:px-4 lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-1.5 py-3 sm:gap-2.5 sm:py-5"
          >
            <span className="text-[18px] leading-tight font-semibold whitespace-nowrap text-slate-800 sm:text-[24px] lg:text-[32px]">
              CoMentor
            </span>
            <MessageSquareCode className="h-[18px] w-[18px] flex-shrink-0 text-slate-800 outline-slate-600 sm:h-[24px] sm:w-[24px] lg:h-[29px] lg:w-[28px]" />
          </Link>

          <nav className="hidden h-[66px] items-center gap-2 md:flex lg:w-[395px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex flex-shrink-0 flex-col items-center justify-center gap-2.5 px-1 sm:px-2.5"
            >
              <span className="text-sm leading-[19.09px] font-medium whitespace-nowrap text-black lg:text-base">
                대시보드
              </span>
            </Link>
            <Link
              href="/cs"
              className="flex flex-shrink-0 flex-col items-center justify-center gap-2.5 px-1 sm:px-2.5"
            >
              <span className="text-sm leading-[19.09px] font-medium whitespace-nowrap text-black lg:text-base">
                CS
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex h-[33px] flex-shrink-0 items-center gap-1 sm:gap-2">
          <div className="hidden [@media(min-width:420px)]:block">
            <DayStreak />
          </div>
          <button
            aria-label="북마크"
            className="hidden h-8 w-8 flex-shrink-0 items-center justify-center [@media(min-width:800px)]:flex"
          >
            <Bookmark
              className="h-5 w-5 cursor-pointer text-slate-800"
              onClick={() => router.push('/bookmark')}
            />
          </button>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
            <NotificationDropdown />
          </div>
          <button
            aria-label="마이페이지"
            onClick={() => router.push('/user')}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
          >
            <UserCircle className="h-5 w-5 cursor-pointer text-slate-800" />
          </button>
          <button
            aria-label="메뉴 열기"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center [@media(min-width:800px)]:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-5 w-5 cursor-pointer text-slate-800" />
          </button>
        </div>
      </header>

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

export default Header
