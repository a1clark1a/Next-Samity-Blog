import { getBlogBySlug } from "lib/api"

export default async function enablePreview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid Token" })
  }

  const blog = await getBlogBySlug(req.query.slug)

  if (!blog) res.status(401).json({ message: "Invalid slug" })

  // this set cookies into your browser to allow preview mode
  // __prerender_bypass
  // __next_preview_data
  res.setPreviewData({})
  // function callback to redirect to specified location
  res.writeHead(307, { Location: `/blogs/${blog.slug}` })
  res.end()
}
