import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  /**
   * 스켈레톤 높이 (픽셀 또는 Tailwind 클래스)
   */
  height?: string | number
  /**
   * 스켈레톤 너비 (픽셀 또는 Tailwind 클래스)
   */
  width?: string | number
  /**
   * 원형 스켈레톤 여부
   */
  circle?: boolean
}

/**
 * 로딩 상태를 시각적으로 표현하는 스켈레톤 컴포넌트
 * 다양한 크기와 모양으로 쉽게 커스터마이징할 수 있습니다.
 *
 * @example
 * <Skeleton /> // 기본 직사각형
 * <Skeleton width={100} height={24} /> // 크기 지정
 * <Skeleton circle width={40} /> // 원형 아바타 스켈레톤
 * <Skeleton className="h-6 w-12 rounded-md" /> // Tailwind 클래스 사용
 */
const Skeleton = ({
  className,
  height,
  width,
  circle = false,
  ...props
}: SkeletonProps) => {
  const styleProps: React.CSSProperties = {}

  if (height !== undefined) {
    styleProps.height = typeof height === 'number' ? `${height}px` : height
  }

  if (width !== undefined) {
    styleProps.width = typeof width === 'number' ? `${width}px` : width
  }

  return (
    <div
      className={cn(
        'bg-muted/60 animate-pulse rounded',
        circle && 'rounded-full',
        className,
      )}
      style={styleProps}
      {...props}
    />
  )
}

export { Skeleton }
