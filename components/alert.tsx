import Container from './container'

export default function Alert({ preview }) {
  return (
    <>
    {preview && <div
    >
      <Container>
        <div>
            <>
              This is a page preview.
              <a
                href="/api/exit-preview"
              >
                Click here
              </a>
              to exit preview mode.
            </>
        </div>
      </Container>
    </div>}
    </>
  )
}
