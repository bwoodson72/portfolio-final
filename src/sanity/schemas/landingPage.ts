import { defineField, defineType } from 'sanity'

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Used in the Studio only. Not shown on the page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path under /lp/. e.g. "plumber-dfw" → /lp/plumber-dfw',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'campaignTag',
      title: 'Campaign tag',
      type: 'string',
      description: 'Short label for identifying this page in email subject lines and analytics. e.g. "plumber-dfw-apr"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'problemHeading',
      title: 'Problem section heading',
      type: 'string',
    }),
    defineField({
      name: 'problemBody',
      title: 'Problem section body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'proofHeading',
      title: 'Proof section heading',
      type: 'string',
    }),
    defineField({
      name: 'proofBody',
      title: 'Proof section body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'offerHeading',
      title: 'Offer heading',
      type: 'string',
    }),
    defineField({
      name: 'offerBody',
      title: 'Offer body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formHeading',
      title: 'Form heading',
      type: 'string',
      initialValue: 'Get a free site review',
    }),
    defineField({
      name: 'ctaCopy',
      title: 'Submit button copy',
      type: 'string',
      initialValue: 'Send my info',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs (optional)',
      type: 'array',
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
    }),
    defineField({
      name: 'finalCtaHeading',
      title: 'Final CTA heading',
      type: 'string',
    }),
    defineField({
      name: 'finalCtaCopy',
      title: 'Final CTA button copy',
      type: 'string',
      initialValue: 'Request a free review',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'campaignTag' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `campaign: ${subtitle}` : '' }
    },
  },
})
