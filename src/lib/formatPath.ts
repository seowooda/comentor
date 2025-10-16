/**
 * 긴 파일 경로를 줄여서 표시하는 함수
 * @param {string | undefined} filePath - 전체 파일 경로
 * @param {number} startCount - 앞에서 보여줄 경로 세그먼트 개수 (기본값: 2)
 * @returns {string} 축약된 파일 경로 (e.g., "src/components/.../QuestionItem.tsx")
 */
export const truncatePath = (filePath?: string, startCount = 2): string => {
  // filePath가 없거나 빈 문자열이면 그대로 반환
  if (!filePath) {
    return ''
  }

  const segments = filePath.split('/')
  const totalSegments = segments.length

  // 세그먼트 개수가 (앞부분 + 뒷부분 + 생략기호) 보다 작거나 같으면 원본 경로 반환
  // 예: startCount가 2일 때, 총 4개(a/b/c/d.tsx) 이하면 줄일 필요 없음
  if (totalSegments <= startCount + 1) {
    return filePath
  }

  const startSegments = segments.slice(0, startCount)
  const endSegment = segments[totalSegments - 1]

  return [...startSegments, '...', endSegment].join('/')
}
