'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { portableTextComponents } from './PortableTextComponents'

interface Props {
  value: PortableTextBlock[] | null | undefined
}

export default function PostBody({ value }: Props) {
  if (!value?.length) return null
  return <PortableText value={value} components={portableTextComponents} />
}
