import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
