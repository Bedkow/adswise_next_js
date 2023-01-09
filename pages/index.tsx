import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllCategories, getMainLogoData, getAllPostsForHome, getAllPostsWithSlug } from '../lib/api';
import CategoryPostsBox from '../components/category-posts-box';

export default function Index({ allPostsForHome: { edges }, preview, allCategories, mainLogoData, postsList }: {allPostsForHome?: any, preview: boolean, allCategories?: any, mainLogoData: any, postsList: any}) {

  const heroPost = edges[0]?.node
  const morePostsForHome = edges.slice(1)

  return (
    <Layout preview={preview} allCategories={allCategories} mainLogoData={mainLogoData} postsList={postsList}>
      <Head>
        <title>AdsWise | Strona Główna</title>
      </Head>
      <Container>
        <Intro />
        <CategoryPostsBox category={heroPost.categories}/>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
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
  const postsList = await getAllPostsWithSlug();

  return {
    props: { allPostsForHome, preview, allCategories, mainLogoData, postsList },
    revalidate: 10,
  }
}
