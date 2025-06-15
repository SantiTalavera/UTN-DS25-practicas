
import React from 'react';
import Cabecera from './components/Cabecera';
import Menu      from './components/Menu';
import SeccionLibros from './components/SeccionLibros';
import Footer    from './components/Footer';

export default function App() {
  return (
    <div id="contenedor">
      <Cabecera />
      <Menu />
      <SeccionLibros />
      <Footer />
    </div>
  );
}

