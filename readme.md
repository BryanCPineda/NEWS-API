# 📰 API Noticias -

Este proyecto es una API construida con **TypeScript + Express** que permite consumir, transformar y consultar noticias obtenidas de la API pública del periódico **El País**. Las noticias se almacenan en una base de datos MongoDB y se exponen endpoints REST para su uso y prueba.

---

## 🚀 Despliegue

La API está desplegada en **Render** y disponible en la siguiente URL:

📡 [API](https://news-api-isyo.onrender.com/api/v1/news)  
📄 Swagger Docs: [Swagger](https://news-api-isyo.onrender.com/docs/#/)

---

## 🧱 Tecnologías utilizadas

- TypeScript
- Express.js
- MongoDB (Atlas)
- Axios
- Helmet (seguridad)
- Express-rate-limit (limitación de uso)
- Swagger (documentación de la API)
- Winston + Morgan (logs)

---

## 📦 Instalación local

```
git clone [Repositorio](https://github.com/BryanCPineda/NEWS-API/)
cd news-api
npm install
npm run dev
```

Crear un archivo .env con las siguientes variables:

```
PORT=3000
DB_USER=tu_usuario_mongo
DB_PASSWORD=tu_password
DB_NAME=nombre_bd
DB_CLUSTER=tu_cluster.mongodb.net
NODE_ENV=development
```

# 📘 Endpoints disponibles

## 🔁 POST /api/v1/news/fetch

Guarda las noticias actuales de El País en la base de datos.

Rate limit: 2 solicitudes por hora por IP

## 🔍 GET /api/news

Obtiene todas las noticias almacenadas.

Rate limit: 100 solicitudes por cada 15 min por IP

## 🔍 GET /api/news/:id

Busca una noticia por su ID en la base de datos.

Rate limit: 100 solicitudes por cada 15 min por IP

## 🔍 GET /api/news/search?title=example&from=2023-01-01&to=2023-12-31&page=1&limit=20

Busca noticias que contengan una palabra clave en el título.

Rate limit: 30 solicitudes cada 5 minutos por IP

## 🗑 DELETE /api/news/:id

Elimina una noticia por su ID.

Rate limit: 2 solicitudes cada 30 minutos por IP

# 📄 GET /docs

Accede a la documentación Swagger para explorar y probar los endpoints.

# 🔒 Seguridad implementada

**helmet**: cabeceras HTTP seguras

**express-rate-limit**: limita el uso de endpoints

**cors**: habilitado para whitenlist IPs

**Logs de acceso y errores con morgan y winston**

## 🧪 Scripts útiles

```

npm run dev # Levanta el servidor en modo desarrollo
npm run build # Compila TypeScript en dist/
npm start # Ejecuta la versión compilada
npm run lint # Corre ESLint para análisis de código
npm run format # Formatea el código con Prettier

```

# 🧑‍💻 Autor

Creado por **Camilo Pineda**

[Linkedin](https://www.linkedin.com/in/bryancamilopineda/) | [GitHub](https://github.com/BryanCPineda)

Copyright (c) 2025 Bryan Camilo Pineda
