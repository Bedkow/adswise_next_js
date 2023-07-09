import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getMainLogoData } from "../../lib/api";

export default function AboutUs({ mainLogoData }) {
	return (
		<Layout preview={false} mainLogoData={mainLogoData}>
			<div>O nas</div>
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
