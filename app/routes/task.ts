import { Router, Response, Request } from 'express'
import TaskController from '../controllers/TaskController'

const router: Router = Router({ mergeParams: true })
const taskController: TaskController = new TaskController()

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    await taskController.findAllTaskByProject(req, res)
  })
  .post(async (req: Request, res: Response) => {
    await taskController.createTask(req, res)
  })

router
  .route('/:task_id')
  .get(async (req: Request, res: Response) => {
    await taskController.findTaskById(req, res)
  })
  .patch(async (req: Request, res: Response) => {
    await taskController.updateTask(req, res)
  })
  .delete(async (req: Request, res: Response) => {
    await taskController.deleteTask(req, res)
  })

export default router
