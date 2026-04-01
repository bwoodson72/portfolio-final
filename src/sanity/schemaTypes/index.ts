import type { SchemaTypeDefinition } from 'sanity'
import { postType } from '../schemas/post'
import { projectType } from '../schemas/project'
import { landingPageType } from '../schemas/landingPage'

export const schemaTypes: SchemaTypeDefinition[] = [postType, projectType, landingPageType]
