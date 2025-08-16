# 🎉 Tienda Online de Artículos de Fiesta

Este proyecto es una **plataforma eCommerce desarrollada en Laravel** para la venta de artículos de fiesta.  
Incluye integración con **Mercado Pago**, **sistema de administración con ABM**, **filtros avanzados de productos**, **notificaciones por email**, y un **blog con restricciones de edad**.

---

## 🚀 Características principales

- 🛒 **Carrito de compras** con persistencia de productos.
- 💳 **Integración con Mercado Pago**:
  - Pagos con tarjeta de crédito, débito y otros medios.
  - Confirmación automática de pagos.
- 🔑 **Módulo de administración (ABM)**:
  - Alta, baja y modificación de productos.
  - Gestión de usuarios.
  - Control de pedidos y ventas.
- 🔎 **Filtros de búsqueda**:
  - Por categoría
- 📧 **Notificaciones por Email**:
  - Al comprador: confirmación de la compra con los datos del envío.
  - Al vendedor: aviso con la información del pedido.
- 📰 **Blog con restricciones de edad**:
  - Control de acceso para mayores de edad en artículos específicos.
- 📦 **Gestión de envíos** con datos completos del cliente.

---

## 🛠️ Tecnologías utilizadas

- [Laravel 10](https://laravel.com/)
- [PHP 8+](https://www.php.net/)
- [MySQL](https://www.mysql.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Mercado Pago SDK](https://www.mercadopago.com.ar/developers/)
- [Composer](https://getcomposer.org/)
- [Blade Templates](https://laravel.com/docs/master/blade)

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio y entra al proyecto
```bash
git clone https://github.com/ticiano-p/proyectos-personales.git
cd eCommerceEventos
```
### 2. Instalar dependencias
```bash
composer install
npm install && npm run dev
```
### 3. Configurar el entorno
Copiar el archivo .env.example a .env y ajustar las variables necesarias:
### 4. Migrar base de datos
```bash
php artisan migrate --seed
```
### 6. Levantar el servidor
```bash
php artisan serve
```
