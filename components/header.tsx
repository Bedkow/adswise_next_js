import Link from 'next/link'
import MainLogo from './main-logo';
import Breadcrumbs from './breadcrumbs';


export default function Header({allCategories, mainLogoData, postsList}) {
  const categoriesList = allCategories?.edges

  return (
<header>
  <MainLogo mainLogoData={mainLogoData}/>
  <nav>
    <ul>
      <li><Link href="/">Strona Główna</Link></li>
      {categoriesList?.map(
        (category) => {
          if (category.node.slug !== "pozostale")
          return <li key={category.node.slug}><Link href={`/${category.node.slug}`}>{category.node.name}</Link></li>
        }
      )}
      <li><Link key="pozostale" href="/pozostale">Pozostałe</Link></li>
    </ul>
  </nav>
  <Breadcrumbs categoriesList={categoriesList} postsList={postsList}/>
  <hr/>
</header>
  );
}


