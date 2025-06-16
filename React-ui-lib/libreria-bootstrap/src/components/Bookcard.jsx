import React from 'react'
import { Card } from 'react-bootstrap'

export default function BookCard({ titulo, autor, img, enlace }) {
  return (
    <Card className="book-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={img}
        alt={`Portada de ${titulo}`}
        className="book-img"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{titulo}</Card.Title>
        <Card.Text className="text-center mb-4">
          <strong>Autor:</strong> {autor}
        </Card.Text>
        <a href={enlace} className="ver-mas mx-auto">Ver más</a>
      </Card.Body>
    </Card>
  )
}
