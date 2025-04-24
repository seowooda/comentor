'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ONBOARDING_TEXTS, EFeatureCategory } from '../constants'
import { ModernIcon } from '../components/ModernIcon'

export function FeatureSection() {
  const featuresRef = useRef<HTMLDivElement>(null)

  const getIconTypeByCategory = (category: EFeatureCategory) => {
    switch (category) {
      case EFeatureCategory.PROJECT:
        return 'check-circle'
      case EFeatureCategory.CODE:
        return 'clipboard'
      case EFeatureCategory.FEEDBACK:
        return 'feedback'
      case EFeatureCategory.RECORD:
        return 'record'
      case EFeatureCategory.LEARNING:
        return 'question-circle'
      case EFeatureCategory.ALERT:
        return 'bell'
      default:
        return 'check-circle'
    }
  }

  const getIconColorByCategory = (category: EFeatureCategory) => {
    switch (category) {
      case EFeatureCategory.PROJECT:
      case EFeatureCategory.FEEDBACK:
        return 'blue'
      case EFeatureCategory.CODE:
      case EFeatureCategory.RECORD:
        return 'indigo'
      case EFeatureCategory.LEARNING:
      case EFeatureCategory.ALERT:
        return 'blue'
      default:
        return 'blue'
    }
  }

  return (
    <div className="w-full" id="features">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <section className="py-12 md:py-16">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{
              ease: 'easeOut',
              duration: 0.8,
            }}
          >
            <motion.h2
              className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{
                ease: 'easeOut',
                duration: 0.8,
                delay: 0.2,
              }}
            >
              {ONBOARDING_TEXTS.FEATURES_HEADING}
            </motion.h2>

            <div
              ref={featuresRef}
              className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {ONBOARDING_TEXTS.FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative flex h-full flex-col rounded-xl bg-white p-6 break-keep shadow-md transition-shadow duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 17,
                      duration: 0.1,
                    },
                  }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.05 } }}
                  style={{ willChange: 'transform', cursor: 'pointer' }}
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 p-3 transition-transform duration-300 group-hover:scale-110">
                    <ModernIcon
                      type={getIconTypeByCategory(feature.category)}
                      color={getIconColorByCategory(feature.category)}
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>

                  {/* 카드 호버 시 나타나는 그라데이션 효과 */}
                  <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
