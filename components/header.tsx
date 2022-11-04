import Link from 'next/link'
import MainLogo from './main-logo';


export default function Header({allCategories, mainLogoData}) {
  console.log(allCategories)
  const categoriesList = allCategories.edges
  
  return (
<header>
  <MainLogo mainLogoData={mainLogoData}/>
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


