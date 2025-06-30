import React, { useState, useEffect, useMemo, useContext } from 'react'
import {Container,Row, Col, Card, Form,Button} from 'react-bootstrap'
import AgregarLibroForm from '../components/AgregarLibroForm'
import FraseRandom from '../components/FraseRandom'
import { CatalogoContext } from '../context/CatalogoContext'

export default function HomePage() {
  const {catalogo, setCatalogo}=useContext(CatalogoContext)
  const [busqueda, setBusqueda] = useState('')
  const [randomBooks, setRandomBooks] = useState([])
  const [showForm, setShowForm] = useState(false)  

  useEffect(() => {
    const copia = [...catalogo]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
    setRandomBooks(copia)
  }, [catalogo])

  const MostrarCuatro = useMemo(() => {
    if (!busqueda.trim()) return randomBooks
    return catalogo.filter(libro =>
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [busqueda, randomBooks, catalogo])

  const agregarLibro = (nuevo) => {
    setCatalogo([...catalogo, nuevo])
    setShowForm(false)
  }

  return (
    <Container className="py-4">
      <FraseRandom />
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cerrar formulario' : 'Agregar un libro'}
      </Button>

      {showForm && (
        <AgregarLibroForm onAgregar={agregarLibro} />
      )}

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </Form>

      <Row className="gx-4 gy-4 justify-content-center">
        {MostrarCuatro.map(({ titulo, img, autor, id }) => (
          <Col key={id || titulo} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={img} alt={titulo} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{titulo}</Card.Title>
                <Card.Text className="text-center text-muted mb-4">
                  {autor}
                </Card.Text>
                <div className="mt-auto text-center">
                  <Card.Link href="#">Ver más</Card.Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
