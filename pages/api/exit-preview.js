export default function exitPreview(_, res) {
  // clear cookies
  res.clearPreviewData()
  res.writeHead(307, { location: "/" })
  res.end()
}
