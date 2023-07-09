import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${(props)=>props.theme.colors.secondary};
`

export default function Footer() {
  return (
    <StyledFooter>
    <hr/>
    <Link href={"/o-nas"}>O nas</Link>
    <Link href={"/kontakt"}>Kontakt</Link>
    <Link href={"/polityka-prywatnosci"}>Polityka Prywatności</Link>
    <Link href={"/regulamin"}>Regulamin</Link>
    <div> AdsWise blog </div>
    </StyledFooter>
  )
}
