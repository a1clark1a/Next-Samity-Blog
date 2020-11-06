import { Col } from "react-bootstrap"
import { useEffect } from "react"
import { useSWRPages } from "swr"
import moment from "moment"

import CardListItem from "components/CardListItem"
import CardItem from "components/CardItem"
import BlankCardItem from "components/BlankCardItem"
import BlankCardList from "components/BlankCardList"

import { useGetBlogs } from "actions"

export const useGetBlogsPages = ({ blogs, filter }) => {
  useEffect(() => {
    window.__pagination__init = true
  }, [])

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs

      if (typeof window !== "undefined" && window.__pagination__init) {
        initialData = null
      }

      const { data: paginatedBlogs } = withSWR(
        useGetBlogs({ offset, filter }, initialData)
      )

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, i) => {
            return filter.view?.list ? (
              <Col md="9" key={i}>
                <BlankCardList />
              </Col>
            ) : (
              <Col md="4" key={i}>
                <BlankCardItem />
              </Col>
            )
          })
      }

      return paginatedBlogs.map((blog) => {
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
          <Col md="4" key={blog.title + "-card"}>
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
