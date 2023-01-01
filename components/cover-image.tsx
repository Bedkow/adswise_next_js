
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string
  category?: string
}

export default function CoverImage({ title, coverImage, slug, category }: Props) {
  const image = (
    <Image
      width={200}
      height={100}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
    />
  )
  return (
    <div>
      {slug && coverImage ? (
        <Link href={`/post/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        null
      )}
    </div>
  );
}
