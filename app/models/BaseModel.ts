import { Model } from 'objection'

//super class for models with shared configuration
class BaseModel extends Model {
  static modelPaths = [__dirname]
}

export default BaseModel
