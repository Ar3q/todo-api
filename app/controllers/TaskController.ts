import {
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from 'routing-controllers'
import { Service } from 'typedi'
import TaskRepository from '../repositories/TaskRepository'
import Task from '../models/Task'

@Service()
@JsonController('/projects/:project_id/tasks')
export class TaskController {
  constructor(private taskRepository: TaskRepository) {}

  @Get()
  async getAll(@Param('project_id') projectId: number): Promise<Task[]> {
    return await this.taskRepository.findAllTaskByProject(projectId)
  }

  @Post()
  async create(
    @Param('project_id') projectId: number,
    @Body() task: Task
  ): Promise<Task> {
    return await this.taskRepository.createTask(task, projectId)
  }

  @Get('/:task_id')
  async getOne(
    @Param('project_id') projectId: number,
    @Param('task_id') taskId: number
  ): Promise<Task> {
    return await this.taskRepository.findTaskById(taskId)
  }

  @Delete('/:task_id')
  async delete(
    @Param('project_id') projectId: number,
    @Param('task_id') taskId: number
  ): Promise<Record<string, number>> {
    const numberOfDeletedRows = await this.taskRepository.deleteTask(taskId)
    return {
      numberOfDeletedTasks: numberOfDeletedRows,
    }
  }

  @Patch('/:task_id')
  async update(
    @Param('project_id') projectId: number,
    @Param('task_id') taskId: number,
    @Body() task: Task
  ): Promise<Task> {
    return await this.taskRepository.updateTask(taskId, task)
  }
}
