import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// value = EXACTO como espera el backend / DTO
// label = como lo ve el usuario
const SECCIONES = [
  { value: 'Filosofos de la antiguedad', label: 'Filósofos de la antigüedad' },
  { value: 'Renovadores del renacimiento', label: 'Renovadores del Renacimiento' },
  { value: 'Difusores contemporaneos', label: 'Difusores contemporáneos' },
  { value: 'Populares en la actualidad', label: 'Populares en la actualidad' },
];

export default function AgregarLibroForm({ onAgregar }) {
  const [form, setForm] = useState({
    titulo: '',
    autorId: '',
    img: 'https://via.placeholder.com/300x400?text=Portada',
    seccion: SECCIONES[0].value,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      titulo: form.titulo.trim(),
      img: form.img?.trim() || null,
      autorId: Number(form.autorId), // backend espera number
      seccion: form.seccion,         // value exacto (DTO)
    };
    await onAgregar(payload);
    setForm({
      titulo: '',
      autorId: '',
      img: 'https://via.placeholder.com/300x400?text=Portada',
      seccion: SECCIONES[0].value,
    });
  };

  return (
    <Form onSubmit={submit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          value={form.titulo}
          onChange={(e) => set('titulo', e.target.value)}
          placeholder="Ingresa el título"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor (ID)</Form.Label>
        <Form.Control
          type="number"
          min={1}
          value={form.autorId}
          onChange={(e) => set('autorId', e.target.value)}
          placeholder="Ej: 1 (luego cambiara a un selector)"
          required
        />
        <Form.Text className="text-muted">
          Por ahora pedimos el <strong>ID del autor</strong> para alinear con el backend.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Portada (URL)</Form.Label>
        <Form.Control
          type="url"
          value={form.img}
          onChange={(e) => set('img', e.target.value)}
          placeholder="https://..."
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Sección</Form.Label>
        <Form.Select
          value={form.seccion}
          onChange={(e) => set('seccion', e.target.value)}
        >
          {SECCIONES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">Agregar Libro</Button>
    </Form>
  );
}
