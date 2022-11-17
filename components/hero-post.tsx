import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category,
}:{ title: any, coverImage:any, date:any, excerpt:any, author?: any, slug:any, category: any }) {
  // console.log(category.nodes[0].slug);
  const categorySlug = category.nodes[0].slug;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} category={categorySlug} />
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link
              href={`/${categorySlug}/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}>

            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          {/* <Avatar author={author} /> */}
        </div>
      </div>
    </section>
  );
}
