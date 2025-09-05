import express from 'express';
import cors from 'cors';
import { booksRoutes } from './routes/book.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(logRequest);

app.use('/api/books', booksRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Recurso no encontrado' }));

app.use(handleError);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
