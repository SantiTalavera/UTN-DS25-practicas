import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';

export default function FraseRandom() {
  const { datos, cargando, error } = useFetch('https://stoic-quotes.com/api/quote');

  if (cargando) return <div className="text-center my-4"><Spinner animation="border" /> Cargando cita…</div>;
  if (error)     return <Alert variant="danger">Error: {error}</Alert>;

  // La API devuelve { text: "...", author: "..." }
  const { text, author } = datos || { text: '', author: '' };

  return (
    <blockquote className="border-start ps-3">
      <p className="fst-italic">“{text}”</p>
      <footer className="text-end">— {author}</footer>
    </blockquote>
  );
}
