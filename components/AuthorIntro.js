import { Row, Col, Media, Image } from "react-bootstrap"

export default function AuthorIntro() {
  return (
    <Row>
      <Col md="8">
        <Media className="mb-4 admin-intro">
          <Image
            roundedCircle
            width={64}
            height={64}
            className="mr-3"
            src="https://via.placeholder.com/150"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5 className="font-weight-bold mb-0">Hello Friends,</h5>
            <p className="welcome-text">
              My name is Clark Perfecto and I am an experienced software
              engineer and freelance developer. and this is my blog page.
            </p>
          </Media.Body>
        </Media>
      </Col>
    </Row>
  )
}
