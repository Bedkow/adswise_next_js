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

export default function PrivacyPolicy({ mainLogoData }) {
	return (
		<Layout preview={false} mainLogoData={mainLogoData}>
			<StyledTitle>Polityka Prywatności</StyledTitle>
      <div>lorem ipsum</div>
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
