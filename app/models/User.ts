import BaseModel from './BaseModel'
import { RelationMappings, Model } from 'objection'
import Project from './Project'

class User extends BaseModel {
  readonly id!: number
  username!: string
  email!: string
  password!: string

  projects?: Project[]

  static tableName = 'users'

  static jsonSchema = {
    type: 'object',
    required: ['username', 'email', 'password'],

    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 5, maxLength: 128 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8, maxLength: 128 },
    },
  }

  static relationMappings: RelationMappings = {
    projects: {
      relation: Model.HasManyRelation,
      modelClass: Project,
      join: {
        from: 'users.id',
        to: 'projects.userId',
      },
    },
  }
}

export default User
