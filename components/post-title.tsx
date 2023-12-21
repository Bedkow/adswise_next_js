import styled from "styled-components"

const PostTitleContainer = styled.h1`
  font-size: 2rem;
  margin: 10px 0px;
`

export default function PostTitle({ children }) {
  return (
    <PostTitleContainer
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
