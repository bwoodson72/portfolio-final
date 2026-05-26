import type { SchemaTypeDefinition } from 'sanity'
import { postType } from '../schemas/post'
import { projectType } from '../schemas/project'
import { landingPageType } from '../schemas/landingPage'
import { locationPageType } from '../schemas/locationPage'
import { servicePageType } from '../schemas/servicePage'

export const schemaTypes: SchemaTypeDefinition[] = [postType, projectType, landingPageType, locationPageType, servicePageType]
