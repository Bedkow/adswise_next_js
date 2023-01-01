import Link from 'next/link';
import Image from 'next/image';

export default function MainLogo({mainLogoData}) {
 const mainLogoDataTest = mainLogoData?.edges[0].node;

    return (
        <Link href={'/'}>
        <Image src={`${mainLogoDataTest.sourceUrl}`}  alt={mainLogoDataTest.altText} width={279/2} height={136/2} />
        </Link>
    )

}