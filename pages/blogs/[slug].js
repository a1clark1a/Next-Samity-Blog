import { useRouter } from "next/router"
import ErrorPage from "next/error"
import { Row, Col } from "react-bootstrap"
import moment from "moment"

import PageLayout from "components/PageLayout"
import BlogHeader from "components/BlogHeader"
import BlogContent from "components/BlogContent"
import PreviewAlert from "components/PreviewAlert"

import { urlFor } from "lib/api"
import { getBlogBySlug, getAllBlogs, getPaginatedBlogs } from "lib/api"

const BlogDetail = ({ blog, preview }) => {
  const router = useRouter()

  if (!router.isFallback && !blog.slug) {
    return <ErrorPage statusCode="404" />
  }

  if (router.isFallback) {
    console.log("Loading fallback page")
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            date={moment(blog.date).format("LLL")}
            author={blog.author}
          />
          <hr />
          {blog.content && <BlogContent content={blog.content} />}
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

export async function getStaticProps({ params, preview = false, previewData }) {
  // preview is a boolean value that is passed by sanity studio for preview draft content

  console.log("Fetching blog by ", params.slug)
  console.log("Loading detail page")
  const blog = await getBlogBySlug(params.slug, preview)
  return {
    props: { blog, preview },
  }
}

export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs()
  const paths = blogs?.map((blog) => ({ params: { slug: blog.slug } }))
  console.log("Gettings paths for every page", paths)
  return {
    paths,
    fallback: true, // if none of the paths page is not found this should be a fallback page like a 404 error not found page
  }
}

export default BlogDetail
