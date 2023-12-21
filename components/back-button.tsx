import { useRouter } from "next/router";

export default function BackButton({ ctaText }: { ctaText?: string }) {
	const router = useRouter();

	return (
		<button
			type='button'
			onClick={() => {
				router.back();
			}}>
			{ctaText ? ctaText : "Powrót"}
		</button>
	);
}
