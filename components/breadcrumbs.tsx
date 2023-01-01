import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs({categoriesList, postsList}) {

    const router = useRouter();
    const currentQuery = router.query;

    const category = categoriesList.find((category) => {
        return category.node.slug === currentQuery.category
    })
    const categoryName = category?.node.name;
    const categorySlug = category?.node.slug;

    const post = postsList.edges.find((post) => {
        return post.node.slug === currentQuery.post 
    })

    const postTitle = post?.node.title

    let postCategoryName
    let postCategorySlug 

    // if (post.node.categories.edges.length <= 1) {
    postCategoryName = post?.node.categories.edges[0].node.name;
    postCategorySlug = post?.node.categories.edges[0].node.slug;
    // }

    return (
        <>
            <div>
                {postCategoryName && <Link href='/'><span>Strona Główna</span></Link>}
                {postCategoryName && <span>{` > `}</span>}
                {postCategoryName && <Link href={`/${postCategorySlug}`}><span>{postCategoryName}</span></Link>}
                {postTitle && <span>{` > `}</span>}
                {postTitle && <span>{postTitle}</span>}
            </div>
        </>
    )
}