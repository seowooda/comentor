import { userHandlers } from './user'
import { projectHandlers } from './project'
import { folderHandlers } from './folder'

//handler 추가해서 사용
export const handlers = [...userHandlers, ...projectHandlers, ...folderHandlers]
