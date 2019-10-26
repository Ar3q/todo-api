import { Service } from 'typedi'
import Project from '../models/Project'

@Service()
class ProjectRepository {
  public async createProject(project: Project): Promise<Project> {
    return await Project.query().insert(project)
  }

  public async findAllProjects(): Promise<Project[]> {
    return await Project.query()
  }

  public async findProjectById(id: number): Promise<Project> {
    const project = await Project.query().findById(id)
    if (project) {
      return project
    } else {
      throw Error('Project not found')
    }
  }

  public async updateProject(
    id: number,
    projectWithPropertiesToBeUpdated: Project
  ): Promise<Project> {
    const updatedProject = await Project.query().patchAndFetchById(
      id,
      projectWithPropertiesToBeUpdated
    )

    return updatedProject
  }

  public async deleteProject(id: number): Promise<number> {
    const deletedRowsNumber = await Project.query().deleteById(id)
    return deletedRowsNumber
  }
}

export default ProjectRepository
