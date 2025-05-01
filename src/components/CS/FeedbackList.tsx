'use client'

import React from 'react'
import { CSAnswer } from '@/api'
import ReactMarkdown from 'react-markdown'

interface FeedbackListProps {
  feedbacks: CSAnswer[]
}

const formatAsMarkdown = (text: string) => {
  return text
    .replace(/(정확한 답변:)/g, '\n\n### $1\n\n')
    .replace(/(보완점:)/g, '\n\n### $1\n\n')
    .replace(/예를 들어,/g, '\n\n- 예를 들어,')
}

export const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  if (!feedbacks.length) {
    return <p className="text-slate-500">📝 답변을 하고 피드백을 받아보세요.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {feedbacks.map((f, idx) => (
        <ReactMarkdown key={idx}>{formatAsMarkdown(f.content)}</ReactMarkdown>
      ))}
    </div>
  )
}
