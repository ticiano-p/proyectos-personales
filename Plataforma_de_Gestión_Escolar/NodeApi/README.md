# 🏫 Proyecto Node.js - Plataforma de Gestión Escolar

Este es un proyecto backend desarrollado con **Node.js** que permite gestionar **usuarios**, **escuelas**, **anuncios** y realizar **pagos**. La plataforma implementa un sistema de control de acceso donde **solo los usuarios que han pagado pueden crear nuevas escuelas**.

## 🚀 Funcionalidades Principales

- ✍️ CRUD de **Usuarios**
- 🏫 CRUD de **Escuelas**
- 📢 CRUD de **Anuncios**
- 💳 Sistema de **Pagos**
- 🔒 Control de acceso basado en estado de pago del usuario

---

## 🛠️ Tecnologías Usadas

- Node.js
- Express.js
- MongoDB / Mongoose (o la base de datos que estés usando)
- JWT (para autenticación)
- dotenv (variables de entorno)

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
- Middleware que verifica si el usuario ha pagado antes de permitir crear escuelas

---

## 📦 Instalación

```bash
git clone https://github.com/leo-dillon/AplicacionesHibridas_PI.git
cd AplicacionesHibridas_PI
npm install
npm start


