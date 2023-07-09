import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { getMainLogoData } from "../../lib/api";

export default function TermsOfService({ mainLogoData }) {
	return (
		<Layout preview={false} mainLogoData={mainLogoData}>
			<div>Regulamin</div>
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
