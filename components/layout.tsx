import Alert from './alert'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

export default function Layout({ preview, allCategories, children, mainLogoData, postsList }: {preview: boolean, allCategories?: any, children: any, mainLogoData: any, postsList: any}) {
  return (
    <>
      <Meta />
      <div>
        <Alert preview={preview} />
        <Header allCategories={allCategories} mainLogoData={mainLogoData} postsList={postsList}/>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
