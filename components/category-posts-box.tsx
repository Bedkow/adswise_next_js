export default function CategoryPostsBox({category, tileNumber} : {category: any, tileNumber?: any}) {
    console.log(category)
    return (
        <div>
            <div>{category.nodes[0].name}</div>
            <div>{tileNumber}</div>
        </div>
    )
}