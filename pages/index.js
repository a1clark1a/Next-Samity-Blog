import { Row, Col } from "react-bootstrap"
import PageLayout from "components/PageLayout"
import AuthorIntro from "components/AuthorIntro"
import CardListItem from "components/CardListItem"
import CardItem from "components/CardItem"

import { getAllBlogs } from "lib/api"

export default function Home({ blogs }) {
  const displayBlogs = blogs.map((blog) => {
    return (
      <Col md="4" key={blog.title}>
        <CardItem
          title={blog.title}
          subtitle={blog.subtitle}
          date={blog.date}
          image={blog.coverImage}
        />
      </Col>
    )
  })

  return (
    <PageLayout>
      <AuthorIntro />
      <hr />
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}

        {displayBlogs}
      </Row>
    </PageLayout>
  )
}

// when building project it serves static pages meaning no matter how many times you refresh it serve the same html document
// This function is called during the build time
// Provides props to your page
// it will create static page

// Static page
// Faster, can be cached using CDN
// Created at build time
// When we are making the request we are always receiving the same html document
export async function getStaticProps() {
  const blogs = await getAllBlogs()
  return {
    props: {
      blogs,
    },
  }
}

// This will create dynamic pages
// Dynamic Page
// Created at request time  ( we can fetch data on server)
// Little bit slower, the time depends on data you are fetching
// export async function getServerSideProps() {
//   console.log("calling getServerSideProps")
//   const blogs = await getAllBlogs()
//   return {
//     props: {
//       blogs,
//     },
//   }
// }
