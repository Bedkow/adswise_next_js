import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getMainLogoData } from "../../lib/api";

export default function PrivacyPolicy({ mainLogoData }) {
	return (
		<Layout preview={false} mainLogoData={mainLogoData}>
			<div>Polityka Prywatności</div>
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
