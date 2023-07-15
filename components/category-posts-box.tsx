import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface CategoryPostsBoxProps {
	category?: any;
	tileNumber?: number;
	morePostsForHome?: any;
	layoutID?: number;
}

const CategoryBox = styled.div`
    /* position: relative; */
	
`

const ImageContainer = styled.div`
    /* width: 30%; */
    /* height: 100px; */
    /* position: relative; */
`
// bypass TypeScript misbehaving
const PostTilesContainer = styled.div<CategoryPostsBoxProps>`
	display: grid;
	gap: 10px;

	/* props have to be passed to tsx component */
	/* layout nr 1 */
	${props => props.layoutID == 1 && `
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(6, 1fr);

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
		`}

	/* layout nr 3 */
	${props => props.layoutID == 3 && `
		grid-template-columns: 1fr 1fr 1fr;
		grid-tamplate-rows: 1fr auto;
		`}
		
	`;

	

export default function CategoryPostsBox({
	category,
	tileNumber,
	morePostsForHome,
	layoutID,
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
						<Image
							src={post.node.featuredImage.node.sourceUrl}
							alt={post.node.featuredImage.node.altText}
							placeholder="empty"
                            width={320}
                            height={180}
						/>
                        </ImageContainer>
                        <h3>{post.node.title}</h3>
						{layoutID == 2 && index+1 == 1 && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 1 && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						{layoutID == 1 && index+1 == 2 && <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />}
						</Link>
					</div>
				);
			})}
			</PostTilesContainer>
		</CategoryBox>
	);
}
