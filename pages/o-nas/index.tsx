import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getMainLogoData } from "../../lib/api";
import styled from "styled-components";

const StyledTitle = styled.h1`
  padding: 5px;
  width: max-content;
  border: 3px black solid;
  margin-bottom: 50px;
`

export default function AboutUs({ mainLogoData }) {
	return (
		<Layout preview={false} mainLogoData={mainLogoData}>
			<StyledTitle>O nas</StyledTitle>
      <div>Lorem Ipsum</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const mainLogoData = await getMainLogoData();

	return {
		props: {
			mainLogoData,
		},
	};
};
