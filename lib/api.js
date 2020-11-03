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

export async function getAllBlogs() {
  const results = await client.fetch(`*[_type == 'blog']{${blogFields}}`)
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
