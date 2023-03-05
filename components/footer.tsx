import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: ${(props)=>props.theme.colors.secondary};
`

export default function Footer() {
  return (
    <StyledFooter>
    <hr/>
    Footer placeholder
    <div> AdsWise blog </div>
    </StyledFooter>
  )
}
