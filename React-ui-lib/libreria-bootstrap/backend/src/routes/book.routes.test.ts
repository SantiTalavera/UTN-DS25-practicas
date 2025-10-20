import request from 'supertest' ;
import { app } from '../app' ; // La app de Express

describe ('GET /api/books', () => {
    let token: string ;
        beforeAll (async () => {
            const res = await request(app)
            .post('/api/auth/login')
            .send({ email: 'santi@gmail.com' , password: 'PruebaJWT' });
            token = res.body.data.token;
        });
        test('debe retornar lista de libros', async () => {
            // ACT: Hacer petición al endpoint
            const response = await request(app)
            .get('/api/books' )
            .set('Authorization', `Bearer ${token}`);
            // ASSERT: Verificar múltiples aspectos
            expect (response .status).toBe(200);
            expect (response .body.books).toBeInstanceOf (Array);
            expect (response .body.books.length).toBeGreaterThan (0);
            expect (response .body.books[0]).toHaveProperty ('titulo');
            expect (response .body.books[0]).toHaveProperty ('autor');
        });
        test('debe retornar 404 para libro inexistente' , async () => {
            const response = await request(app)
            .get('/api/books/99999')
            .set('Authorization' , `Bearer ${token}`);
            expect (response .status).toBe(404);
        });
});