import client from "./sanity"
import imageUrl from "@sanity/image-url"

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    coverImage,
    'author' : author->{name, 'avatar': avatar.asset->url},
`

const builder = imageUrl(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getAllBlogs(
  { offset = 0, date = "desc" } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == 'blog'] | order(date ${date}){${blogFields}}[${offset}...${
      offset + 6 // you can dynamically change this value for limit
    }]`
  )
  return results
}

export async function getBlogBySlug(slug) {
  const result = await client
    .fetch(
      `*[_type == 'blog' && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`,
      { slug }
    )
    .then((res) => res?.[0])
  return result
}
