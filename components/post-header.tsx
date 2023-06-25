import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Categories from './categories'

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}:{
  title,
  coverImage,
  date,
  author?,
  categories,
}) {

  console.log(author)
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div>
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div>
        <div>
          <Date dateString={date} />
          <Categories categories={categories} />
          {author && author.node.firstName && author.node.lastName && <span>{`${author.node.firstName} ${author.node.lastName}`}</span>}
          {author && author.node.name && !author.node.firstName && !author.node.lastName &&  <span>{`${author.node.name}`}</span>}
        </div>
      </div>
    </>
  )
}
