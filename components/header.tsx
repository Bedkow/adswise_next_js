import Link from "next/link";
import MainLogo from "./main-logo";
import Breadcrumbs from "./breadcrumbs";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledHeader = styled.header`
	background-color: ${(props) => props.theme.colors.secondary};
	width: 100%;
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
	width: 70px;
	height: 70px;
	padding: 5px;
	background-color: ${(props) => props.theme.colors.secondary};
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: space-between;

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.desktopPlus}px) {
		display: none;
	}

	span {
		width: 100%;
		height: 10px;
		background-color: ${(props) => props.theme.colors.CTA};
		border-radius: 5px;
	}

	&.active {
		.burger-meat {
			display: none;
		}

		.upper-bun {
			transform: rotate(45deg);
			translate: 0px 25px;
		}

		.lower-bun {
			transform: rotate(-45deg);
			translate: 0px -25px;
		}
	}
`;

const CategoryHamburger = styled.ul`
	padding: 20px;
	width: 100%;
	display: flex;
	gap: 10px;
	flex-direction: column;
	list-style-type: none;
	justify-content: center;
	flex-wrap: wrap;
	position: absolute;
	background-color: ${(props) => props.theme.colors.secondary};

	@media only screen and (min-width: ${(props) =>props.theme.breakpoints.desktopPlus}px) {
		display: none;
	}
`;

const CategoryListItem = styled.li`
	background-color: ${(props) => props.theme.colors.CTA};
	/* padding: 7px; */
	border-radius: 5px;

	a {
		color: ${(props) => props.theme.colors.textSecondary};
	}
`;

const CategoryHamburgerItem = styled.li`
	background-color: ${(props) => props.theme.colors.CTA};
	border: 1px solid black;
	/* padding: 7px; */
	border-radius: 5px;
	width: fit-content;
	height: fit-content;
	a {
		color: ${(props) => props.theme.colors.textSecondary};
	}
`;

const SubcategoryList = styled.ul`
	flex-direction: column;
	list-style-type: none;
	display: none;
	z-index: 10;
	border-radius: 5px;

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
	/* border: 1px dotted black; */
	/* padding: 10px; */
	background-color: ${(props) => props.theme.colors.accentBlue};
	border-radius: 5px;

	a {
		color: ${(props) => props.theme.colors.textSecondary};
	}
`;

const SubcategoryHamburgerItem = styled.li`
	padding-left: 20px;
	background-color: ${(props) => props.theme.colors.accentBlue};
	a {
		color: ${(props) => props.theme.colors.textSecondary};
	}
	/* border-radius: 5px; */
`;

const NameWrapper = styled.div`
	padding: 7px;
	width: 100%;
	height: 100%;
`;

export default function Header({ allCategories, mainLogoData, postsList }) {
	let [hamburgerVisible, setHamburgerVisible] = useState(false);
	let [width, setWidth] = useState(0);

	/////////////////////////////////////////////////
	// Debounce
	function debounce(func, time) {
		var time = time || 100; // 100 by default if no param
		var timer;
		return function (event) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(func, time, event);
		};
	}

	///////////////////////////////////////////////

	if (typeof window !== "undefined") {
		// browser code
		window.addEventListener(
			"resize",
			debounce(() => {
				setWidth(window.innerWidth);
				// console.log(window.innerWidth);
				// if (window.innerWidth >= 1280) {
				// hamburgerVisible = true;
				// setHamburgerVisible(hamburgerVisible);
				// }
			}, 150)
		);
	}

	// useEffect(()=>{}, [width])

	const categoriesList = allCategories?.edges;

	const handleHamburgerIconClick = (e) => {
		e.currentTarget.classList.toggle("active");
		// console.log(`before state change: ${hamburgerVisible}`);
		hamburgerVisible = !hamburgerVisible;
		setHamburgerVisible(hamburgerVisible);
		// console.log(hamburgerVisible);
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
				{!hamburgerVisible && /*width >= 1280 &&*/(
					<CategoryList>
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
													return (
														<SubcategoryListItem key={`${subCategory.slug}`}>
															<Link href={`/${subCategory.slug}`}>
																<NameWrapper>
																	subCat - {subCategory.name}
																</NameWrapper>
															</Link>
														</SubcategoryListItem>
													);
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
													return (
														<SubcategoryHamburgerItem
															key={`${subCategory.slug}`}>
															<Link href={`/${subCategory.slug}`}>
																<NameWrapper>
																	subCat - {subCategory.name}
																</NameWrapper>
															</Link>
														</SubcategoryHamburgerItem>
													);
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
			<Breadcrumbs categoriesList={categoriesList} postsList={postsList} />
			<hr />
		</StyledHeader>
	);
}
