import Image from "next/image";

export default function Avatar({ author }) {
	const isAuthorHaveFullName =
		author?.node?.firstName && author?.node?.lastName;
	const name = isAuthorHaveFullName
		? `${author.node.firstName} ${author.node.lastName}`
		: author.node.name || null;

	return (
		<div>
			<div>
				<Image
					src={author.node.avatar.url}
					width={100}
					height={100}
					alt={name}
				/>
			</div>
			<div>{name}</div>
		</div>
	);
}
