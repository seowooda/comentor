/**
 * 날짜를 'YYYY. MM. DD' 형식으로 포맷팅하는 함수
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 포맷팅된 날짜 문자열 (YYYY. MM. DD)
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`
}
