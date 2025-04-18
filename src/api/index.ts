//user
export type { User, UserResponse } from '@/api/services/user/model'
export { stackNames } from '@/api/services/user/model'

//====================
// PROJECT
//====================
// Types
export type { FileItem } from '@/api/services/project/model'
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
  useProjectCsQuestion,
  useRecentCSQuestions,
  useProjectCsQuestionList,
} from '@/api/services/question/query'

//github
export type {
  GithubRepo,
  GithubRepoResponse,
} from '@/api/services/github/githubRepo'
export {
  fetchGitHubContents,
  fetchGitHubFile,
} from '@/api/services/github/githubApi'
export { useGithubRepos } from '@/api/services/github/githubRepo'
export {
  getProjectDetail,
  getCommitPeriods,
  getProjectFiles,
  getFileCode,
  generateCSQuestions,
} from '@/api/services/github/projectGithubService'

//folder
export type {
  FolderResponse,
  FolderDetailResponse,
  DefaultResponse,
} from '@/api/services/folder/model'
