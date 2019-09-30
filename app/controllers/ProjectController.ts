import { Request, Response } from 'express'
import Project from '../models/Project'

class ProjectController {
  public async createProject(req: Request, res: Response): Promise<void> {
    const project = await Project.query().insert(req.body)
    res.status(201).json(project)
  }

  public async findAllProjects(req: Request, res: Response): Promise<void> {
    const projects = await Project.query()
    res.status(200).json(projects)
  }

  public async findProjectById(req: Request, res: Response): Promise<void> {
    const project = await Project.query().findById(req.params.project_id)
    res.status(200).json(project)
  }

  public async updateProject(req: Request, res: Response): Promise<void> {
    const toBeUpdatedInProject = {
      name: req.body.name,
    }

    const updatedProject = await Project.query().patchAndFetchById(
      req.params.project_id,
      toBeUpdatedInProject
    )

    res.status(200).json(updatedProject)
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    const deletedRowsNumber = await Project.query().deleteById(
      req.params.project_id
    )
    res.status(200).json({
      deletedRowNumber: deletedRowsNumber,
    })
  }
}

export default ProjectController
