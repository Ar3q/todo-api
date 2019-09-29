import { Request, Response, Router } from 'express'

const router: Router = Router()

router
  .route('/')
  .get((req: Request, res: Response) => {
    //get all projects
    return res.json({
      message: 'Hello from the api side',
    })
  })
  .post((req: Request, res: Response) => {
    //create a new project
    return res.json({
      message: 'Hello from the api side',
    })
  })

router
  .route('/:project_id')
  .get((req: Request, res: Response) => {
    //get project with id = project_id
    return res.json({
      message: 'Hello from the api side',
    })
  })
  .put((req: Request, res: Response) => {
    //update the project
    return res.json({
      message: 'Hello from the api side',
    })
  })
  .delete((req: Request, res: Response) => {
    //delete the project
    return res.json({
      message: 'Hello from the api side',
    })
  })

export default router
