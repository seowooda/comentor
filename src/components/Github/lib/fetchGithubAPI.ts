import { useAuthStore } from '@/store/authStore'

// 공통 API 호출 함수
export async function fetchGitHubAPI(
  owner: string,
  repo: string,
  path: string,
  branch: string,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
  const { githubAccessToken } = useAuthStore.getState()

  const headers: HeadersInit = {
    Authorization: `Bearer ${githubAccessToken}`,
    Accept: 'application/vnd.github.v3+json',
  }

  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error('GitHub 데이터를 불러오는 데 실패했습니다.')

  return response.json()
}
