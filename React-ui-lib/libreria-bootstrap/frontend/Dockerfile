# Frontend Dockerfile
FROM node:20-alpine
# Directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar manifiestos de dependencia 
COPY package.json package-lock.json ./
# Instalar dependencias en la imagen
RUN npm install
# Copiar el resto del código fuente
COPY . .
# Exponer el puerto que la app escucha
EXPOSE 5173
# Esta variable ayuda a que la recarga en caliente (HMR) funcione bien en Docker
ENV CHOKIDAR_USEPOLLING=true
# Ejecución del servidor de desarrollo de Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]