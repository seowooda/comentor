import { Button } from '@/components/ui/button'
import { Checkbox } from '@radix-ui/react-checkbox'
import { XIcon } from 'lucide-react'

export const CreateFolderModal = () => {
  const folder = [
    {
      folderName: 'default',
      csQuestionId: 1,
    },
    {
      folderName: 'seowooda',
      csQuestionId: 1,
    },
    {
      folderName: 'hihihi',
      csQuestionId: 1,
    },
  ]
  return (
    <div className="flex w-44 flex-col gap-5 rounded-[10px] border border-slate-300 bg-white p-5 shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-[16px] font-medium">질문 저장</p>
          <button className="cursor-pointer p-1">
            <XIcon size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {folder.map((item) => (
            <div key={item.folderName} className="flex items-center gap-2">
              <Checkbox />
              <p className="font-medium">{item.folderName}</p>
            </div>
          ))}
        </div>
        <Button>폴더 생성</Button>
      </div>
    </div>
  )
}
