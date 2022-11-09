import PostPreview from './post-preview'

export default function MoreStories({ postsForHome, postsForReadMore }: {postsForHome?: any, postsForReadMore?: any}) {
  // console.log(postsForHome)
  // console.log(postsForReadMore)
  // console.log(posts[0].node.categories)
  let posts = [];
  if (postsForHome) {
    posts = postsForHome
    console.log("postsForHome prop")
  } else if (postsForReadMore) {
    posts = postsForReadMore
    console.log("postsForReadMore prop")
  }

  console.log(posts)

  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Więcej Artykułów
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {postsForHome && posts.map(({ node }, index) => {
        console.log(node)
        return (  
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            // author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
            // category="dupa"
            category={node.categories.nodes[0].slug}
          />
)})}
        {postsForReadMore && posts.map(({ node }, index) => {
        console.log(node)
        return (  
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
)})}
      </div>
    </section>
  )
}
