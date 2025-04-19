import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 여러 클래스 이름을 병합하는 유틸리티 함수
 * clsx로 클래스를 결합하고 tailwind-merge로 충돌을 해결합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ClassValue 타입 내보내기
export type { ClassValue }
