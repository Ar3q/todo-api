import { Router } from 'express'

import projectRouter from './project'

const router: Router = Router()

router.use('/projects', projectRouter)

export default router
