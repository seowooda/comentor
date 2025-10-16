'use client'

import { UserResponse } from '@/api'
import { UserEditForm, UserProfileHeader } from '@/components/User/EditForm'

interface UserSettingsProps {
  user: UserResponse['result']
}

export const UserSettings = ({ user }: UserSettingsProps) => {
  return (
    <div className="flex h-full flex-col">
      <UserProfileHeader user={user} />
      <UserEditForm user={user} />
    </div>
  )
}
