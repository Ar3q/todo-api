import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from 'routing-controllers'
import { Service } from 'typedi'
import ProjectRepository from '../repositories/ProjectRepository'
import Project from '../models/Project'

@Service()
@JsonController('/projects')
export class ProjectController {
  constructor(private projectRepository: ProjectRepository) {}

  @Get()
  async getAll(): Promise<Project[]> {
    return await this.projectRepository.findAllProjects()
  }

  @Post()
  async create(@Body() project: Project): Promise<Project> {
    return await this.projectRepository.createProject(project)
  }

  @Get('/:project_id')
  async getOne(@Param('project_id') id: number): Promise<Project> {
    return await this.projectRepository.findProjectById(id)
  }

  @Delete('/:project_id')
  async delete(
    @Param('project_id') id: number
  ): Promise<Record<string, number>> {
    const numberOfRowsDeleted = await this.projectRepository.deleteProject(id)
    return {
      numberOfDeletedProjects: numberOfRowsDeleted,
    }
  }

  @Patch('/:project_id')
  async update(
    @Param('project_id') id: number,
    @Body() projectWithPropertiesToUpdate: Project
  ): Promise<Project> {
    return await this.projectRepository.updateProject(
      id,
      projectWithPropertiesToUpdate
    )
  }
}
