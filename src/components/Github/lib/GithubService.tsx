import { fetchGitHubAPI } from './fetchGithubAPI'

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
