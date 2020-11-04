import { Card } from "react-bootstrap"
import Link from "next/link"
import { urlFor } from "lib/api"

const CardListItem = ({
  link,
  title,
  subtitle,
  date,
  author: { avatar, name },
}) => {
  return (
    <Card className={`fj-card fj-card-list`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          <img
            src={urlFor(avatar).url() || "https://via.placeholder.com/150"}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              {name || "Placeholder Author"}
            </Card.Title>
            <Card.Text className="card-date">
              {date || "Placeholder Date"}
            </Card.Text>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title className="card-main-title">
            {title || "Placeholder Title"}
          </Card.Title>
          <Card.Text>{subtitle || "Placehodler Subtitle"}</Card.Text>
        </Card.Body>
      </div>
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  )
}

export default CardListItem
