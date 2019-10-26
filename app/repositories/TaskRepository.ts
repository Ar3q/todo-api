import { Service } from 'typedi'
import Task from '../models/Task';

@Service()
class TaskRepository {
  public async createTask(task: Task, projectId: number): Promise<Task> {
    task.projectId = projectId
    const createdTask = await Task.query().insert(task)
    return createdTask
  }

  public async findAllTaskByProject(projectId: number): Promise<Task[]> {
    return await Task.query().where('projectId', projectId)
  }

  public async findTaskById(taskId: number): Promise<Task> {
    const task = await Task.query().findById(taskId)
    if (!task) {
      throw Error('Task not found')
    }
    return task
  }

  public async updateTask(taskId: number, taskWithPropertiesToBeUpdated: Task): Promise<Task> {
    const task = await Task.query().patchAndFetchById(
      taskId,
      taskWithPropertiesToBeUpdated
    )
    return task
  }

  public async deleteTask(taskId: number): Promise<number> {
    const deletedRowsNumber = await Task.query().deleteById(taskId)
    return deletedRowsNumber
  }
}

export default TaskRepository
