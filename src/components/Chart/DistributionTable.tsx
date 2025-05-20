import React from 'react'

interface IDistributionRow {
  category: string
  solved: number
  solvedRate: string
  correctRate: string
  solvedRateColor?: string
  correctRateColor?: string
}

const sampleData: IDistributionRow[] = [
  {
    category: '#자료구조',
    solved: 9,
    solvedRate: '10%',
    correctRate: '66.67%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
  {
    category: '#알고리즘',
    solved: 12,
    solvedRate: '13.33%',
    correctRate: '66.67%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
  {
    category: '#운영체제',
    solved: 9,
    solvedRate: '10%',
    correctRate: '33.33%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-yellow-500',
  },
  {
    category: '#네트워크',
    solved: 9,
    solvedRate: '10%',
    correctRate: '22.22%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-yellow-500',
  },
  {
    category: '#데이터베이스',
    solved: 9,
    solvedRate: '10%',
    correctRate: '44.44%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
  {
    category: '#보안',
    solved: 9,
    solvedRate: '10%',
    correctRate: '55.56%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
  {
    category: '#언어 및 개발 원리',
    solved: 6,
    solvedRate: '13.33%',
    correctRate: '50%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
  {
    category: '#기타',
    solved: 11,
    solvedRate: '23.33%',
    correctRate: '52.38%',
    solvedRateColor: 'text-slate-500',
    correctRateColor: 'text-green-500',
  },
]

interface DistributionTableProps {
  data?: IDistributionRow[]
}

const DistributionTable: React.FC<DistributionTableProps> = ({
  data = sampleData,
}) => {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
      <table
        className="w-full text-sm"
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        <thead>
          <tr className="border-b border-slate-200 bg-white">
            <th className="px-5 py-3 text-left text-[14px] font-bold text-slate-900">
              카테고리
            </th>
            <th className="px-5 py-3 text-center text-[14px] font-bold text-slate-900">
              푼 문제(총 문제율 %)
            </th>
            <th className="px-5 py-3 text-center text-[14px] font-bold text-slate-900">
              정답률
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.category}
              className="border-b border-slate-200 last:border-b-0"
            >
              <td className="px-5 py-3 align-middle text-[14px] text-slate-900">
                {row.category}
              </td>
              <td className="px-5 py-3 text-center align-middle">
                <span className="mr-2 text-[14px] text-slate-900">
                  {row.solved}
                </span>
                <span className={`text-[14px] ${row.solvedRateColor}`}>
                  {row.solvedRate}
                </span>
              </td>
              <td className="px-5 py-3 text-center align-middle">
                <span
                  className={`text-[14px] font-medium ${row.correctRateColor}`}
                >
                  {row.correctRate}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DistributionTable
