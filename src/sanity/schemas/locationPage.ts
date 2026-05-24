import { defineField, defineType } from 'sanity'

export const locationPageType = defineType({
  name: 'locationPage',
  title: 'Location Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Used in the Studio only. E.g. "Web Design Granbury"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path under /locations/. E.g. "granbury" → /locations/granbury',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'E.g. "Granbury" — used in headings, copy, and structured data.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'E.g. "Texas"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nearbyAreas',
      title: 'Nearby areas served',
      type: 'array',
      description: 'Surrounding cities and communities.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      description: 'Target 150–160 characters.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'headline',
      title: 'Headline (H1)',
      type: 'string',
      description: 'E.g. "Web Design for Granbury Small Businesses"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'bodyIntro',
      title: 'Introduction',
      type: 'text',
      rows: 6,
      description: 'Opening paragraphs. Establish who you serve in this city and why it matters.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'marketContext',
      title: 'Local market context',
      type: 'text',
      rows: 6,
      description: 'What is the business landscape like in this city? What industries are prominent? What does their web presence typically look like?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'localBusinessTypes',
      title: 'Business types served',
      type: 'array',
      description: 'The kinds of businesses you work with in this city.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'servicesNote',
      title: 'Services note',
      type: 'text',
      rows: 4,
      description: 'Optional paragraph customizing the services pitch for this market.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      description: 'Location-specific questions and answers. Minimum 3.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', type: 'string', title: 'Question' }),
            defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'areaServed',
      title: 'Area served (schema)',
      type: 'array',
      description: 'Cities and areas for LocalBusiness.areaServed structured data.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Optional. Record when this page went live. Not used for routing or display.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'city' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `${subtitle}, TX` : '' }
    },
  },
})
