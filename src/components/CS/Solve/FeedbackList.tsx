'use client'

import React from 'react'
import { CSAnswer } from '@/api'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

interface FeedbackListProps {
  feedbacks: CSAnswer[]
}

export const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  if (!feedbacks.length) {
    return <p className="text-slate-500">📝 답변을 하고 피드백을 받아보세요.</p>
  }

  return (
    <div className="flex flex-col gap-5">
      {feedbacks.map((f, idx) => (
        <MarkdownRenderer key={idx} content={f.content} />
      ))}
    </div>
  )
}
