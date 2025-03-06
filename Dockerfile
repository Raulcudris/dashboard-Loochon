# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para la instalación
COPY package.json package-lock.json ./

# Instala las dependencias de producción
RUN npm install --production

# Copia el resto de los archivos
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start"]
