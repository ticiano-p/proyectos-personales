# 🏫 Proyecto Node.js - Plataforma de Gestión Escolar

Este es un proyecto que incluye un **backend en Node.js** y un **frontend en React**, diseñado para gestionar **usuarios**, **escuelas**, **anuncios** y realizar **pagos**. La plataforma implementa un sistema de control de acceso donde **solo los usuarios que han pagado pueden crear nuevas escuelas**.

---

## 🚀 Funcionalidades Principales

- ✍️ CRUD de **Usuarios**
- 🏫 CRUD de **Escuelas**
- 📢 CRUD de **Anuncios**
- 💳 Sistema de **Pagos**
- 🔒 Control de acceso basado en estado de pago del usuario

---

## 🖼️ Frontend con React

El frontend está desarrollado con **React** e incluye:

- Autenticación con JWT
- Formularios de registro, login y creación de escuelas
- Interfaz dinámica para visualizar anuncios y escuelas
- Integración con el backend mediante peticiones `fetch` 
- Gestión de rutas con **React Router**
- Manejo de estado con **useState**, **useContext**, etc.


## 🛠️ Tecnologías Usadas

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB 
  - JWT (para autenticación)
  - dotenv (variables de entorno)

- **Frontend**:
  - React
  - React Router
  - Context API
  - Tailwind CSS 
  - fetch 

---

## ✅ Requisitos para crear una Escuela

Antes de poder crear una escuela, el usuario debe:
1. Estar registrado y autenticado
2. Haber realizado un **pago exitoso**
3. Tener el estado de pago confirmado en su perfil

---

## 🔐 Seguridad

- Autenticación con **JWT**
- Rutas protegidas para creación y edición de recursos

---

## 📦 Instalación

### 📥 Clonar el repositorio

```bash
git clone https://github.com/leo-dillon/AplicacionesHibridas_PI.git
cd AplicacionesHibridas_PI
```
▶️ Para ejecutar el backend
``` bash

cd nodeapi
npm install
node app
```
💻 Para ejecutar el frontend
```bash

cd React
npm install
npm run dev
