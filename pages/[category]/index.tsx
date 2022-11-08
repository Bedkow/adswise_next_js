import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllCategories, getPostsByCategory } from '../../lib/api'
import Link from 'next/link'
import Image from 'next/image'

function SingleCategoryPage({filteredPosts}) {
    console.log(filteredPosts)
    const categoryName = filteredPosts.edges[0].node.categories.nodes[0].name;
    console.log(categoryName)

  return (
    <div>SingleCategoryPage - all posts for that category
    <h1>{categoryName}</h1>

    {filteredPosts.edges.map(
        (post) => {
           return ( <Link href={post.node.slug}>
                <Image width={100} height={100} alt={post.node.featuredImage.node.altText} src={post.node.featuredImage.node.sourceUrl}></Image>
                <h2>{post.node.title}</h2>
            </Link>
           )
        }
    )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async(context) => {
    const {params} = context
    // console.log())
    const filteredPosts = await getPostsByCategory(params.category)
return {
    props: {
        filteredPosts
    }
}
}

export async function getStaticPaths(){
    const allCategories = await getAllCategories()

    const paths = allCategories.edges.map((category) =>  ({
        params: {category: category.node.slug},
    }))
    return {paths, fallback: false}
}

export default SingleCategoryPage