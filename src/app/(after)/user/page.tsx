import { UserResponse } from '@/api'
import { serverFetcher } from '@/api/lib/serverFetcher'
import { EditForm } from '@/components/EditForm/EditForm'

export default async function Page() {
  const response = await serverFetcher<UserResponse>('/user/info')
  const user = response.result

  return (
    <main className="flex flex-grow items-center justify-center px-6 py-5">
      <EditForm user={user}/>
    </main>
  )
}
