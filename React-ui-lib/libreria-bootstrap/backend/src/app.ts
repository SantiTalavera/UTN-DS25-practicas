import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';
import { booksRoutes } from './routes/book.routes';
import { userRoutes } from './routes/user.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const corseOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corseOptions));
app.use(express.json());
app.use(logRequest);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', booksRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Recurso no encontrado' }));

app.use(handleError);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
