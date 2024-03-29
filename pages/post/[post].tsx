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
import styled from 'styled-components'

const SeeAlso = styled.div`
  font-size: 1.5rem;
`

export default function Post({ post, posts, preview, allCategories, mainLogoData, postsList }) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview} allCategories={allCategories} mainLogoData={mainLogoData} postsList={postsList}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>

              <Head>
                <title>
                  {`AdsWise | ${post.title}`}
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
                author={post.author}
                categories={post.categories}
              />

              <PostBody content={post.content} />

              {/* <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer> */}

            </article>

            {/* <SectionSeparator /> */}

            <SeeAlso>Zobacz także:</SeeAlso>

            {morePosts.length > 0 && <MoreStories postsForReadMore={morePosts} tilesNumber={4}/>}
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
  const morePostsNumberInTotal = 6 // number of posts to request for preview under /[post] route (individual post)
  const data = await getPostAndMorePosts(params?.post, preview, previewData, morePostsNumberInTotal);
  const allCategories = await getAllCategories();
  const mainLogoData = await getMainLogoData();
  const postsList = await getAllPostsWithSlug();

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      allCategories,
      mainLogoData,
      postsList
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  const generatedPaths = [];
  allPosts.edges.map(({ node }) => {
    generatedPaths.push({
      params: {post: node.slug}
    })
  })

  return {
    paths: generatedPaths,
    fallback: false,
  }
}
