import { urlFor } from '@/lib/sanity/astro-client';

type SanityImageSource = Parameters<typeof urlFor>[0];

export function sanityImageUrl(source: SanityImageSource, width: number, height: number) {
  return urlFor(source).width(width).height(height).quality(70).auto('format').url();
}

export function sanityImageSrcSet(
  source: SanityImageSource,
  widths: readonly number[],
  aspectRatio = 16 / 9,
) {
  return widths
    .map((width) => {
      const height = Math.round(width / aspectRatio);
      return `${sanityImageUrl(source, width, height)} ${width}w`;
    })
    .join(', ');
}
