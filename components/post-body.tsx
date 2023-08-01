import styled from "styled-components"

const PostText = styled.div`
  margin-bottom: 40px;
  text-align: justify;
  overflow-wrap: break-word;
`

export default function PostBody({ content }) {
  return (
    <PostText>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PostText>
  )
}
