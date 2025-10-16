'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MessageSquareCode, X } from 'lucide-react'

interface SlideMenuProps {
  isOpen: boolean
  onClose: () => void
}

type MenuItem = 'dashboard' | 'cs' | 'mypage'

const menuItems = [
  { id: 'dashboard', label: '대시보드', href: '/dashboard' },
  { id: 'cs', label: 'CS', href: '/cs' },
  { id: 'mypage', label: '마이페이지', href: '/user' },
]

const menuContents = {
  dashboard: [
    {
      label: '→ 메인 기능 바로가기',
      color: 'text-[#007fff]',
      isTitle: true,
      href: '/dashboard',
    },
    // {
    //   label: '진행중인 프로젝트',
    //   color: 'text-[#0f1317]',
    //   href: '/dashboard/progress',
    // },
    // {
    //   label: '완료한 프로젝트',
    //   color: 'text-[#0f1317]',
    //   href: '/dashboard/completed',
    // },
    // {
    //   label: '알림',
    //   color: 'text-[#0f1317]',
    //   href: '/dashboard/notifications',
    // },
    // {
    //   label: '프로젝트 생성',
    //   color: 'text-[#0f1317]',
    //   href: '/dashboard/create',
    // },
  ],
  cs: [
    {
      label: '→ CS 학습하기',
      color: 'text-[#007fff]',
      isTitle: true,
      href: '/cs',
    },
    // { label: 'CS 개념 학습', color: 'text-[#0f1317]', href: '/cs/concepts' },
    // { label: 'CS 문제 풀기', color: 'text-[#0f1317]', href: '/cs/problems' },
    // { label: '학습 기록', color: 'text-[#0f1317]', href: '/cs/history' },
  ],

  mypage: [
    {
      label: '→ 마이페이지',
      color: 'text-[#007fff]',
      isTitle: true,
      href: '/user',
    },
    // { label: '프로필 설정', color: 'text-[#0f1317]', href: '/mypage/profile' },
    // {
    //   label: '알림 설정',
    //   color: 'text-[#0f1317]',
    //   href: '/mypage/notifications',
    // },
    // { label: '학습 기록', color: 'text-[#0f1317]', href: '/mypage/history' },
  ],
}

const SlideMenu = ({ isOpen, onClose }: SlideMenuProps) => {
  const pathname = usePathname()
  const [selectedMenu, setSelectedMenu] = useState<MenuItem>(() => {
    const path = pathname.split('/')[1]
    return (path as MenuItem) || 'dashboard'
  })

  // 메뉴가 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // selectedMenu가 유효하지 않은 경우 기본값 설정 undefined.map()방지
  const currentMenu = menuContents[selectedMenu] ? selectedMenu : 'dashboard'

  return (
    <div className="md:hidden">
      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-20 bg-black transition-opacity duration-300 ${
          isOpen ? 'visible opacity-50' : 'invisible opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 슬라이드 메뉴 */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-30 w-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 헤더 */}
        <header className="flex w-full items-center justify-between border-b border-[#D9D9D9] bg-white px-4">
          <Link href="/" className="flex items-center gap-2.5 py-5">
            <span className="text-[32px] leading-[38.19px] font-semibold text-slate-800">
              CoMentor
            </span>
            <MessageSquareCode className="h-[29px] w-[28px] text-slate-800 outline-slate-600" />
          </Link>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center"
          >
            <X className="h-5 w-5 cursor-pointer text-slate-800" />
          </button>
        </header>

        {/* 메뉴 컨텐츠 */}
        <div className="flex h-[calc(100%-80px)] w-full">
          {/* 왼쪽 메뉴 */}
          <div className="flex h-full w-1/3 flex-col overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`flex h-14 cursor-pointer items-center px-6 py-4 ${
                  currentMenu === item.id ? 'bg-white' : 'bg-[#f5f6f7]'
                }`}
                onClick={() => setSelectedMenu(item.id as MenuItem)}
              >
                <span
                  className={`text-base leading-tight font-bold tracking-wide ${
                    currentMenu === item.id
                      ? 'text-[#0f1317]'
                      : 'text-[#667380]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
            <div className="flex-1 bg-[#edeff2]"></div>
          </div>

          {/* 오른쪽 컨텐츠 */}
          <div className="flex h-full w-2/3 flex-col overflow-y-auto">
            {menuContents[currentMenu].map((content, index) => (
              <Link
                key={index}
                href={content.href || '#'}
                className={`flex ${
                  content.isTitle ? 'h-14' : 'h-[45px]'
                } items-center px-5`}
                onClick={() => content.href && onClose()}
              >
                <span
                  className={`text-base ${
                    content.isTitle ? 'font-semibold' : 'font-medium'
                  } leading-tight tracking-wide ${content.color}`}
                >
                  {content.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideMenu
