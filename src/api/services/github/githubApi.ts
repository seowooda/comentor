import { useAuthStore } from '@/store/authStore'

// 공통 API 호출 함수
async function fetchGitHubAPI(
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

//폴더 및 파일 목록을 가져오는 함수
export async function fetchGitHubContents(
  owner: string,
  repo: string,
  path: string = '',
  branch: string,
) {
  return fetchGitHubAPI(owner, repo, path, branch) // 폴더 및 파일 목록 반환
}

//특정 파일 가져오기
export async function fetchGitHubFile(
  owner: string,
  repo: string,
  filePath: string,
  branch: string,
) {
  const data = await fetchGitHubAPI(owner, repo, filePath, branch)

  if (!data.content) throw new Error('파일 내용이 없습니다.')
  if (data.encoding !== 'base64')
    throw new Error(`Unexpected encoding: ${data.encoding}`)

  // Base64 → Uint8Array 변환 후 UTF-8 디코딩
  const binaryString = atob(data.content.replace(/\n/g, ''))
  const bytes = new Uint8Array(binaryString.length)

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new TextDecoder('utf-8').decode(bytes) // UTF-8 변환 후 반환
}

// 특정 날짜 범위 내의 변경된 파일 목록 가져오기
export async function getChangedFiles(
  owner: string,
  repo: string,
  since: string,
  until: string,
) {
  const { githubAccessToken } = useAuthStore.getState()
  const headers: HeadersInit = {
    Authorization: `Bearer ${githubAccessToken}`,
    Accept: 'application/vnd.github.v3+json',
  }

  // 모든 커밋을 페이지네이션으로 가져오기
  let allCommits: any[] = []
  let page = 1
  const perPage = 100
  while (true) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}&until=${until}&per_page=${perPage}&page=${page}`
    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error('커밋 목록을 불러오는 데 실패했습니다.')
    }
    const commits = await response.json()
    allCommits = allCommits.concat(commits)
    if (commits.length < perPage) break
    page++
  }

  // 각 커밋의 상세 fetch를 병렬로 처리
  const fileSet = new Set<string>()
  const commitFetches = allCommits.map(async (commit) => {
    const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`
    try {
      const commitResponse = await fetch(commitUrl, { headers })
      if (!commitResponse.ok) {
        return
      }
      const commitData = await commitResponse.json()
      if (!commitData.files || !Array.isArray(commitData.files)) {
        return
      }
      for (const file of commitData.files) {
        fileSet.add(file.filename)
      }
    } catch (error) {
      // 에러 발생 시 해당 커밋만 건너뜀
    }
  })
  await Promise.all(commitFetches)

  return Array.from(fileSet)
}
