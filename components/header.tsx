import Link from 'next/link'



export default function Header(allCategories) {
  const categoriesList = allCategories.allCategories.categories.edges
  console.log(allCategories.allCategories.categories.edges)
  return (
<header>
  <nav>
    <ul>
      <li><Link href="/">Strona Główna</Link></li>
      {categoriesList.map(
        (category) => {
          if (category.node.slug !== "pozostale")
          return <li key={category.node.slug}><Link href={category.node.uri}>{category.node.name}</Link></li>
        }
      )}
      <li><Link href="category/pozostale">Pozostałe</Link></li>
    </ul>
  </nav>
</header>
  );
}


