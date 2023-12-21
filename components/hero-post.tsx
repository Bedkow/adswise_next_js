import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import styled from "styled-components";

const PostTextsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export default function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	slug,
	category,
}: {
	title: any;
	coverImage: any;
	date: any;
	excerpt: any;
	author?: any;
	slug: any;
	category: any;
}) {
	return (
		<section>
			<div>
				{coverImage && (
					<CoverImage title={title} coverImage={coverImage} slug={slug} />
				)}
			</div>
			<PostTextsContainer>
				<h3>
					<Link
						href={`/post/${slug}`}
						dangerouslySetInnerHTML={{ __html: title }}></Link>
				</h3>

				<Date dateString={date} />

				<h4>Kategoria: {category.nodes[0].name}</h4>

				<div dangerouslySetInnerHTML={{ __html: excerpt }} />
			</PostTextsContainer>
		</section>
	);
}
