import { useState } from "react"
import { Row, Button } from "react-bootstrap"

import PageLayout from "components/PageLayout"
import AuthorIntro from "components/AuthorIntro"

import FilteringMenu from "components/FilteringMenu"
import PreviewAlert from "components/PreviewAlert"

import { useGetBlogsPages } from "actions/pagination"
import { getAllBlogs, getPaginatedBlogs } from "lib/api"

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  })

  // loadMore: call back to load more data
  // isLoadingMore: is true whenever we are making request to fetch data
  // isReachingEnd: is true when we loaded all of the data, data is empty array

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  })

  const handleFilter = (option, value) =>
    setFilter({ ...filter, [option]: value })

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <FilteringMenu filter={filter} onChange={handleFilter} />
      <hr />
      <Row className="mb-5">{pages}</Row>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore
            ? "..."
            : isReachingEnd
            ? "No more blogs"
            : "Load More"}
        </Button>
      </div>
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
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" })
  return {
    props: {
      blogs,
      preview,
    },
    revalidate: 1,
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
