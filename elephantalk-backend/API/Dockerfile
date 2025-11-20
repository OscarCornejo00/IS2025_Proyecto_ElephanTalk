# Usa una imagen base con Node.js 20
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package.json ./
COPY yarn.lock ./

# Instala las dependencias de la aplicación
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . .

# Copia el archivo .env
COPY .env .env

# Compila el proyecto
RUN yarn build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Define el comando para correr la aplicación
CMD ["yarn", "start:prod"]
