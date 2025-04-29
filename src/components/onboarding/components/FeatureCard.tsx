import { motion } from 'framer-motion'
import { ModernIcon } from '@/components/onboarding/components/ModernIcon'
import type { IconType } from '@/components/onboarding/components/ModernIcon'

interface FeatureCardProps {
  feature: {
    title: string
    description: string
    icon: IconType
    color: string
  }
  index: number
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -8,
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.08)',
      }}
      transition={{
        y: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      className="flex flex-col items-center rounded-xl bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        viewport={{ once: true }}
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-${feature.color}-50 shadow-sm`}
      >
        <ModernIcon type={feature.icon} color={feature.color} />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        viewport={{ once: true }}
        className="mb-2 text-lg font-semibold text-slate-800"
      >
        {feature.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        viewport={{ once: true }}
        className="text-sm text-slate-600"
      >
        {feature.description}
      </motion.p>
    </motion.div>
  )
}
