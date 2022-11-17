import { useRouter } from 'next/router';

export default function Breadcrumbs({categoriesList, postsList}) {

    const router = useRouter();
    const currentQuery = router.query;

    const category = categoriesList.find((category) => {
        return category.node.slug === currentQuery.category
    })
    const categoryName = category?.node.name;

    const post = postsList.edges.find((post) => {
        return post.node.slug === currentQuery.post 
    })
    const postTitle = post?.node.title

    return (
        <>
            <div>
                <h2>breadcrumbs placeholder</h2>
                {categoryName && <span>Strona Główna</span>}
                {categoryName && <span>{`===>`}</span>}
                {categoryName && <span>{categoryName}</span>}
                {postTitle && <span>{`===>`}</span>}
                {postTitle && <span>{postTitle}</span>}
            </div>
        </>
    )
}