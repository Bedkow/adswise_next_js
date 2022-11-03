import Link from 'next/link';
import Image from 'next/image';

export default function MainLogo(mainLogoData) {
console.log(mainLogoData)

    return (
        <Link href={'/'}>
        <Image src={'/'}  alt={''} width={100} height={100} />
        </Link>
    )

}