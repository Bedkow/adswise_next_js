import Avatar from './avatar'
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
  console.log(category)
  return (
    <div>
      <div className="mb-5">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} category={category} slug={slug} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/${category}/${slug}`}
          className="hover:underline"
          dangerouslySetInnerHTML={{ __html: title }}>

        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      {/* <Avatar author={author} /> */}
    </div>
  );
}
