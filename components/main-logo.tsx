import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0px;
`

const PlainTextLogo = styled.span`
    font-size: 32px;
    height: 100%;
    width: min-content;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-left: 20px;
    padding-top: 5px;
    color: ${props => props.theme.colors.navBackgEl};

    @media  screen and (max-width: 850px) {
        padding-left: 5px;
    }
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