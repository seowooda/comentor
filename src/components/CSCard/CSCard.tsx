import { Bookmark } from 'lucide-react'
import { Button } from '../ui/button'

export const CSCard = () => {
  const contents = [
    {
      id: 1,
      title: 'CS',
      question:
        'OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?OOP의 5가지 설계 원칙은?',
      stack: ['Java', 'Spring'],
      createdAt: '2025-03-20',
    },
  ]

  return (
    <div className="flex h-[170px] w-[460px] gap-5 rounded-2xl border border-slate-400 bg-white p-5 shadow-md">
      {contents.map((content) => (
        <div key={content.id} className="flex h-full w-full flex-col gap-5">
          <div className="flex justify-between">
            <p className="text-[18px] font-semibold">{content.title}</p>
            <button className="cursor-pointer p-1">
              <Bookmark size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <p className="line-clamp-1 text-[18px] font-medium">
              {content.question}
            </p>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {content.stack.map((stack, index) => (
                  <span
                    key={index}
                    className="rounded-[20px] bg-blue-100 px-2 py-1 text-sm text-blue-600"
                  >
                    {stack}
                  </span>
                ))}
              </div>
              <Button variant="ghost" className="border border-slate-400">
                도전하기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
