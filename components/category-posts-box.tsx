import Image from 'next/image';
import styled from 'styled-components';

const CategoryBox = styled.div`
    /* position: relative; */
`

const ImageContainer = styled.div`
    /* width: 30%; */
    /* height: 100px; */
    /* position: relative; */
`

export default function CategoryPostsBox({
	category,
	tileNumber,
	morePostsForHome,
}: {
	category: any;
	tileNumber?: any;
	morePostsForHome?: any;
}) {
	console.log(morePostsForHome);

    let sliceEnd = tileNumber || 6;

    morePostsForHome = morePostsForHome.slice(0, sliceEnd)
    
	return (
		<CategoryBox className="category-box">
			<hr />
			<h2>{category}</h2>
			{morePostsForHome.map((post) => {
				return (
					<div key={post.node.slug} className="post-tile">
						
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
					</div>
				);
			})}
		</CategoryBox>
	);
}
