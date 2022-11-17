export default function Tags({ tags }) {
  return (
    <div>
      <p>
        Tagged
        {tags.edges.map((tag, index) => (
          <div key={index}>
            {tag.node.name}
          </div>
        ))}
      </p>
    </div>
  )
}
