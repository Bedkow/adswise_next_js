import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { CMS_NAME } from '../lib/constants';
import { getAllCategories, getMainLogoData, getAllPostsForHome } from '../lib/api';


export default function Index({ allPostsForHome: { edges }, preview, allCategories, mainLogoData }: {allPostsForHome?: any, preview: boolean, allCategories?: any, mainLogoData: any}) {

  const heroPost = edges[0]?.node
  const morePostsForHome = edges.slice(1)

  console.log(morePostsForHome)

  return (
    <Layout preview={preview} allCategories={allCategories} mainLogoData={mainLogoData}>
      <Head>
        <title>Next.js Blog Example with {CMS_NAME}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            // author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            category={heroPost.categories}
          />
        )}
        {morePostsForHome.length > 0 && <MoreStories postsForHome={morePostsForHome} />}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPostsForHome = await getAllPostsForHome(preview)
  const allCategories = await getAllCategories()
  const mainLogoData = await getMainLogoData()

  return {
    props: { allPostsForHome, preview, allCategories, mainLogoData },
    revalidate: 10,
  }
}
