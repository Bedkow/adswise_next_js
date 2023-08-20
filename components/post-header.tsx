import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Categories from './categories'
import styled from 'styled-components'

const PostHeaderContainer = styled.div`
  margin: 40px 0px;
`

const Author = styled.span`
  
`

const PostMetadataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;

  @media screen and (max-width: 700px){
    gap: 5px;
  }
`

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}:{
  title,
  coverImage?,
  date,
  author?,
  categories,
}) {

  return (
		<PostHeaderContainer>
			<PostTitle>{title}</PostTitle>
			<div>
				<CoverImage title={title} coverImage={coverImage} />
			</div>
			<div>
				<PostMetadataContainer>
					<Date dateString={date} />
          <span>{` | `}</span>
					<Categories categories={categories} />
          <span>{` | `}</span>
					<Author>
						{author && author.node.firstName && author.node.lastName && (
							<span>{`${author.node.firstName} ${author.node.lastName}`}</span>
						)}
						{author &&
							author.node.name &&
							!author.node.firstName &&
							!author.node.lastName && <span>{`${author.node.name}`}</span>}
					</Author>
				</PostMetadataContainer>
			</div>
		</PostHeaderContainer>
	);
}
