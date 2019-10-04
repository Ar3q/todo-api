import { Router, Response, Request } from 'express'
import TaskService from '../services/TaskService'
import Task from '../models/Task'

const router: Router = Router({ mergeParams: true })
const taskService: TaskService = new TaskService()

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const tasks = await taskService.findAllTaskByProject(
      parseInt(req.params.project_id)
    )
    res.status(200).json(tasks)
  })
  .post(async (req: Request, res: Response) => {
    const taskToCreate = new Task()
    taskToCreate.done = req.body.done || false
    taskToCreate.title = req.body.title
    taskToCreate.description = req.body.description
    taskToCreate.remindAt = req.body.remindAt
    taskToCreate.projectId = parseInt(req.params.project_id)

    const createdTask = await taskService.createTask(taskToCreate)
    res.status(201).json(createdTask)
  })

router
  .route('/:task_id')
  .get(async (req: Request, res: Response) => {
    const task = await taskService.findTaskById(parseInt(req.params.task_id))
    res.status(200).json(task)
  })
  .patch(async (req: Request, res: Response) => {
    const taskWithPropertiesToUpdate = new Task()
    taskWithPropertiesToUpdate.done = req.body.done || false
    taskWithPropertiesToUpdate.title = req.body.title
    taskWithPropertiesToUpdate.description = req.body.description
    taskWithPropertiesToUpdate.remindAt = req.body.remindAt

    const updatedTask = await taskService.updateTask(
      parseInt(req.params.task_id),
      taskWithPropertiesToUpdate
    )
    res.status(200).json(updatedTask)
  })
  .delete(async (req: Request, res: Response) => {
    const deletedRowNumber = await taskService.deleteTask(
      parseInt(req.params.task_id)
    )
    res.status(200).json({
      deletedRowNumber: deletedRowNumber,
    })
  })

export default router
