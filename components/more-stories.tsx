import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  console.log(posts[0].node.categories.edges[0].node.slug)
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Więcej Artykułów
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            // author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
            // category="dupa"
            category={node.categories.edges[0].node.slug}
          />
        ))}
      </div>
    </section>
  )
}
