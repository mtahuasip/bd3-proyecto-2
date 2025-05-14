# Proyecto 2: Base de Datos 3

Este proyecto consiste en una aplicación web de arquitectura full-stack que utiliza **Flask RESTx** en el backend y **Next.js 15** en el frontend. La base de datos principal es **MongoDB**, con **Redis** como sistema de caché para mejorar el rendimiento de las consultas.

---

## Clonar el repositorio

```bash
git clone https://github.com/mtahuasip/bd3-proyecto-2.git
```

---

## 📦 Instalación del Servidor (Backend)

Ubicación: `/backend`
Framework: **Flask RESTx**

### ✅ Requisitos

- Python 3.10 o superior

- MongoDB 8.0

- Redis 7.0

- pip / virtualenv (recomendado)

### ⚙️ Instalación

1. Clonar el repositorio (si no lo hiciste aún)
   
   ```bash
   git clone https://github.com/mtahuasip/bd3-proyecto-2.git
   ```

2. Navegar al directorio del backend:
   
   ```bash
   cd bd3-proyecto-2/backend
   ```

3. Crear y activar un entorno virtual:
   
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

4. Instalar dependencias:
   
   ```bash
   pip install -r requirements.txt
   ```

5. Configurar las variables de entorno:
   
   - Cambiar el nombre o copiar el archivo `.env.example` a `.env`
   
   - Configurar todas las variables de entorno

6. Iniciar el servidor Flask:
   
   ```bash
   python app.py
   ```

---

## 🖥️ Instalación del Cliente (Frontend)

Ubicación: `/frontend`
Framework: **Next.js 15**

### ✅ Requisitos

- Node.js 20 o superior

- npm, pnpm o yarn

### ⚙️ Instalación

1. Navegar al directorio del frontend:
   
   ```bash
   cd bd3-proyecto-2/frontend
   ```

2. Instalar dependencias:
   
   ```bash
   npm install
   ```

3. Configurar las variables de entorno:
   
   - Cambiar el nombre o copiar el archivo `env` a `.env`
   
   - Configurar todas las variables de entorno

4. Levantar el servidor de desarrollo:
   
   ```bash
   npm run dev
   ```

---

## 🚀 Descripción general

- **Backend**: Exposición de una API RESTful usando Flask y Flask-RESTx. Integra MongoDB como base de datos principal y Redis para almacenamiento en caché.

- **Frontend**: Aplicación React SSR/SPA moderna con Next.js 15, consumo directo de la API.

---
