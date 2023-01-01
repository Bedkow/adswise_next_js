export default function Pagination() {
  return <div></div>
}

// import Head from 'next/head';
// import { GetStaticProps } from 'next';
// import Container from '../../components/container';
// import MoreStories from '../../components/more-stories';
// import Intro from '../../components/intro';
// import Layout from '../../components/layout';
// import { getAllCategories, getMainLogoData, getAllPostsForHome, getAllPostsWithSlug } from '../../lib/api';
// import { useRouter } from 'next/router';

// export default function Pagination({ allPostsForHome: { edges }, preview, allCategories, mainLogoData, postsList }: {allPostsForHome?: any, preview: boolean, allCategories?: any, mainLogoData: any, postsList: any}) {

//   const router = useRouter();
//   // const pageNumber = router.query;
//   // console.log(pageNumber.pagination); // returns number slug ex "2"
//   // // const morePostsForHome = edges.slice(/* formula for slicing */)
//   // let morePostsForHome;
  
//   // if (+pageNumber.pagination * 8 < edges.length) {
//   //   console.log("CO JA TU MIAŁEM ZROBIĆ XDDDDD");
//   //   morePostsForHome = edges.slice(/* formula for slicing */)
//   // }

//   return (
//     <Layout preview={preview} allCategories={allCategories} mainLogoData={mainLogoData} postsList={postsList}>
//       <Head>
//         <title>Next.js Blog Example with</title>
//       </Head>
//       <Container>
//         <Intro />
//         {morePostsForHome.length > 0 && <MoreStories postsForHome={morePostsForHome} />}
//       </Container>
//     </Layout>
//   )
// }

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPostsForHome = await getAllPostsForHome(preview)
//   const allCategories = await getAllCategories()
//   const mainLogoData = await getMainLogoData()
//   const postsList = await getAllPostsWithSlug();

//   return {
//     props: { allPostsForHome, preview, allCategories, mainLogoData, postsList },
//     revalidate: 10,
//   }
// }

// export async function getStaticPaths(){ // implement dynamic pages
//     const paths = [{params: {pagination: '1'}},{params: {pagination: '2'}}]
//   return {paths, fallback: false}
// }
