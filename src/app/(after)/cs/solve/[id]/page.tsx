import { fetchCSQuestion } from '@/api/services/CS/server/queries'
import { ClientSolvePage } from '@/components/CS/ClientSolvePage'

const SolvePage = async ({ params }: any) => {
  const { id } = await params
  const questionId = Number(id)
  const response = await fetchCSQuestion(questionId)

  return <ClientSolvePage question={response.result} />
}

export default SolvePage
