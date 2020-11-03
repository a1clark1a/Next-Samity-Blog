export default function BlogHeader({
  title,
  subtitle,
  coverImage,
  date,
  author,
}) {
  return (
    <div className="blog-detail-header">
      <p className="lead mb-0">
        <img
          src={author?.avatar || "https://via.placeholder.com/150"}
          className="rounded-circle mr-3"
          height="50px"
          width="50px"
          alt="avatar"
        />
        {author?.name || "Author Name"}
        {", "} {date || "Blog Date"}
      </p>
      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {title || "Blog Title"}
      </h1>
      <h2 className="blog-detail-header-subtitle mb-3">
        {subtitle || "Blog Subtitle"}
      </h2>
      {/* Check if contains cover image */}
      <img
        className="img-fluid rounded"
        src={
          coverImage ||
          "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1689&q=60"
        }
        alt=""
      />
    </div>
  )
}
