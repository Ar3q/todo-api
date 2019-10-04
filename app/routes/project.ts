import { Request, Response, Router } from 'express'
import ProjectService from '../services/ProjectService'
import Project from '../models/Project'

const router: Router = Router()
const projectService: ProjectService = new ProjectService()

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const projects = await projectService.findAllProjects()
    res.status(200).json(projects)
  })
  .post(async (req: Request, res: Response) => {
    const project: Project = new Project()
    project.name = req.body.name

    const createdProject = await projectService.createProject(project)

    res.status(201).json(createdProject)
  })

router
  .route('/:project_id')
  .get(async (req: Request, res: Response) => {
    const project = await projectService.findProjectById(
      parseInt(req.params.project_id)
    )
    res.status(200).json(project)
  })
  .patch(async (req: Request, res: Response) => {
    const projectWithPropertiesToUpdate = new Project()
    projectWithPropertiesToUpdate.name = req.body.name

    const updatedProject = await projectService.updateProject(
      parseInt(req.params.project_id),
      projectWithPropertiesToUpdate
    )

    res.status(200).json(updatedProject)
  })
  .delete(async (req: Request, res: Response) => {
    const numberOfRowsDeleted = await projectService.deleteProject(
      parseInt(req.params.project_id)
    )
    res.status(200).json({
      numberOfRowsDeleted: numberOfRowsDeleted,
    })
  })

export default router
