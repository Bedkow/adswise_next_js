
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const CoverImageContainer = styled.div`
  /* height: 400px; */
  width: 100%;
  position: relative;

  Image {
    object-fit: contain;
    height: 100%;
    width: auto;
    max-width: 100%;
  }
`

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
      width={960}
      height={540}
      priority
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      
    />
  )
  return (
    <CoverImageContainer>
      {slug && coverImage ? (
        <Link href={`/post/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        null
      )}
    </CoverImageContainer>
  );
}
