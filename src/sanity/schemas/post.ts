import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  orderings: [
    {
      title: 'Published At (Newest First)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Shown on cards and used as meta description.',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin to the homepage Knowledge section',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Next.js', value: 'nextjs' },
          { title: 'React', value: 'react' },
          { title: 'Performance', value: 'performance' },
          { title: 'Design', value: 'design' },
          { title: 'Business', value: 'business' },
          { title: 'Tooling', value: 'tooling' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineField({
          name: 'block',
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              defineField({
                name: 'link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              }),
            ],
          },
        }),
        defineField({
          name: 'bodyImage',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'codeBlock',
          title: 'Code Block',
          type: 'object',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TSX', value: 'tsx' },
                  { title: 'JSX', value: 'jsx' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'JSON', value: 'json' },
                  { title: 'CSS', value: 'css' },
                  { title: 'HTML', value: 'html' },
                ],
              },
            }),
            defineField({
              name: 'code',
              title: 'Code',
              type: 'text',
            }),
            defineField({
              name: 'filename',
              title: 'Filename',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              filename: 'filename',
              language: 'language',
            },
            prepare({ filename, language }) {
              return {
                title: filename || 'Code Block',
                subtitle: language,
              }
            },
          },
        }),
        defineField({
          name: 'callout',
          title: 'Callout',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: '💡 Tip', value: 'tip' },
                  { title: '⚠️ Warning', value: 'warning' },
                  { title: 'ℹ️ Info', value: 'info' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              text: 'text',
              type: 'type',
            },
            prepare({ text, type }) {
              return {
                title: text ? text.slice(0, 60) : 'Callout',
                subtitle: type,
              }
            },
          },
        }),
      ],
    }),
  ],
})
