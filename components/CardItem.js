import { Card } from "react-bootstrap"
import Link from "next/link"

const CardItem = ({ link, title, subtitle, image, date, author }) => {
  const { avatar = "https://via.placeholder.com/150" } = author

  return (
    <Card className={`fj-card`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          <img
            src={avatar}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              {author?.name || "Placeholder Author"}
            </Card.Title>
            <Card.Text className="card-date">{date}</Card.Text>
          </div>
        </Card.Header>
        <div className="view overlay">
          <Card.Img
            src={image || "https://via.placeholder.com/150"}
            alt="Card image cap"
          />
        </div>
        <Card.Body>
          <Card.Title className="card-main-title">
            {title || "Title"}
          </Card.Title>
          <Card.Text>{subtitle || "subtitle"}</Card.Text>
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
