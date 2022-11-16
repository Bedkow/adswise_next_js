import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Tags from '../../components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts, getAllCategories, getMainLogoData, getSinglePostCategory } from '../../lib/api'
import { CMS_NAME } from '../../lib/constants'
import BackButton from '../../components/back-button'

export default function Post({ post, posts, preview, allCategories, mainLogoData }) {
  const router = useRouter()
  const morePosts = posts?.edges

  console.log(mainLogoData)

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview} allCategories={allCategories} mainLogoData={mainLogoData}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                // author={post.author}
                categories={post.categories}
              />
              <BackButton />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories postsForReadMore={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.post, preview, previewData);
  const allCategories = await getAllCategories();
  const mainLogoData = await getMainLogoData();

  // console.log({allCategories});
  console.log({mainLogoData});

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      allCategories,
      mainLogoData
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  // const singlePostCategory = getSinglePostCategory()
  const generatedPaths = [];
  allPosts.edges.map(({ node }) => {
    generatedPaths.push({
      params: {category: node.categories.edges[0].node.slug, post: node.slug}
    })
  })

  // `${node.categories.edges[0].node.slug}/${node.slug}`

  return {
    paths: generatedPaths,
    fallback: true,
  }
}
