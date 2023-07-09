import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const LogoContainer = styled.div`
    margin: 5px;
    display: inline-block;
`

const PlainTextLogo = styled.span`
    font-size: 32px;
    height: 80px;
    width: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    left: 20px;
`

export default function MainLogo({mainLogoData}) {
//  const mainLogoDataTest = mainLogoData?.edges[0].node;
// console.log(mainLogoDataTest.sourceUrl)
    return (
        <LogoContainer>
        <Link href={'/'} style={{
            textDecoration: 'none',
        }}>
            <PlainTextLogo>AdsWise</PlainTextLogo>
        {/* <Image src={mainLogoDataTest.sourceUrl}  alt={mainLogoDataTest.altText} width={279/2} height={136/2} /> */}
        </Link>
        </LogoContainer>
    )

}