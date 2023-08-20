import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface CategoryPostsBoxProps {
	category?: any;
	tileNumber?: number;
	morePostsForHome?: any;
	layoutID?: number;
	isMobile?: boolean;
}

const CategoryBox = styled.div`
    padding: 70px 0px 0px 0px;

	h2 {
		font-size: 2rem;
		padding-bottom: 20px; 
	}
	
`

const ImageContainer = styled.div`
    width: 100%;
	margin-bottom: 20px;

	img {
		max-width: 100%;
		margin: 0 auto;
	}
`
// bypass TypeScript misbehaving
const PostTilesContainer = styled.div<CategoryPostsBoxProps>`
	display: grid;
	gap: 60px;

	/* props have to be passed to tsx component */
	/* layout nr 1 */
	${props => props.layoutID == 1 && `
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: auto;

		div.post-tile:nth-of-type(1) {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 2;
		}
		div.post-tile:nth-of-type(2) {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 2;
		}

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-auto-rows: 1fr;

			div.post-tile:nth-of-type(1) {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 1;
			}
			div.post-tile:nth-of-type(2) {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
			}
		}
		`}
	/* layout nr 2 */
	${props => props.layoutID == 2 && `
		
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-auto-rows: 1fr;

		div.post-tile:nth-of-type(1) {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 3;
		}

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;

			div.post-tile:nth-of-type(1) {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 1;
			}
		}
		`}

	/* layout nr 3 */
	${props => props.layoutID == 3 && `
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
		}
		`}
	`;

const CategoryTitle = styled.h2`
	margin-bottom: 20px;
`

const SinglePostTitle = styled.h3`
	margin-bottom: 15px;
`

const SinglePostExcerpt = styled.div`
	text-align: justify;
`

export default function CategoryPostsBox({
	category,
	tileNumber,
	morePostsForHome,
	layoutID,
	isMobile
} : CategoryPostsBoxProps
) {
    let sliceEnd = tileNumber || 6;

	//prevent creation of sparse arrays
	if (morePostsForHome.length > tileNumber) {
    morePostsForHome = morePostsForHome.slice(0, sliceEnd)
	}
	return (
		<CategoryBox className="category-box">
			{/* <span>{layoutID}</span> */}
			<CategoryTitle>{`| ${category}`}</CategoryTitle>
			<PostTilesContainer layoutID={layoutID}>
			{morePostsForHome.map((post, index) => {
				return (
					<div key={post.node.slug} className="post-tile">
						<Link href={`/post/${post.node.slug}`}>
                        <ImageContainer>
						<img
							src={post.node.featuredImage.node.sourceUrl}
							alt={post.node.featuredImage.node.altText}
							placeholder="empty"
						/>
                        </ImageContainer>
                        <SinglePostTitle>{post.node.title}</SinglePostTitle>
						{layoutID == 2 && index+1 == 1 && !isMobile && <SinglePostExcerpt dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 1 && !isMobile && <SinglePostExcerpt dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 2 && !isMobile && <SinglePostExcerpt dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						</Link>
					</div>
				);
			})}
			</PostTilesContainer>
		</CategoryBox>
	);
}
