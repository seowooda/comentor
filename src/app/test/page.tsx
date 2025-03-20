'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import Header from '@/components/layout/header'

const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto space-y-8 p-8">
        <h1 className="mb-8 text-2xl font-bold">Shadcn UI 컴포넌트 테스트</h1>

        {/* Button 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button</h2>
          <div className="flex gap-4">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="destructive">삭제 버튼</Button>
            <Button variant="outline">외곽선 버튼</Button>
          </div>
        </section>

        {/* Calendar 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <Calendar />
        </section>

        {/* Checkbox 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Checkbox</h2>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms">이용약관 동의</label>
          </div>
        </section>

        {/* DropdownMenu 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DropdownMenu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>드롭다운 메뉴</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* Input 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Input</h2>
          <Input placeholder="입력해주세요" />
        </section>

        {/* NavigationMenu 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">NavigationMenu</h2>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>시작하기</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                    href="/"
                  >
                    <div className="text-sm leading-none font-medium">
                      시작하기
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      프로젝트를 시작하는 방법을 알아보세요.
                    </p>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </section>

        {/* Popover 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Popover</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button>팝오버 열기</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">팝오버 제목</h4>
                  <p className="text-muted-foreground text-sm">
                    팝오버 내용이 여기에 표시됩니다.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </section>

        {/* RadioGroup 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">RadioGroup</h2>
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <label htmlFor="option1">옵션 1</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <label htmlFor="option2">옵션 2</label>
            </div>
          </RadioGroup>
        </section>

        {/* Select 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Select</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">옵션 1</SelectItem>
              <SelectItem value="option2">옵션 2</SelectItem>
              <SelectItem value="option3">옵션 3</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* Tabs 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Tabs</h2>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">탭 1의 내용</TabsContent>
            <TabsContent value="tab2">탭 2의 내용</TabsContent>
            <TabsContent value="tab3">탭 3의 내용</TabsContent>
          </Tabs>
        </section>

        {/* Textarea 테스트 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Textarea</h2>
          <Textarea placeholder="여러 줄의 텍스트를 입력하세요" />
        </section>
      </main>
    </div>
  )
}

export default TestPage
