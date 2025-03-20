'use client'

import { Bell, Bookmark, MessageSquareCode, UserCircle } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between border-b border-[#D9D9D9]">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5 px-2.5 py-5">
          <span className="text-[32px] leading-[38.19px] font-semibold text-slate-800">
            CoMentor
          </span>
          <div className="flex h-7 w-7 items-center justify-center">
            <MessageSquareCode className="h-[29px] w-[28px] text-slate-800 outline-slate-600" />
          </div>
        </Link>

        <nav className="flex h-[66px] w-[395px] items-center justify-between px-6">
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
            href="/mypage"
            className="flex flex-col items-center justify-center gap-2.5 px-2.5"
          >
            <span className="text-base leading-[19.09px] font-medium text-black">
              마이페이지
            </span>
          </Link>
        </nav>
      </div>

      <div className="flex h-[33px] w-[110px] items-center justify-between">
        <button className="flex h-8 w-8 items-center justify-center gap-2.5 px-1">
          <Bookmark className="h-5 w-5 text-slate-800" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center gap-2.5">
          <Bell className="h-5 w-5 text-slate-800" />
        </button>
        <button className="flex h-8 w-8 items-center justify-center gap-2.5">
          <UserCircle className="h-5 w-5 text-slate-800" />
        </button>
      </div>
    </header>
  )
}

export default Header
