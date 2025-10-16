import { fetchCSQuestion } from '@/api/services/CS/server/queries'
import { ClientSolvePage } from '@/components/CS/ClientSolvePage'
import { notFound } from 'next/navigation'

const SolvePage = async ({ params }: any) => {
  const { id } = params
  const questionId = Number(id)
  const response = await fetchCSQuestion(questionId)

  if (!response.result) {
    notFound()
  }

  return <ClientSolvePage question={response.result} />
}

export default SolvePage
