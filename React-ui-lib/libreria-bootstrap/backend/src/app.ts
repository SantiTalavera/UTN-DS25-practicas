import express from 'express';
import { booksRoutes } from './routes/book.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: '*', // Permitir todas las solicitudes CORS
}));

// Middlewares globlales
app.use(express.json());
app.use(logRequest);

// Error handling middleware
app.use(handleError);

app.use('/api/books', booksRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
