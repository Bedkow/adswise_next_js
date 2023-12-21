import Link from "next/link";
import styled from "styled-components";

const CoverImageContainer = styled.div`
	width: 100%;

	img {
		height: auto;
		max-width: 100%;
	}

	.image-container {
		margin: 20px auto;
		width: 100%;
		max-width: 2000px;
	}
`;

interface Props {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	slug?: string;
}

export default function CoverImage({
	title,
	coverImage,
	slug,
}: Props) {
	return (
		<CoverImageContainer>
			{slug && coverImage ? (
				<div className='image-container'>
					<Link href={`/post/${slug}`} aria-label={title}>
						<img
							alt={`Cover Image for ${title}`}
							src={coverImage?.node.sourceUrl}
						/>
					</Link>
				</div>
			) : null}
		</CoverImageContainer>
	);
}
