import GitHubExplorer from '@/components/Github/github'

export default function page() {
  const owner = 'CommitMentor'
  const repo = 'CoMentor-Frontend'
  const branch = 'develop'

  return <GitHubExplorer owner={owner} repo={repo} branch={branch} />
}
