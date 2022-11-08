import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllCategories, getPostsByCategory } from '../../lib/api'

function SingleCategoryPage({filteredPosts}) {
    console.log(filteredPosts)
  return (
    <div>SingleCategoryPage - all posts for that category</div>
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
    return {paths, fallback: 'blocking'}
}

export default SingleCategoryPage