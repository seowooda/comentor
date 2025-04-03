'use client'

import {
  Bell,
  Bookmark,
  Menu,
  MessageSquareCode,
  UserCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import SlideMenu from './SlideMenu'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <header className="flex w-full items-center justify-between border-b border-[#D9D9D9] bg-white">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 px-2.5 py-5">
            <span className="text-[32px] leading-[38.19px] font-semibold text-slate-800">
              CoMentor
            </span>
            <MessageSquareCode className="h-[29px] w-[28px] text-slate-800 outline-slate-600" />
          </Link>

          <nav className="hidden h-[66px] items-center justify-between md:flex lg:w-[395px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center gap-2.5 px-2.5"
            >
              <span className="text-base leading-[19.09px] font-medium text-black">
                대시보드
              </span>
            </Link>
            <Link
              href="/cs"
              className="flex flex-col items-center justify-center gap-2.5 px-2.5"
            >
              <span className="text-base leading-[19.09px] font-medium text-black">
                CS
              </span>
            </Link>
            <Link
              href="/community"
              className="flex items-center justify-center gap-2.5 px-2.5"
            >
              <span className="text-base leading-[19.09px] font-medium text-black">
                커뮤니티
              </span>
            </Link>
            <Link
              href="/user"
              className="flex flex-col items-center justify-center gap-2.5 px-2.5"
            >
              <span className="text-base leading-[19.09px] font-medium text-black">
                마이페이지
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex h-[33px] items-center justify-between">
          <button className="hidden h-8 w-8 items-center justify-center gap-2.5 px-1 md:flex">
            <Bookmark
              className="h-5 w-5 cursor-pointer text-slate-800"
              onClick={() => router.push('/bookmark')}
            />
          </button>
          <button className="flex h-8 w-8 items-center justify-center gap-2.5">
            <Bell className="h-5 w-5 cursor-pointer text-slate-800" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center gap-2.5">
            <UserCircle className="h-5 w-5 cursor-pointer text-slate-800" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center gap-2.5 md:hidden"
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
