import { fetchUserInfo } from '@/api/services/user/server/queries'
import { EditForm } from '@/components/User/EditForm'

const Page = async () => {
  const response = await fetchUserInfo()
  const user = response.result

  return (
    <main className="flex flex-grow items-center justify-center px-6 py-5">
      <EditForm user={user} />
    </main>
  )
}

export default Page
