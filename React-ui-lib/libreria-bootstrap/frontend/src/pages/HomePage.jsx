import React, { useMemo, useState } from 'react';
import { Row, Col, Card, Form, Spinner, Alert } from 'react-bootstrap';
import { useCatalogo } from '../context/CatalogoContext';
import AgregarLibroForm from '../components/AgregarLibroForm';
import FraseRandom from '../components/FraseRandom';

export default function HomePage() {
  const { catalogo, cargando, error, agregarLibro } = useCatalogo();
  const [q, setQ] = useState('');

  // 4 random: solo cambia cuando cambia "catalogo"
  const cuatroRandom = useMemo(() => {
    if (!catalogo?.length) return [];
    const c = [...catalogo];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c.slice(0, 4);
  }, [catalogo]);

  // Búsqueda simple (si hay query, ignora random)
  const visibles = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return cuatroRandom;
    return catalogo
      .filter(b =>
        b.titulo.toLowerCase().includes(t) ||
        b.autor.toLowerCase().includes(t) ||
        b.seccion.toLowerCase().includes(t)
      )
      .slice(0, 12);
  }, [q, catalogo, cuatroRandom]);

  if (cargando) return <div className="text-center my-4"><Spinner animation="border" /> Cargando...</div>;
  if (error) return <Alert variant="danger" className="my-4">Error: {error}</Alert>;

  return (
    <>
      <FraseRandom />

      <AgregarLibroForm onAgregar={agregarLibro} />

      <Form.Control
        placeholder="Buscar por título, autor o sección..."
        className="mb-3"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Row xs={1} md={2} lg={4} className="g-3">
        {visibles.map((b) => (
          <Col key={b.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={b.img || '/Imagenes/placeholder.png'}
                alt={b.titulo}
                onError={(e) => (e.currentTarget.src = '/Imagenes/placeholder.png')}
              />
              <Card.Body>
                <Card.Title className="fs-6 mb-1">{b.titulo}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">{b.autor}</Card.Subtitle>
                <Card.Text className="small">{b.seccion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {!visibles.length && <div className="text-muted">Sin resultados.</div>}
      </Row>
    </>
  );
}
