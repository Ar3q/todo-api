import { Router } from 'express'

import projectRouter from './project'
import taskRouter from './task'

const router: Router = Router()

router.use('/projects', projectRouter)
router.use('/projects/:project_id/tasks', taskRouter)

export default router
