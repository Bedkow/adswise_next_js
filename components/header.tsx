import Link from "next/link";
import MainLogo from "./main-logo";
import Breadcrumbs from "./breadcrumbs";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";

const StyledHeader = styled.header`
	width: 100%;
	min-height: 60px;
	display: flex;
	background-color: ${props => props.theme.colors.navBackg};
  color: ${props => props.theme.colors.navBackgEl};
`;

const MainNav = styled.nav`
	width: 100%;
`;

const CategoryList = styled.ul`
	padding: 20px 0;
	width: 100%;
	display: none;
	gap: 10px;
	flex-direction: row;
	list-style-type: none;
	justify-content: center;
	flex-wrap: wrap;

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.desktopPlus}px) {
		display: flex;
	}
`;

const CategoryHamburgerButton = styled.span`
	display: flex;
	position: absolute;
	top: 5px;
	right: 5px;
	width: 50px;
	height: 50px;
	padding: 5px;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-between;
	z-index: 10;

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.desktopPlus}px) {
		display: none;
	}

	span {
		width: 100%;
		height: 6px;
		border-radius: 5px;
		background-color: ${props => props.theme.colors.navBackgEl};
	}

	&.active {
		.burger-meat {
			display: none;
		}

		.upper-bun {
			transform: rotate(45deg);
			translate: 0px 17.5px;
		}

		.lower-bun {
			transform: rotate(-45deg);
			translate: 0px -17.5px;
		}
	}
`;

const CategoryHamburger = styled.ul`
	padding: 20px;
	width: max-content;
	display: flex;
	gap: 10px;
	flex-direction: column;
	list-style-type: none;
	justify-content: center;
	flex-wrap: wrap;
	position: absolute;
	right: 0px;
	top: 60px;
	background-color: ${props => props.theme.colors.navBackg};;

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.desktopPlus}px) {
		display: none;
	}
`;

const CategoryListItem = styled.li`
`;

const CategoryHamburgerItem = styled.li`
	border: 1px solid black;
	border-radius: 5px;
	width: fit-content;
	height: fit-content;

`;

const SubcategoryList = styled.ul`
	flex-direction: column;
	list-style-type: none;
	display: none;
	z-index: 10;
	

	${CategoryListItem}:hover & {
		display: flex;
		position: absolute;
	}
`;

const SubcategoryHamburger = styled.ul`
	display: flex;
	flex-direction: column;
	list-style-type: none;
	z-index: 10;
	border-radius: 5px;
	overflow: hidden;
`;

const SubcategoryListItem = styled.li`
`;

const SubcategoryHamburgerItem = styled.li`
	padding-left: 20px;
`;

const NameWrapper = styled.div`
	padding: 7px;
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.colors.navBackg};
	color: ${props => props.theme.colors.navBackgEl};
	:hover {
		background-color: ${props => props.theme.colors.navBackgHover};
		color: ${props => props.theme.colors.navBackgElHover};
	}
`;

export default function Header({ allCategories, mainLogoData, postsList }) {
	let [hamburgerVisible, setHamburgerVisible] = useState(false);
	const [width, setWidth] = useState(0);

	if (typeof window !== "undefined") {
		// browser code
		window.addEventListener(
			"resize",
			debounce(() => {
				setWidth(window.innerWidth);
			}, 150)
		);
	}

	const categoriesList = allCategories?.edges;

	const handleHamburgerIconClick = (e) => {
		e.currentTarget.classList.toggle("active");
		hamburgerVisible = !hamburgerVisible;
		setHamburgerVisible(hamburgerVisible);
	};

	return (
		<StyledHeader>
			<MainLogo mainLogoData={mainLogoData} />
			<MainNav>
				<CategoryHamburgerButton onClick={handleHamburgerIconClick}>
					<span className='upper-bun'></span>
					<span className='burger-meat'></span>
					<span className='lower-bun'></span>
				</CategoryHamburgerButton>
				{!hamburgerVisible && (
					/*width >= 1280 &&*/ <CategoryList>
						{categoriesList?.map((category) => {
							if (
								category.node.slug !== "pozostale" &&
								category.node.parent === null &&
								category.node.contentNodes.nodes.length > 0
							) {
								return (
									<CategoryListItem key={category.node.slug}>
										<Link href={`/${category.node.slug}`}>
											<NameWrapper>{category.node.name}</NameWrapper>
										</Link>

										{category.node.children.nodes.length > 0 && (
											<SubcategoryList>
												{category.node.children.nodes.map((subCategory) => {
													if (subCategory.count && subCategory.count > 0) {
														return (
															<SubcategoryListItem key={`${subCategory.slug}`}>
																<Link href={`/${subCategory.slug}`}>
																	<NameWrapper>
																		{subCategory.name}
																	</NameWrapper>
																</Link>
															</SubcategoryListItem>
														);
													} else {
														return null;
													}
												})}
											</SubcategoryList>
										)}
									</CategoryListItem>
								);
							}
						})}
						{categoriesList?.map((category) => {
							if (
								category.node.slug === "pozostale" &&
								category.node.parent === null &&
								category.node.contentNodes.nodes.length > 0
							) {
								return (
									<CategoryListItem key='pozostale'>
										<Link href='/pozostale'>
											<NameWrapper>Pozostałe</NameWrapper>
										</Link>
									</CategoryListItem>
								);
							}
						})}
					</CategoryList>
				)}

				{hamburgerVisible && (
					<CategoryHamburger>
						{categoriesList?.map((category) => {
							if (
								category.node.slug !== "pozostale" &&
								category.node.parent === null &&
								category.node.contentNodes.nodes.length > 0
							) {
								return (
									<CategoryHamburgerItem key={category.node.slug}>
										<Link href={`/${category.node.slug}`}>
											<NameWrapper>{category.node.name}</NameWrapper>
										</Link>

										{category.node.children.nodes.length > 0 && (
											<SubcategoryHamburger>
												{category.node.children.nodes.map((subCategory) => {
													if (subCategory.count && subCategory.count > 0) {
														return (
															<SubcategoryHamburgerItem
																key={`${subCategory.slug}`}>
																<Link href={`/${subCategory.slug}`}>
																	<NameWrapper>
																		{subCategory.name}
																	</NameWrapper>
																</Link>
															</SubcategoryHamburgerItem>
														);
													} else {
														return null;
													}
												})}
											</SubcategoryHamburger>
										)}
									</CategoryHamburgerItem>
								);
							}
						})}
						{categoriesList?.map((category) => {
							if (
								category.node.slug === "pozostale" &&
								category.node.parent === null &&
								category.node.contentNodes.nodes.length > 0
							) {
								return (
									<CategoryHamburgerItem>
										<Link key='pozostale' href='/pozostale'>
											<NameWrapper>Pozostałe</NameWrapper>
										</Link>
									</CategoryHamburgerItem>
								);
							}
						})}
					</CategoryHamburger>
				)}
			</MainNav>
			
				{/* <Breadcrumbs categoriesList={categoriesList} postsList={postsList} /> */}
			
			
		</StyledHeader>
	);
}
