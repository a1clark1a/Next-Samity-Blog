import { Card } from "react-bootstrap"
import Link from "next/link"
import { urlFor } from "lib/api"

const CardItem = ({
  link,
  title,
  subtitle,
  image,
  date,
  author: { avatar, name } = {},
  mode = "normal",
}) => {
  return (
    <Card className={`fj-card ${mode}`}>
      <div className={`card-body-wrapper ${!image ? "no-image" : ""}`}>
        <Card.Header className="d-flex flex-row">
          <img
            src={urlFor(avatar).url() || "https://via.placeholder.com/150"}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            {mode === "placeholder" ? (
              <>
                <Card.Title className="font-weight-bold mb-1">
                  Placeholder Author
                </Card.Title>
                <Card.Text className="card-date">'date'</Card.Text>
              </>
            ) : (
              <>
                <Card.Title className="font-weight-bold mb-1">
                  {name || "Placeholder Author"}
                </Card.Title>
                <Card.Text className="card-date">{date}</Card.Text>
              </>
            )}
          </div>
        </Card.Header>
        <div className="view overlay">
          {mode === "placeholder" ? (
            <div className="image-placeholder" />
          ) : (
            image && (
              <Card.Img
                src={urlFor(image).crop("center").fit("clip").height(300).url()}
                alt="Card image cap"
              />
            )
          )}
        </div>
        <Card.Body>
          {mode === "placeholder" ? (
            <>
              <Card.Title className="card-main-title">Title</Card.Title>
              <Card.Text>subtitle"</Card.Text>
            </>
          ) : (
            <>
              <Card.Title className="card-main-title">
                {title || "Title"}
              </Card.Title>
              <Card.Text>{subtitle || "subtitle"}</Card.Text>
            </>
          )}
        </Card.Body>
      </div>
      {/* `Linking to a different route refreshes the page
        inorder to not refresh we need to use Link from next/link
        but this will not be enough we need to provide a path like this
        href is the folder path
        as is the url pathS
        <Link href='/blogs/[slug] as={`/blogs/${slug}`/>}
        ` */}
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  )
}

export default CardItem
