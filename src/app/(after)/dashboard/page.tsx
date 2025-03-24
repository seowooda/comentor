import Dashboard from '@/components/Dashboard/Dashboard'
import { DropdownMenuDemo } from '@/components/DropdownMenu/DropdownMenu'
import { SelectDemo } from '@/components/Select/Select'

export default function Page() {
  return (
    <main className="flex flex-col gap-1 pt-[70px]">
      <div>
        <SelectDemo />
      </div>
      <div className="p-[10px]">
        <Dashboard />
      </div>
    </main>
  )
}
