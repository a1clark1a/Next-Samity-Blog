import { useState } from "react"
import { Row, Col } from "react-bootstrap"
import useSWR from "swr"

import PageLayout from "components/PageLayout"
import AuthorIntro from "components/AuthorIntro"
import CardListItem from "components/CardListItem"
import CardItem from "components/CardItem"
import FilteringMenu from "components/FilteringMenu"

import { getAllBlogs } from "lib/api"

const fetcher = (url) => fetch(url).then((res) => res.json)

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  })

  const { data, error } = useSWR("/api/hello", fetcher)

  const displayBlogs = blogs.map((blog) => {
    return filter.view.list ? (
      <Col md="9" key={blog.title + "-card"}>
        <CardListItem
          author={blog.author || {}}
          title={blog.title}
          subtitle={blog.subtitle}
          date={blog.date}
          slug={blog.slug}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    ) : (
      <Col md="4" key={blog.title + "-card"}>
        <CardItem
          author={blog.author || {}}
          title={blog.title}
          subtitle={blog.subtitle}
          date={blog.date}
          image={blog.coverImage}
          slug={blog.slug}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    )
  })

  const handleFilter = (option, value) =>
    setFilter({ ...filter, [option]: value })

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu filter={filter} onChange={handleFilter} />
      <hr />
      <Row className="mb-5">{displayBlogs}</Row>
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
