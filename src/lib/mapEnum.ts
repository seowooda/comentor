import { CSCategory, QuestionStatus } from '@/api/types/common'

// 한글로 변환하는 함수
export const mapCS = (category: CSCategory): string => {
  switch (category) {
    case CSCategory.DATA_STRUCTURES_ALGORITHMS:
      return '자료구조/알고리즘'
    case CSCategory.OPERATING_SYSTEMS:
      return '운영체제'
    case CSCategory.NETWORKING:
      return '네트워크'
    case CSCategory.DATABASES:
      return '데이터베이스'
    case CSCategory.SECURITY:
      return '보안'
    case CSCategory.LANGUAGE_AND_DEVELOPMENT_PRINCIPLES:
      return '언어 및 개발 원리'
    case CSCategory.ETC:
      return '기타'
    default:
      return '알 수 없음' // 기본값 설정
  }
}

export const mapStatus = (status: QuestionStatus): string => {
  switch (status) {
    case QuestionStatus.DONE:
      return '답변됨'
    case QuestionStatus.TODO:
      return '답변필요'
    default:
      return '알 수 없음' // 기본값 설정
  }
}
