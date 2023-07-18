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
    /* position: relative; */
	
`

const ImageContainer = styled.div`
    width: 100%;
    /* height: 100px; */
    /* position: relative; */

	img {
		max-width: 100%;
	}
`
// bypass TypeScript misbehaving
const PostTilesContainer = styled.div<CategoryPostsBoxProps>`
	display: grid;
	gap: 10px;

	/* props have to be passed to tsx component */
	/* layout nr 1 */
	${props => props.layoutID == 1 && `
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(4, 1fr) auto auto;

		div.post-tile:nth-of-type(1) {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 5;
		}
		div.post-tile:nth-of-type(2) {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 5;
		}

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;

			div.post-tile:nth-of-type(1) {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 1;
			}
			div.post-tile:nth-of-type(2) {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 1;
			}
		}
		`}
	/* layout nr 2 */
	${props => props.layoutID == 2 && `
		grid-template-columns: 1fr 1fr;
		grid-tamplate-rows: repeat(4, 1fr) auto;

		div.post-tile:nth-of-type(1) {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 1;
			grid-row-end: 5;
		}

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;

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
		grid-tamplate-rows: 1fr auto;

		@media only screen and (max-width: 700px){
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;
		}
		`}
	`;

	

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
			<hr />
			<span>{`layout: ${layoutID}`}</span>
			<h2>{category}</h2>
			<PostTilesContainer layoutID={layoutID}>
			{morePostsForHome.map((post, index) => {
				console.log(post)
				console.log(index + 1)
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
                        <h3>{post.node.title}</h3>
						{layoutID == 2 && index+1 == 1 && !isMobile && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 1 && !isMobile && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 2 && !isMobile && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						</Link>
					</div>
				);
			})}
			</PostTilesContainer>
		</CategoryBox>
	);
}
