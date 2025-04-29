import React, {
  ElementType,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react'
import { type ClassValue, cn } from '@/lib/utils'

type SkeletonOptions = {
  /**
   * 스켈레톤에서 제외할 클래스 패턴 목록
   */
  excludeClasses?: string[]
  /**
   * 루트 요소에서 제외할 클래스 패턴 목록
   */
  rootExcludeClasses?: string[]
  /**
   * 스켈레톤 효과를 적용할 클래스 목록
   */
  skeletonClasses?: ClassValue[]
  /**
   * 스켈레톤으로 변환할 태그 목록
   */
  skeletonizeTags?: string[]
  /**
   * 스켈레톤에서 텍스트를 유지할지 여부
   */
  preserveText?: boolean
  /**
   * 스켈레톤 높이 (픽셀)
   */
  skeletonHeight?: number
}

/**
 * 기본 스켈레톤 설정
 */
const DEFAULT_OPTIONS: SkeletonOptions = {
  excludeClasses: [
    'hover',
    'focus',
    'active',
    'transition',
    'transform',
    'animate',
    'cursor',
  ],
  rootExcludeClasses: [],
  skeletonClasses: ['animate-pulse', 'bg-slate-200', 'rounded'],
  skeletonizeTags: [
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'button',
    'img',
  ],
  preserveText: false,
  skeletonHeight: 16,
}

/**
 * 클래스명 필터링 함수
 */
const filterClassNames = (
  classNames: string,
  excludePatterns: string[] = [],
  isRoot = false,
  rootExcludePatterns: string[] = [],
): string => {
  if (!classNames) return ''

  const classes = classNames.split(' ')
  const filteredClasses = classes.filter((cls) => {
    // 루트 요소인 경우 루트 제외 패턴도 확인
    if (isRoot) {
      if (rootExcludePatterns.some((pattern) => cls.includes(pattern))) {
        return false
      }
    }

    // 공통 제외 패턴 확인
    return !excludePatterns.some((pattern) => cls.includes(pattern))
  })

  return filteredClasses.join(' ')
}

/**
 * 요소를 스켈레톤으로 변환하는 함수
 */
const transformToSkeleton = (
  element: ReactNode,
  options: SkeletonOptions = DEFAULT_OPTIONS,
  isRoot = false,
): ReactNode => {
  if (!isValidElement(element)) {
    // 텍스트 노드인 경우 제거하거나 유지
    if (typeof element === 'string' || typeof element === 'number') {
      return options.preserveText ? element : null
    }
    return element
  }

  // 타입 단언으로 element의 props 접근 처리
  const props = element.props as Record<string, any>
  const { children, className, ...restProps } = props

  // 태그 이름 확인
  const type = element.type
  const tagName = typeof type === 'string' ? type : 'div'

  // 스켈레톤화할 태그인지 확인
  const shouldSkeletonize = options.skeletonizeTags?.includes(tagName)

  // 클래스명 필터링
  const filteredClassName = className
    ? filterClassNames(
        className,
        options.excludeClasses || [],
        isRoot,
        options.rootExcludeClasses || [],
      )
    : ''

  // 자식 요소 변환
  const transformedChildren = React.Children.map(children, (child) =>
    transformToSkeleton(child, options, false),
  )

  // 스켈레톤화해야 하는 태그이면 스켈레톤 클래스 적용
  if (shouldSkeletonize) {
    const skeletonClassName = cn(
      filteredClassName,
      options.skeletonClasses,
      'inline-block',
    )

    return React.createElement('div', {
      className: skeletonClassName,
      style: { height: `${options.skeletonHeight}px` },
      ...restProps,
    })
  }

  // 기존 요소 복제하되 필터링된 클래스와 변환된 자식 요소 적용
  return cloneElement(
    element,
    {
      ...restProps,
      className: filteredClassName ? filteredClassName : undefined,
    } as React.ClassAttributes<unknown> & Record<string, any>,
    transformedChildren,
  )
}

/**
 * 컴포넌트를 스켈레톤으로 변환하는 함수
 */
export function generateSkeleton<P extends object>(
  Component: ElementType<P>,
  options?: SkeletonOptions,
): React.FC<Partial<P>> {
  const SkeletonComponent: React.FC<Partial<P>> = (props) => {
    try {
      // 원본 컴포넌트 렌더링
      const renderedComponent = React.createElement(Component, props as P)

      // 스켈레톤으로 변환
      return transformToSkeleton(
        renderedComponent,
        { ...DEFAULT_OPTIONS, ...options },
        true,
      ) as ReactElement
    } catch (error) {
      console.error('Error generating skeleton:', error)
      // 오류 발생 시 fallback 스켈레톤 반환
      return React.createElement('div', {
        className: 'w-full h-32 animate-pulse bg-slate-200 rounded',
      })
    }
  }

  // 디버깅을 위한 displayName 설정
  const componentName =
    typeof Component === 'function'
      ? Component.name
      : typeof Component === 'object' && Component !== null
        ? (Component as any).displayName
        : 'Component'

  SkeletonComponent.displayName = `Skeleton(${componentName})`

  return SkeletonComponent
}

/**
 * 기본 스켈레톤 박스 컴포넌트
 */
export function SkeletonBox({
  width,
  height = 16,
  className,
}: {
  width?: string | number
  height?: string | number
  className?: string
}) {
  const styleProps: React.CSSProperties = {}

  if (height !== undefined) {
    styleProps.height = typeof height === 'number' ? `${height}px` : height
  }

  if (width !== undefined) {
    styleProps.width = typeof width === 'number' ? `${width}px` : width
  }

  return React.createElement('div', {
    className: cn('animate-pulse bg-slate-200 rounded', className),
    style: styleProps,
  })
}
