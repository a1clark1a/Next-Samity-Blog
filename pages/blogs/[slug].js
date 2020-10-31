import { Row, Col } from "react-bootstrap"

import PageLayout from "components/PageLayout"
import BlogHeader from "components/BlogHeader"
import { getBlogBySlug, getAllBlogs } from "lib/api"

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={blog.coverImage}
            date={blog.date}
            author={blog.author}
          />
          <hr />
          {/* Blog Content Here */}
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Col>
      </Row>
    </PageLayout>
  )
}

// Loading pages dynamically using getServerSideProps

// export async function getServerSideProps({ params }) {
//     const blog = await getBlogBySlug(params.slug)
//     return {
//       props: { blog },
//     }
//   }

// To generate dynamice pages into static pages you need to use getStaticProps and use getStaticPaths
// because your page needs to be created at build time when you are running NPM run build than when you are running npm run dev
// it has to fetch data to construct the HTML pages and in order to construct all of our detail pages it has to have the same slugs as we are fetching
// this way this will be dynamically loading pages during development and statically loading these pages during build time

export async function getStaticProps({ params }) {
  console.log("Fethcing blog by ", params.slug)
  const blog = await getBlogBySlug(params.slug)
  return {
    props: { blog },
  }
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs()
  console.log("Gettings paths for every page")
  return {
    paths: blogs?.map((blog) => ({ params: { slug: blog.slug } })),
    fallback: false, // if none of the paths page is not found this should be a fallback page like a 404 error not found page
  }
}

export default BlogDetail
