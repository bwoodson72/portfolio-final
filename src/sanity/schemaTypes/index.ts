import type { SchemaTypeDefinition } from 'sanity'
import { postType } from '../schemas/post'
import { projectType } from '../schemas/project'

export const schemaTypes: SchemaTypeDefinition[] = [postType, projectType]
