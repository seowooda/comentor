interface ProjectRoleProps {
  value: string
  onChange: (value: string) => void
}

export const ProjectRole = ({ value, onChange }: ProjectRoleProps) => (
  <div className="flex h-[130px] flex-col items-start justify-start gap-2.5 self-stretch">
    <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
      <div className="justify-start text-[15px] leading-[14px] font-medium text-black">
        맡은 역할
      </div>
      <textarea
        className="h-[110px] w-[403px] resize-none rounded-md bg-white px-3 py-2 outline outline-1 outline-offset-[-1px] outline-slate-300"
        placeholder="프로젝트 내용을 입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)
