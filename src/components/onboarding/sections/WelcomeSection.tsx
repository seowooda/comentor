'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  ONBOARDING_ANIMATIONS,
  ONBOARDING_TEXTS,
  ANIMATION_ERROR_MESSAGES,
} from '../constants'

// Lottie 컴포넌트를 클라이언트 사이드에서만 로드
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export function WelcomeSection() {
  const [animationData, setAnimationData] = useState<any>(null)
  const [animationError, setAnimationError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true)
        // public/animations 폴더에서 애니메이션 로드
        const animData = await import(
          '../../../../public/animations/coding-animation.json'
        )
        setAnimationData(animData.default || animData)
      } catch (error) {
        console.error('애니메이션 로드 중 오류 발생:', error)
        setAnimationError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnimation()
  }, [])

  const handleGithubLogin = async () => {
    const env = process.env.VERCEL ? 'prod' : 'dev'

    const url = `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_GITHUB}?env=${env}`
    window.location.href = url
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section className="relative flex flex-col-reverse items-center justify-between gap-8 py-6 md:flex-row md:py-12">
        {/* 텍스트 섹션 */}
        <motion.div
          className="z-10 w-full text-center md:w-1/2 md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: 'easeOut',
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold tracking-tight break-keep text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: 'easeOut',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ONBOARDING_TEXTS.PRIMARY_HEADING}
          </motion.h1>

          <motion.h2
            className="mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:mt-3 lg:text-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: 'easeOut',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ONBOARDING_TEXTS.SECONDARY_HEADING}
          </motion.h2>

          <motion.p
            className="mt-4 break-keep text-gray-500 md:mt-6 md:max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: 'easeOut',
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {ONBOARDING_TEXTS.DESCRIPTION}
          </motion.p>

          <div className="flex justify-center md:justify-start">
            <motion.button
              className="mt-6 flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white shadow-md md:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: 'easeOut',
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.08,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 10,
                  duration: 0.1,
                },
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              whileTap={{ scale: 0.97, transition: { duration: 0.05 } }}
              onClick={handleGithubLogin}
              type="button"
              style={{ willChange: 'transform' }}
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/images/Github.svg"
                  alt="GitHub"
                  fill
                  priority
                  className="invert"
                />
              </div>
              {ONBOARDING_TEXTS.BUTTON_TEXT}
            </motion.button>
          </div>
        </motion.div>

        {/* 애니메이션 섹션 */}
        <motion.div
          className="relative z-10 aspect-square w-[80%] max-w-[320px] overflow-hidden sm:max-w-[360px] md:w-[45%] md:max-w-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: 'easeOut',
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="h-full w-full animate-pulse rounded-lg bg-slate-100" />
          ) : animationError ? (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-100 p-4 text-center text-gray-500">
              {ANIMATION_ERROR_MESSAGES.LOADING_ERROR}
            </div>
          ) : (
            animationData && (
              <Lottie
                animationData={animationData}
                loop={ONBOARDING_ANIMATIONS.SETTINGS.LOOP}
                autoplay={ONBOARDING_ANIMATIONS.SETTINGS.AUTOPLAY}
                style={{ width: '100%', height: '100%' }}
                rendererSettings={{
                  preserveAspectRatio: 'xMidYMid slice',
                }}
              />
            )
          )}
        </motion.div>
      </section>
    </div>
  )
}
