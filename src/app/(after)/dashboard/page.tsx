'use client'
import Dashboard from '@/components/Dashboard/Dashboard'
import { DashboardSelect } from '@/components/Form/Select'
import React from 'react'

export default function Page() {
  const [filter, setFilter] = React.useState('all')

  return (
    <main className="flex flex-col gap-1 px-[60px] pt-6">
      <div>
        <DashboardSelect setFilter={setFilter} />
      </div>
      <section className="p-[10px]">
        <Dashboard filter={filter} />
      </section>
    </main>
  )
}
