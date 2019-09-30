import { Request, Response } from 'express'
import Task from '../models/Task'

class TaskController {
  public async createTask(req: Request, res: Response): Promise<void> {
    const taskToCreate = {
      title: req.body.title,
      description: req.body.description,
      projectId: parseInt(req.params.project_id),
      done: req.body.done || false,
      remindAt: new Date(req.body.remindAt) || null,
    }

    const task = await Task.query().insert(taskToCreate)

    res.status(201).json(task)
  }

  public async findAllTaskByProject(
    req: Request,
    res: Response
  ): Promise<void> {
    const tasks = await Task.query().where('projectId', req.params.project_id)

    res.status(200).json(tasks)
  }

  public async findTaskById(req: Request, res: Response): Promise<void> {
    const task = await Task.query().findById(req.params.task_id)
    res.status(200).json(task)
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    const task = await Task.query().patchAndFetchById(
      req.params.task_id,
      req.body
    )
    res.status(200).json(task)
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    await Task.query().deleteById(req.params.task_id)
    res.status(200).json({
      message: 'Deleted',
    })
  }
}

export default TaskController
