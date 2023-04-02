import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const LogoContainer = styled.div`
    margin: 5px;
    display: inline-block;
`

export default function MainLogo({mainLogoData}) {
 const mainLogoDataTest = mainLogoData?.edges[0].node;
console.log(mainLogoDataTest.sourceUrl)
    return (
        <LogoContainer>
        <Link href={'/'}>
        <Image src={mainLogoDataTest.sourceUrl}  alt={mainLogoDataTest.altText} width={279/2} height={136/2} />
        </Link>
        </LogoContainer>
    )

}