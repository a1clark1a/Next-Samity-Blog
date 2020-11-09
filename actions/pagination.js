import { Col } from "react-bootstrap"
import { useSWRPages } from "swr"
import moment from "moment"

import CardListItem from "components/CardListItem"
import CardItem from "components/CardItem"
import BlankCardItem from "components/BlankCardItem"
import BlankCardList from "components/BlankCardList"

import { useGetBlogs } from "actions"

const BlogList = ({ blogs, filter }) => {
  return blogs.map((blog) => {
    return filter.view?.list ? (
      <Col md="9" key={blog.title + "-card"}>
        <CardListItem
          author={blog.author || {}}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LLL")}
          slug={blog.slug}
          link={{
            href: "/blogs/[slug]",
            as: `/blogs/${blog.slug}`,
          }}
        />
      </Col>
    ) : (
      <Col md="4" lg="4" key={blog.title + "-card"}>
        <CardItem
          author={blog.author || {}}
          title={blog.title}
          subtitle={blog.subtitle}
          date={moment(blog.date).format("LLL")}
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
}

export const useGetBlogsPages = ({ blogs, filter }) => {
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: paginatedBlogs, error } = withSWR(useGetBlogs({ offset, filter }))
      
      if(!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter}/>
      }

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, i) => {
            return filter.view?.list ? (
              <Col md="9" key={i}>
                <BlankCardList />
              </Col>
            ) : (
              <Col md="4" lg="4" key={i}>
                <BlankCardItem />
              </Col>
            )
          })
      }

      return <BlogList blogs={paginatedBlogs} filter={filter} />
    },
    // here you will compute offset that will get passed into previous callback function
    // SWR: data you will get from 'withSWR' function
    // index: number of current page
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) return null
      return (index + 1) * 6
    },
    // Array of dependencies, if this function is dependent on a value pass it inside the array otherwise leave it empty
    [filter]
  )
}
