import BaseModel from './BaseModel'
import { RelationMappings, Model } from 'objection'
import Project from './Project'

export default class Task extends BaseModel {
  readonly id!: number
  title!: string
  description?: string
  projectId?: number
  done!: boolean
  remindAt?: Date

  project?: Project

  static tableName = 'tasks'

  static jsonSchema = {
    type: 'object',
    required: ['title', 'done'],

    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      description: { type: 'string', minLength: 1, maxLength: 255 },
      projectId: { type: 'integer' },
      done: { type: 'boolean' },
    },
  }

  static relationMappings: RelationMappings = {
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: Project,
      join: {
        from: 'tasks.projectId',
        to: 'projects.id',
      },
    },
  }
}
