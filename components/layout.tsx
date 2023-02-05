import Alert from './alert';
import Footer from './footer';
import Header from './header';
import Meta from './meta';
import styled from 'styled-components';

const PageLayout = styled.div`
  max-width: 100%;
  margin: 0 50px;
`

export default function Layout({ preview, allCategories, children, mainLogoData, postsList }: {preview: boolean, allCategories?: any, children: any, mainLogoData: any, postsList: any}) {
  return (
    <PageLayout className='layout'>
      <Meta />
      <div>
        <Alert preview={preview} />
        <Header allCategories={allCategories} mainLogoData={mainLogoData} postsList={postsList}/>
        <main>{children}</main>
      </div>
      <Footer />
    </PageLayout>
  )
}
