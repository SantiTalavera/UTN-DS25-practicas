import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SECCIONES = [
  'Filosofos de la antiguedad',
  'Renovadores del Renacimiento',
  'Difusores contemporaneos',
  'Populares en la actualidad'
]

export default function AgregarLibroForm({ onAgregar }) {
  // 1️⃣ Incluimos seccion en el estado
  const [datosLibro, setDatosLibro] = useState({
    titulo: '',
    autor: '',
    img: 'https://via.placeholder.com/150',
    seccion: SECCIONES[0]   // valor por defecto
  })

  const actualizarCampo = (campo, valor) => {
    setDatosLibro(prev => ({ ...prev, [campo]: valor }))
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    onAgregar({
      id: Date.now(),
      ...datosLibro
    })
    // Reseteo formulario (mantiene primera sección)
    setDatosLibro({
      titulo: '',
      autor: '',
      img: 'https://via.placeholder.com/150',
      seccion: SECCIONES[0]
    })
  }

  return (
    <Form onSubmit={manejarEnvio} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          value={datosLibro.titulo}
          onChange={e => actualizarCampo('titulo', e.target.value)}
          placeholder="Ingresa el título"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control
          type="text"
          value={datosLibro.autor}
          onChange={e => actualizarCampo('autor', e.target.value)}
          placeholder="Ingresa el autor"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Portada (URL)</Form.Label>
        <Form.Control
          type="text"
          value={datosLibro.img}
          onChange={e => actualizarCampo('img', e.target.value)}
          placeholder="https://..."
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Sección</Form.Label>
        <Form.Select
          value={datosLibro.seccion}
          onChange={e => actualizarCampo('seccion', e.target.value)}
        >
          {SECCIONES.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Agregar Libro
      </Button>
    </Form>
  )
}
