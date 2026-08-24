import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ??
  import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  import.meta.env.SANITY_PROJECT_ID ??
  process.env.SANITY_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ??
  import.meta.env.NEXT_PUBLIC_SANITY_DATASET ??
  import.meta.env.SANITY_DATASET ??
  process.env.SANITY_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  'production';

export const sanityConfigured = Boolean(projectId);

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: import.meta.env.PROD,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity is not configured');
  return builder.image(source);
}
