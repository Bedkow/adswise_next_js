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
  const categorySlug = category.nodes[0].slug;
  // excerpt = `${excerpt}...`
  console.log(excerpt)
  return (
    <section>
      <div>
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} category={categorySlug} />
        )}
      </div>
      <div>
        <div>
          <h3>
            <Link
              href={`/post/${slug}`}
              dangerouslySetInnerHTML={{ __html: title }}>
            </Link>
          </h3>
          <div>
            <Date dateString={date} />
          </div>
          <h2>Kategoria: {category.nodes[0].name}</h2>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: excerpt}}
          />
        </div>
      </div>
    </section>
  );
}