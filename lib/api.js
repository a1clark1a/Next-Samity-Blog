import client, { previewClient } from "./sanity"
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

const getClient = (preview) => (preview ? previewClient : client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getAllBlogs(
  { offset = 0, date = "desc" } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == 'blog'] | order(date desc){${blogFields}}`
  )
  return results
}

export async function getPaginatedBlogs(
  { offset = 0, date = "desc" } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == 'blog'] | order(date ${date}){${blogFields}}[${offset}...${
      offset + 6 // you can dynamically change this value for limit
    }]`
  )
  return results
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview)
  const result = await currentClient
    .fetch(
      `*[_type == 'blog' && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`,
      { slug }
    )
    // if preview then check if res[1] is not empty use res[1] else res[0]
    // else res.[0]
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]))
  return result
}
