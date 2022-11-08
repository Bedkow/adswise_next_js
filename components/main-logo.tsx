import Link from 'next/link';
import Image from 'next/image';

export default function MainLogo({mainLogoData}) {
mainLogoData = mainLogoData.edges[0].node;

    return (
        <Link href={'/'}>
        <Image src={`${mainLogoData.sourceUrl}`}  alt={mainLogoData.altText} width={100} height={100} />
        </Link>
    )

}