import { getAllBlogs } from "lib/api"

export default async function getBlogs(req, res) {
  const { offset = 0, date = "desc" } = req.query

  const data = await getAllBlogs({ offset, date })
  res.status(200).json(data)
}
