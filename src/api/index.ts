//user
export type { User } from '@/api/services/user/model'
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
  useProjectCsQuestion,
  useRecentCSQuestions,
  useProjectCsQuestionList,
} from '@/api/services/question/query'

//github
export {
  fetchGitHubContents,
  fetchGitHubFile,
} from '@/api/services/github/githubService'
export { useGithubRepos } from '@/api/services/github'

//folder
export type { Folder, Questions } from '@/api/services/folder/model'
export { QuestionStatus, CSCategory } from '@/api/services/folder/model'
export {
  folderInfo,
  folderUpdate,
  folderDelete,
  folderQuestions,
  folderBookmark,
  folderBookmarkCancel,
} from '@/api/services/folder/queries'
