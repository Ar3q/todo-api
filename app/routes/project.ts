import { Request, Response, Router } from 'express'
import ProjectController from '../controllers/ProjectController';

const router: Router = Router()
const projectController: ProjectController = new ProjectController()

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    await projectController.findAllProjects(req, res)
  })
  .post(async (req: Request, res: Response) => {
    await projectController.createProject(req, res)
  })

router
  .route('/:project_id')
  .get(async (req: Request, res: Response) => {
    await projectController.findProjectById(req, res)
  })
  .patch(async (req: Request, res: Response) => {
    await projectController.updateProject(req, res)
  })
  .delete(async (req: Request, res: Response) => {
    await projectController.deleteProject(req, res)
  })

export default router
