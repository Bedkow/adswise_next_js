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
    console.log(categorySlug)

    const post = postsList.edges.find((post) => {
        return post.node.slug === currentQuery.post 
    })
    const postTitle = post?.node.title

    return (
        <>
            <div>
                {categoryName && <Link href='/'><span>Strona Główna</span></Link>}
                {categoryName && <span>{` > `}</span>}
                {categoryName && <Link href={`/${categorySlug}`}><span>{categoryName}</span></Link>}
                {postTitle && <span>{` > `}</span>}
                {postTitle && <span>{postTitle}</span>}
            </div>
        </>
    )
}