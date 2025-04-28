import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ContentCard } from './ContentCard'

export const CSSolve = () => {
  return (
    <Tabs defaultValue="challenge" className="flex w-[800px] flex-col gap-5">
      <TabsList className="w-full">
        <TabsTrigger value="challenge">도전하기</TabsTrigger>
        <TabsTrigger value="solution">답변보기</TabsTrigger>
      </TabsList>

      <TabsContent value="challenge">
        <div className="flex flex-col gap-5">
          <ContentCard title="질문">
            <p className="font-medium">OOP의 5가지 설계 원칙은?</p>
          </ContentCard>

          <ContentCard title="답변">
            <Textarea
              placeholder="질문에 대한 답변을 작성해주세요..."
              className="h-[200px] resize-none border-slate-300"
            />
          </ContentCard>

          <div className="flex justify-end">
            <Button className="w-24">답변 제출</Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="solution">
        <div className="flex flex-col gap-5">
          <ContentCard title="질문">
            <p className="font-medium">OOP의 5가지 설계 원칙은?</p>
          </ContentCard>

          <ContentCard title="답변">
            <p>답변내용이 들어갑니다</p>
          </ContentCard>

          <ContentCard title="피드백">
            <p className="font-medium">피드백내용이 들어갑니다</p>
          </ContentCard>
        </div>
      </TabsContent>
    </Tabs>
  )
}
