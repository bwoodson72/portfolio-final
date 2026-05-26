import { revalidatePath } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import type { NextRequest } from 'next/server'

type WebhookBody = {
  _type: string
  slug?: { current?: string }
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
    )

    if (!isValidSignature || !body) {
      return new Response('Invalid signature', { status: 401 })
    }

    const { _type, slug } = body

    switch (_type) {
      case 'locationPage':
        if (slug?.current) revalidatePath(`/locations/${slug.current}`)
        break
      case 'post':
        if (slug?.current) revalidatePath(`/knowledge/${slug.current}`)
        revalidatePath('/knowledge')
        break
      case 'project':
        if (slug?.current) revalidatePath(`/work/${slug.current}`)
        revalidatePath('/work')
        break
      case 'landingPage':
        if (slug?.current) revalidatePath(`/lp/${slug.current}`)
        break
      case 'servicePage':
        revalidatePath('/services')
        if (slug?.current) revalidatePath(`/services/${slug.current}`)
        break
    }

    return Response.json({ revalidated: true, type: _type, slug: slug?.current })
  } catch (err) {
    console.error('[revalidate]', err)
    return new Response('Internal server error', { status: 500 })
  }
}
