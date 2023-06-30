import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface CategoryPostsBoxProps {
	category?: any;
	tileNumber?: number;
	morePostsForHome?: any;
	layoutID?: 1 | 2 | 3;
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
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr auto;
	gap: 10px;

	/* props have to be passed to tsx component */
	/* dummy layout nr 2 */
	${props => props.layoutID == 2 && `
		grid-template-columns: 1fr 1fr;
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

	// console.log(morePostsForHome)
    
	return (
		<CategoryBox className="category-box">
			<hr />
			<h2>{category}</h2>
			<PostTilesContainer layoutID={layoutID}>
			{morePostsForHome.map((post) => {
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
						{/* <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} /> */}
						</Link>
					</div>
				);
			})}
			</PostTilesContainer>
		</CategoryBox>
	);
}
