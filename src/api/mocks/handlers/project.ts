import { http, HttpResponse, delay } from 'msw'
import {
  Project,
  CSQuestion,
  HistoryByDate,
} from '@/api/services/project/model'

// 목업 프로젝트 데이터
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'seowooda/CoMentor',
    description: 'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
    role: '프론트엔드 개발, 기획, 디자인, 백엔드 개발, 데이터베이스 설계',
    techStack: ['Node.js', 'React.js', 'Figma'],
    status: 'Progress',
    updatedAt: '2025. 3. 15',
    files: ['App.js', 'UserProfile.jsx', 'Test.jsx'],
  },
  {
    id: '2',
    title: 'seowooda/ShoppingMall',
    description: '개인 쇼핑몰 프로젝트',
    role: '풀스택 개발',
    techStack: ['React.js', 'Express.js', 'MongoDB'],
    status: 'Done',
    updatedAt: '2025. 2. 20',
    files: ['CartPage.jsx', 'ProductDetail.jsx', 'OrderList.jsx'],
  },
  {
    id: '29',
    title: 'seowooda/CommitMentor',
    description: 'GitHub 커밋을 분석하여 CS 질문을 생성하는 서비스',
    role: '풀스택 개발자',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Spring Boot'],
    status: 'Progress',
    updatedAt: '2025. 4. 6',
    files: ['DetailProject.tsx', 'ProjectHeader.tsx', 'CodeSelectionTab.tsx'],
  },
  {
    id: '33',
    title: 'seowooda/GitAnalyzer',
    description: 'GitHub 저장소 분석 및 시각화 도구',
    role: '프론트엔드 개발자',
    techStack: ['React.js', 'D3.js', 'Node.js', 'Express.js'],
    status: 'Progress',
    updatedAt: '2025. 4. 10',
    files: [
      'AnalyzerComponent.jsx',
      'VisualizationChart.jsx',
      'DataProcessor.js',
    ],
  },
]

// 목업 커밋 기간 데이터
const mockCommitPeriods = {
  '1week': {
    startDate: '2025년 3월 9일',
    endDate: '2025년 3월 16일',
  },
  '2weeks': {
    startDate: '2025년 3월 2일',
    endDate: '2025년 3월 16일',
  },
  '1month': {
    startDate: '2025년 2월 16일',
    endDate: '2025년 3월 16일',
  },
  '3months': {
    startDate: '2024년 12월 16일',
    endDate: '2025년 3월 16일',
  },
}

// 목업 코드 샘플
const mockCodeSample = `import React, { useState, useEffect } from 'react'; 

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
      } catch (err) { 
        setError(err.message); 
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

// 목업 CS 질문 데이터
const mockCSQuestions: CSQuestion[] = [
  {
    id: 1,
    question:
      '이 코드에서 사용된 React Hook의 목적과 라이프사이클 메서드와의 관계를 설명해주세요.',
    relatedCode: 'useState, useEffect',
  },
  {
    id: 2,
    question:
      'fetch API를 사용할 때 발생할 수 있는 네트워크 오류 처리 방법과 이 코드의 개선점을 설명해주세요.',
    relatedCode: 'fetch, try-catch',
  },
  {
    id: 3,
    question:
      '상태 관리 관점에서 이 컴포넌트의 특징과 성능 최적화 방법을 논의해주세요.',
    relatedCode: 'user, loading, error 상태',
  },
]

// 목업 질문 이력 데이터
const mockQuestionHistory: HistoryByDate = {
  '2025-03-15': [
    {
      id: 1,
      question:
        '이 코드에서 사용된 React Hook의 목적과 라이프사이클 메서드와의 관계를 설명해주세요.',
      answer:
        'React Hook은 함수형 컴포넌트에서 상태 관리와 사이드 이펙트를 처리하기 위해 도입되었습니다. 이 코드에서는 useState와 useEffect를 사용하고 있습니다.',
      feedback:
        '좋은 시도입니다! React Hook의 구체적인 사용 사례를 더 설명해보세요.',

      answered: true,
      status: 'Done',
    },
    {
      id: 2,
      question:
        'fetch API를 사용할 때 발생할 수 있는 네트워크 오류 처리 방법과 이 코드의 개선점을 설명해주세요.',
      answer:
        'fetch API는 네트워크 요청 실패 시 HTTP 에러를 받을 수 있어 response.ok를 확인해야 합니다.',
      feedback:
        '네트워크 오류 처리에 대한 설명이 좋습니다. 개선 방안도 추가해보세요.',

      answered: true,
      status: 'Done',
    },
  ],
  '2025-03-14': [
    {
      id: 3,
      question:
        '상태 관리 관점에서 이 컴포넌트의 특징과 성능 최적화 방법을 논의해주세요.',
      answer: '이 컴포넌트는 여러 상태를 관리하며 API 호출을 처리합니다.',
      feedback: '성능 최적화 방법에 대해 더 자세히 설명해주세요.',

      answered: true,
      status: 'Done',
    },
  ],
  '2025-04-14': [
    {
      id: 4,
      question:
        'React에서 상태 관리 라이브러리를 사용하는 이유와 장단점을 설명해주세요.',
      answer: '',
      feedback: '',

      answered: false,
      status: 'Todo',
    },
  ],
  '2025-04-13': [
    {
      id: 5,
      question:
        'TypeScript의 주요 기능과 JavaScript와의 차이점을 설명해주세요.',
      answer: '',
      feedback: '',

      answered: false,
      status: 'Todo',
    },
  ],
}

export const projectHandlers = [
  // 프로젝트 상세 정보 조회
  http.get('/api/projects/:projectId', async ({ params }) => {
    await delay(500)
    const { projectId } = params

    // ID 기반 프로젝트 찾기. 문자열과 숫자 ID 모두 처리
    const project = mockProjects.find(
      (p) => p.id === projectId || p.id === String(projectId),
    )

    if (!project) {
      // 프로젝트가 없을 경우 기본 프로젝트 제공 (ID 33)
      const defaultProject =
        mockProjects.find((p) => p.id === '33') || mockProjects[0]
      return HttpResponse.json(defaultProject)
    }

    // 항상 성공 응답 반환
    return HttpResponse.json(project)
  }),

  // 프로젝트의 커밋 기간 조회 - 인증 체크 제거
  http.get('/api/projects/:projectId/commit-periods', async () => {
    await delay(300)
    return HttpResponse.json(mockCommitPeriods)
  }),

  // 프로젝트의 파일 목록 조회 - 인증 체크 제거
  http.get('/api/projects/:projectId/files', async ({ params }) => {
    await delay(300)
    const { projectId } = params

    const project = mockProjects.find(
      (p) => p.id === projectId || p.id === String(projectId),
    )

    if (!project) {
      // 프로젝트가 없을 경우 기본 파일 목록 제공
      return HttpResponse.json(['DefaultFile.js', 'SampleComponent.jsx'])
    }

    return HttpResponse.json(project.files)
  }),

  // 파일 코드 조회
  http.get('/api/projects/:projectId/code', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const fileName = url.searchParams.get('fileName')

    if (!fileName) {
      return new HttpResponse(null, { status: 400 })
    }

    return HttpResponse.json({ code: mockCodeSample })
  }),

  // CS 질문 생성
  http.post('/api/cs-questions/generate', async () => {
    await delay(1000)
    return HttpResponse.json(mockCSQuestions)
  }),

  // CS 질문 답변 제출
  http.post('/api/cs-questions/answer', async () => {
    await delay(1000)
    return HttpResponse.json({
      feedback: `
        좋은 시도입니다! 몇 가지 보완할 점이 있습니다:
        
        1. React Hook의 사용 목적에 대해 더 자세히 설명하면 좋겠습니다.
        2. useState와 useEffect의 구체적인 사용 사례를 코드에서 찾아 설명해보세요.
        3. 클래스 컴포넌트의 라이프사이클 메서드와 useEffect의 관계를 더 명확히 설명해보세요.
      `,
    })
  }),

  // 질문 저장
  http.post('/api/cs-questions/:questionId/save', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  // 질문 북마크
  http.post('/api/cs-questions/:questionId/bookmark', async () => {
    await delay(300)
    return HttpResponse.json({ success: true })
  }),

  // 질문 이력 조회
  http.get('/api/projects/:projectId/question-history', async () => {
    await delay(500)
    return HttpResponse.json(mockQuestionHistory)
  }),

  // 프로젝트 목록 조회 API (페이징 지원)
  http.get('/project', async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const statusParam = url.searchParams.get('status') // 'PROGRESS' 또는 'DONE' 또는 null
    const pageParam = url.searchParams.get('page') || '0'

    const page = parseInt(pageParam, 10)
    const size = 8 // 페이지당 8개 항목

    // 상태에 따라 프로젝트 필터링
    let filteredProjects = [...mockProjects]
    if (statusParam) {
      const status = statusParam === 'PROGRESS' ? 'Progress' : 'Done'
      filteredProjects = filteredProjects.filter((p) => p.status === status)
    }

    // 페이징 처리
    const totalElements = filteredProjects.length
    const totalPages = Math.ceil(totalElements / size)
    const start = page * size
    const end = Math.min(start + size, totalElements)
    const pageContent = filteredProjects.slice(start, end)

    // 페이징 형식에 맞춰 응답 데이터 구성
    const response = {
      code: 200,
      message: '프로젝트 목록 조회 성공',
      result: {
        content: pageContent.map((project) => ({
          id: parseInt(project.id),
          name: project.title,
          language: project.techStack[0] || null,
          description: project.description,
          role: project.role,
          status: project.status === 'Progress' ? 'PROGRESS' : 'DONE',
          updatedAt: project.updatedAt,
        })),
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false,
          },
          offset: start,
          paged: true,
          unpaged: false,
        },
        totalPages,
        totalElements,
        last: page >= totalPages - 1,
        size,
        number: page,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        numberOfElements: pageContent.length,
        first: page === 0,
        empty: pageContent.length === 0,
      },
    }

    return HttpResponse.json(response)
  }),
]
