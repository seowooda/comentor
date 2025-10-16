'use client'

import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
  className?: string
}

/**
 * 마크다운 콘텐츠를 렌더링하는 공통 컴포넌트
 * 코드 하이라이팅, GFM 지원, 일관된 스타일링 제공
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  const markdownComponents: Components = useMemo(
    () => ({
      code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
          <SyntaxHighlighter
            language={match[1]}
            style={oneDark}
            PreTag="div"
            customStyle={{
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              padding: '1rem',
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code
            className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm"
            {...props}
          >
            {children}
          </code>
        )
      },
      h2: ({ children }) => (
        <h2 className="text-lg font-semibold text-slate-800">{children}</h2>
      ),
      p: ({ children }) => (
        <p className="leading-relaxed text-slate-700">{children}</p>
      ),
      ul: ({ children }) => (
        <ul className="list-inside list-disc space-y-1 text-slate-700">
          {children}
        </ul>
      ),
      li: ({ children }) => <li className="ml-4">{children}</li>,
    }),
    [],
  )

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
