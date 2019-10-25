import BaseModel from './BaseModel'
import Task from './Task'
import { RelationMappings, Model } from 'objection'
import User from './User'

export default class Project extends BaseModel {
  readonly id!: number
  name?: string

  tasks?: Task[]
  user!: User

  static tableName = 'projects'

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
    },
  }

  static relationMappings: RelationMappings = {
    tasks: {
      relation: Model.HasManyRelation,
      modelClass: Task,
      join: {
        from: 'projects.id',
        to: 'tasks.projectId',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'projects.id',
        to: 'users.id',
      },
    },
  }
}
