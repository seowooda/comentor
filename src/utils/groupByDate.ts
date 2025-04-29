export interface CSContent {
  id: number
  title: string
  question: string
  stack: string[]
  createdAt: string
  status: 'DONE' | 'PROGRESS'
}

export function groupByDate(contents: CSContent[]) {
  return contents.reduce((acc: Record<string, CSContent[]>, item) => {
    if (!acc[item.createdAt]) {
      acc[item.createdAt] = []
    }
    acc[item.createdAt].push(item)
    return acc
  }, {})
}
