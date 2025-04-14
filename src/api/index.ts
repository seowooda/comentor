//====================
// USER
//====================
// Types
export type { User, UserResponse } from '@/api/services/user/model'

// Functions
export { stackNames } from '@/api/services/user/model'

//====================
// PROJECT
//====================
// Types
export type { FileItem } from '@/api/services/project'
export type {
  ProjectCreateResponse,
  ProjectCreateRequest,
  ProjectListResponse,
  ProjectDetailResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
  ProjectDeleteResponse,
} from '@/api/services/project/index'

// Functions
export {
  getProjectDetail,
  getCommitPeriods,
  getProjectFiles,
  getFileCode,
  generateCSQuestions,
} from '@/api/services/project'

export {
  useProjectList,
  useProjectCreate,
  useProjectUpdate,
  useProjectDelete,
  useProjectDetail,
  mapToProject,
} from '@/api/services/project/index'

//====================
// QUESTION
//====================
// Types
export type {
  CreateProjectCsQuestionRequest,
  FeedbackRequest,
  FeedbackResponse,
  CSQuestionResponse,
  CSQuestionListResponse,
  RecentCSQuestionsResponse,
  CSQuestion,
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/services/question/types'

// Functions
export {
  useCreateProjectCsQuestion,
  generateCSQuestions as generateCodeCSQuestions,
  useGenerateCSQuestions,
} from '@/api/services/question/generate'

export {
  getQuestionHistory as getCSQuestionHistory,
  useQuestionHistory,
  saveQuestion as saveCSQuestion,
  bookmarkQuestion as bookmarkCSQuestion,
} from '@/api/services/question/history'

export {
  submitAnswer as submitCSAnswer,
  useSubmitFeedback,
  useCreateFeedback,
} from '@/api/services/question/feedback'

export {
  getQuestionDetail,
  useQuestionDetail,
  getRecentQuestions,
  useRecentQuestions,
  useProjectCsQuestion,
  useRecentCSQuestions,
  useProjectCsQuestionList,
} from '@/api/services/question/query'

//====================
// GITHUB
//====================
// Types
export type { GithubRepoResponse, GithubRepo } from '@/api/services/github'

// Functions
export {
  fetchGitHubContents,
  fetchGitHubFile,
} from '@/api/services/github/githubService'

export { useGithubRepos } from '@/api/services/github'
