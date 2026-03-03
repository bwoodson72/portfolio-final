'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { portableTextComponents } from './PortableTextComponents'

interface Props {
  value: PortableTextBlock[]
}

export default function PostBody({ value }: Props) {
  return <PortableText value={value} components={portableTextComponents} />
}
