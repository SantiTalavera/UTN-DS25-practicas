// src/pages/HomePage.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import AgregarLibroForm from '../components/AgregarLibroForm'
import FraseRandom from '../components/FraseRandom'
import { useCatalogo } from '../context/CatalogoContext' 

export default function HomePage() {
  // Traemos catálogo desde el contexto (ya conectado al backend con useFetch)
  const { catalogo, cargando, error, agregarLibro } = useCatalogo()

  const [busqueda, setBusqueda] = useState('')
  const [showForm, setShowForm] = useState(false)

  // 4 libros aleatorios 
  const cuatroRandom = useMemo(() => {
    if (!catalogo?.length) return []
    const c = [...catalogo]
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[c[i], c[j]] = [c[j], c[i]]
    }
    return c.slice(0, 4)
  }, [catalogo])

  // Si hay búsqueda, filtro; si no, muestro los 4 aleatorios
  const mostrados = useMemo(() => {
    if (!busqueda.trim()) return cuatroRandom
    return catalogo.filter(l =>
      l.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [busqueda, cuatroRandom, catalogo])

  // Agregar libro vía contexto
  const onAgregarLibro = async (nuevo) => {
    try {
      if (typeof agregarLibro === 'function') {
        await agregarLibro(nuevo)   // POST al backend 
      }
    } finally {
      setShowForm(false)
    }
  }

  // Loading / error del fetch inicial
  if (cargando) {
    return (
      <Container className="py-4">
        <FraseRandom />
        <p>Cargando catálogo…</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <FraseRandom />
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <FraseRandom />

      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => setShowForm(v => !v)}
      >
        {showForm ? 'Cerrar formulario' : 'Agregar un libro'}
      </Button>

      {showForm && <AgregarLibroForm onAgregar={onAgregarLibro} />}

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </Form>

      <Row className="gx-4 gy-4 justify-content-center">
        {mostrados.map(({ id, titulo, img, autor }) => (
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
