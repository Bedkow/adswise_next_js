import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const CategoryBox = styled.div`
    /* position: relative; */
	
`

const ImageContainer = styled.div`
    /* width: 30%; */
    /* height: 100px; */
    /* position: relative; */
`

const PostTilesContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
`

export default function CategoryPostsBox({
	category,
	tileNumber,
	morePostsForHome,
}: {
	category: any;
	tileNumber?: number;
	morePostsForHome?: any;
}) {

    let sliceEnd = tileNumber || 6;

	//prevent creation of sparse arrays
	if (morePostsForHome.length > tileNumber) {
    morePostsForHome = morePostsForHome.slice(0, sliceEnd)
	}
    
	return (
		<CategoryBox className="category-box">
			<hr />
			<h2>{category}</h2>
			<PostTilesContainer>
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
