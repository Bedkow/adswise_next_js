import Alert from './alert'
import Footer from './footer'
import Header from './header'
import Meta from './meta'

export default function Layout({ preview, allCategories, children, mainLogoData }: {preview: boolean, allCategories?: any, children: any, mainLogoData: any}) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Header allCategories={allCategories} mainLogoData={mainLogoData}/>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
