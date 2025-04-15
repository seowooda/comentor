// src/hooks/useDelayedLoading.ts

import { useEffect, useState } from 'react'

/**
 * 외부의 isLoading 값이 false여도 최소 delay(ms) 동안은 true를 유지합니다.
 * @param isLoading 외부에서 들어오는 로딩 상태
 * @param delay 최소 로딩 유지 시간 (기본값: 1000ms)
 */
export const useDelayedLoading = (isLoading: boolean, delay = 1000) => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setShowLoading(true)
    }
  }, [isLoading, delay])

  return showLoading
}
