import { Container, Row, Col, Card } from 'react-bootstrap'

export default function HomePage() {
  const libros = [
    { titulo: 'Meditaciones', img: '/Imagenes/marcoaurelio.jpg', autor: 'Marco Aurelio' },
    { titulo: 'Ensayos', img: '/Imagenes/ensayos.jpg', autor: 'Michel de Montaigne' },
    { titulo: 'Pensar como un emperador', img: '/Imagenes/emperor.webp', autor: 'Donald Robertson' },
    { titulo: 'El obstáculo es el camino', img: '/Imagenes/obsway.jpeg', autor: 'Ryan Holiday' }
  ]

  return (
    <Container className="py-4">
      <Row className="gx-4 gy-4 justify-content-center">
        {libros.map(libro => (
          <Col key={libro.titulo} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={libro.img} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">
                  {libro.titulo}
                </Card.Title>
                <Card.Text className="text-center mb-4">
                  <strong>Autor:</strong> {libro.autor}
                </Card.Text>
                <div className="text-center mt-auto">
                  <Card.Link href={libro.enlace}>Ver más</Card.Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
