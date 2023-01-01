import Link from 'next/link';
import MainLogo from './main-logo';
import Breadcrumbs from './breadcrumbs';
import styled from 'styled-components'

const MainNav = styled.nav`
  width: 100%;
`

const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: center;
`

const CategoryListItem = styled.li`
  border: 1px solid black;
  padding: 5px;
`

const SubcategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  display: none;

  ${CategoryListItem}:hover & {
    display: flex;
    position: absolute;
  }
`

const SubcategoryListItem = styled.li`
  border: 1px dotted black;
  padding: 3px;
`


export default function Header({ allCategories, mainLogoData, postsList }) {
	const categoriesList = allCategories?.edges;

	return (
		<header>
			<MainLogo mainLogoData={mainLogoData} />
			<MainNav>
				<CategoryList>
					{/* <CategoryListItem key={'strona-glowna'}>
						<Link href="/">Strona Główna</Link>
					</CategoryListItem> */}
					{categoriesList?.map((category) => {
						if (
							category.node.slug !== 'pozostale' &&
							category.node.parent === null
						) {
							return (
								<CategoryListItem key={category.node.slug}>
									<Link href={`/${category.node.slug}`}>
										{category.node.name}
									</Link>
                  {category.node.children.nodes.length > 0 && <SubcategoryList>
                    {category.node.children.nodes.map(
                      (subCategory) => {
                        return (
                          <SubcategoryListItem key={`${subCategory.slug}`}>
                            <Link href={`${subCategory.slug}`}>subCat - {subCategory.name}</Link>
                          </SubcategoryListItem>
                        )
                      }
                    )}
                  </SubcategoryList>}
								</CategoryListItem>
							);
						}
					})}
					<CategoryListItem>
						<Link key="pozostale" href="/pozostale">
							Pozostałe
						</Link>
					</CategoryListItem>
				</CategoryList>
			</MainNav>
			<Breadcrumbs categoriesList={categoriesList} postsList={postsList} />
			<hr />
		</header>
	);
}
