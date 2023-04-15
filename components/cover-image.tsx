// import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const CoverImageContainer = styled.div`

	width: 100%;

	img {
		height: auto;
		max-width: 100%;
	}

  .image-container {
    margin: 30px auto;
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
	category?: string;
}

export default function CoverImage({
	title,
	coverImage,
	slug,
	category,
}: Props) {
	// const image = (
	//   <Image
	//     // width={960}
	//     // height={540}
	//     priority
	//     fill
	//     alt={`Cover Image for ${title}`}
	//     src={coverImage?.node.sourceUrl}

	//   />
	// )
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
