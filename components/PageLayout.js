import Navbar from "components/Navbar"
import Head from "next/head"
import { Container } from "react-bootstrap"

export default function PageLayout({ children, className }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Navbar />
        <div className={`page-wrapper ${className}`}>{children}</div>

        <footer className="page-footer">
          <div>
            <a href="#">courses</a>
            {" | "}
            <a href="#">github</a>
            {" | "}
            <a href="#">facebook</a>
          </div>
        </footer>
      </Container>
    </>
  )
}
