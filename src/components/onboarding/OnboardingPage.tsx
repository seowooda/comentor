'use client'

import { GithubIcon } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white px-[60px] pb-[55px]">
      {/* 그라데이션 배경 */}
      <div className="absolute bottom-0 left-0 h-[226px] w-full bg-gradient-to-b from-transparent to-slate-100" />

      {/* 메인 컨텐츠 */}
      <div className="flex h-[689px] w-full flex-col items-center justify-center gap-[35px]">
        <div className="flex flex-col items-center justify-center gap-[17px] py-20">
          <h1 className="w-[928px] text-center text-[52px] leading-[62.05px] font-semibold tracking-widest text-slate-800">
            GitHub 커밋 기반 맞춤 CS 면접 준비,
          </h1>
          <h2 className="self-stretch text-center text-[52px] leading-[62.05px] font-semibold tracking-widest text-slate-800">
            CoMentor와 함께!
          </h2>
        </div>
        <button className="flex h-[73px] w-[420px] items-center justify-center gap-[15px] rounded-[33px] bg-slate-800 px-[31px] py-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <GithubIcon className="h-6 w-6 rounded-full bg-white fill-slate-100 text-slate-800" />
          <span className="font-pretendard text-center text-[24px] leading-[24px] font-medium text-slate-50">
            Github 연동하기
          </span>
        </button>
      </div>
    </div>
  )
}
