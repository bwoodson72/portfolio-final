import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [
    {
      title: 'Sort Order, then Newest First',
      name: 'sortOrderAscPublishedAtDesc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'coverImage',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line summary shown on cards and in meta descriptions.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      description: 'Additional project screenshots.',
      of: [
        defineField({
          name: 'screenshot',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'array',
      description: 'Bullet points describing the problem.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      description: 'Bullet points describing the solution.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      description: 'What was delivered.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'outcome',
      title: 'Expected Outcomes',
      type: 'array',
      description: 'Business-facing outcomes (e.g. "Built to rank for local roofing searches"). Shown on the case study page.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      description: 'Technologies used (e.g. Next.js, Tailwind CSS).',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Site URL',
      type: 'url',
    }),
    defineField({
      name: 'loomUrl',
      title: 'Walkthrough Video URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in the Featured Work section on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'highlightQuote',
      title: 'Highlight Quote',
      type: 'text',
      rows: 3,
      description: 'Short 1-2 sentence summary shown on the homepage highlights section. Business-outcome focused.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first. Projects without a sort order appear last.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Used for ordering and sitemap.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
