// src/components/Layout.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Row,
  Col
} from 'react-bootstrap'
import Sidebar from './Sidebar'


 const customStyles = `
   .navbar-brand {
     width: 100% !important;
     font-size: 2em !important;
     text-align: center !important;
     background-image: url('/Imagenes/alejandria.jpg') !important;
     background-size: cover !important;
     background-position: center !important;
     color: #fff !important;
     padding: 1rem 0 !important;
   }
 `

export default function Layout({ children }) {
  return (
    <>
      <style>{customStyles}</style>
      {/* Navbar superior: sólo marca */}
      <Navbar bg="light" expand="md" className='p-1 '>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Librería Estoica
          </Navbar.Brand>
          {/* Toggle sólo en < md */}
          <Navbar.Toggle 
            aria-controls="offcanvas-sidebar" 
            className="d-md-none" 
          />
          {/* Offcanvas sólo en < md */}
          <Navbar.Offcanvas
            id="offcanvas-sidebar"
            aria-labelledby="offcanvas-sidebar-label"
            placement="start"
            className="d-md-none"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvas-sidebar-label">
                Menú
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Desktop: sidebar fijo + contenido */}
      <Container fluid>
        <Row className="g-0">
          <Col 
            md={3} 
            className="d-none d-md-block bg-light vh-100 p-0"
          >
            <Sidebar />
          </Col>
          <Col md={9} className="p-3">
            {children}
          </Col>
        </Row>
      </Container>

      {/* Footer único */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        © 2025 Santiago Talavera
        <Nav className="justify-content-center mt-2">
          <Nav.Link className="text-white" href="#">
            Términos y Condiciones
          </Nav.Link>
          <Nav.Link className="text-white" href="#">
            Política de Privacidad
          </Nav.Link>
          <Nav.Link className="text-white" href="#">
            Redes Sociales
          </Nav.Link>
        </Nav>
      </footer>
    </>
  )
}
