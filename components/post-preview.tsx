import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category,
}:{ title: any, coverImage:any, date:any, excerpt:any, author?: any, slug:any, category: any }) {
  return (
    <div>
      <div>
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} category={category} slug={slug} />
        )}
      </div>
      <h3>
        <Link
          href={`/${category}/${slug}`}
          dangerouslySetInnerHTML={{ __html: title }}>
        </Link>
      </h3>
      <div>
        <Date dateString={date} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </div>
  );
}
