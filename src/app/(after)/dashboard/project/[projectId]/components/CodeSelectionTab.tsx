import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Code, FileText, Folder } from 'lucide-react'

interface CodeSelectionTabProps {
  projectId: string
  files: string[]
}

const CodeSelectionTab = ({ projectId, files }: CodeSelectionTabProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1week')
  const [selectedFile, setSelectedFile] = useState('')

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
  }

  const handleFileSelect = (file: string) => {
    setSelectedFile(file)
  }

  const handleGenerateCSQuestions = () => {
    // CS 질문 생성 로직 구현
    console.log('CS 질문 생성', projectId, selectedFile)
  }

  // 샘플 코드
  const sampleCode = `import React, { useState, useEffect } from 'react'; 

function UserProfile({ userId }) { 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => { 
  async function fetchUserData() { 
  try { 
  setLoading(true); 
  const response = await fetch(\`https://api.example.com/users/\${userId}\`); 

  if (!response.ok) { 
  throw new Error('Failed to fetch user data'); 
  }  

  const userData = await response.json(); 
  setUser(userData); 
  setError(null); 
  } catch (err) { setError(err.message); 
  setUser(null); 
  } finally { 
  setLoading(false); 
  } 
  }  

  fetchUserData(); 
  }, [userId]);  

  if (loading) { 
  return <div>Loading user data...</div>; 
  }  

  if (error) { 
  return <div>Error: {error}</div>; 
  }  

  return ( 
  <div className="user-profile"> 
  <h2>{user.name}</h2> 
  <p>Email: {user.email}</p> 
  <p>Role: {user.role}</p> 
   <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p> 
  </div> 
 ); 
}  

export default UserProfile;`

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-slate-300 p-6">
      <h2 className="pt-3 text-lg font-semibold">커밋 기간 선택</h2>

      <div className="flex gap-2 py-2">
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '1week' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodChange('1week')}
        >
          최근 1주일
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '2weeks' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodChange('2weeks')}
        >
          최근 2주일
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '1month' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodChange('1month')}
        >
          최근 1개월
        </button>
        <button
          className={`rounded-md border px-3 py-1 text-xs ${selectedPeriod === '3months' ? 'border-blue-500' : 'border-slate-200'}`}
          onClick={() => handlePeriodChange('3months')}
        >
          최근 3개월
        </button>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-semibold">시작 날짜</label>
          <div className="flex items-center rounded-md border border-slate-200 px-3 py-1">
            <Calendar className="mr-2 h-4 w-4 text-slate-600" />
            <span className="text-xs">2025년 3월 9일</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-semibold">종료 날짜</label>
          <div className="flex items-center rounded-md border border-slate-200 px-3 py-1">
            <Calendar className="mr-2 h-4 w-4 text-slate-600" />
            <span className="text-xs">2025년 3월 16일</span>
          </div>
        </div>
      </div>

      <h2 className="pt-3 text-lg font-semibold">코드 선택</h2>

      <p className="text-xs text-slate-500">
        2025년 3월 9일 ~ 2025년 3월 16일 기간 동안의 커밋된 코드를 확인하고
        선택하세요.
      </p>

      <div className="flex gap-5">
        <div className="flex w-2/5 flex-col gap-2 rounded-md border border-slate-200 p-2">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-zinc-700" />
            <span className="text-xs">파일</span>
          </div>

          {files.map((file, index) => (
            <div
              key={index}
              className={`flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 px-3 py-1 ${selectedFile === file ? 'bg-slate-50' : ''}`}
              onClick={() => handleFileSelect(file)}
            >
              <FileText className="h-4 w-4 text-zinc-700" />
              <span className="text-xs">{file}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col rounded-md border border-slate-200 p-2">
          <div className="mb-2 flex items-center gap-2">
            <Code className="h-4 w-4 text-zinc-700" />
            <span className="text-xs">코드</span>
          </div>

          {!selectedFile ? (
            <div className="flex h-32 items-center justify-center text-sm text-slate-500">
              왼쪽에서 파일을 선택하세요
            </div>
          ) : (
            <div className="flex flex-1 flex-col">
              <div className="mb-4 flex-1 overflow-auto rounded-md bg-slate-100 p-2">
                <pre className="text-xs whitespace-pre-wrap text-slate-600">
                  {sampleCode}
                </pre>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleGenerateCSQuestions}
                  className="bg-black text-xs text-white hover:bg-gray-800"
                >
                  CS 질문 생성하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodeSelectionTab
