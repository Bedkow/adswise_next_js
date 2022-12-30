import PostPreview from './post-preview'

export default function MoreStories({ postsForHome, postsForReadMore }: {postsForHome?: any, postsForReadMore?: any}) {
  let posts = [];
  if (postsForHome) {
    posts = postsForHome
  } else if (postsForReadMore) {
    posts = postsForReadMore
  }


  return (
    <section>
      <h2>
        Więcej Artykułów
      </h2>
      <div>
        {postsForHome && posts.map(({ node }, index) => {
        return (  
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            // author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
            category={node.categories.nodes[0].slug}
          />
)})}
        {postsForReadMore && posts.map(({ node }, index) => {
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
