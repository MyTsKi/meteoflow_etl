# MeteoFlow 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

MeteoFlow is a personal full-stack project I built to automate weather data collection and visualize it in a clean, interactive dashboard. 

The main goal was to build a reliable ETL pipeline from scratch. I wanted to handle chronological data properly, avoiding common issues like overlapping forecasts or overloading the frontend with heavy data filtering.

## How it works under the hood

I split the project into three main pieces:

### 1. The Data Pipeline (Python)
A script that fetches hourly weather forecasts from the Open-Meteo API using `httpx` and `asyncio`. I used `pandas` to clean the JSON responses. 
* **The interesting part:** To avoid flooding the database with duplicate rows every time the script runs, I implemented an `UPSERT` logic (`ON CONFLICT DO UPDATE`) with SQLAlchemy. It updates existing hours with fresh forecasts and only inserts truly new data.

### 2. La API (Node.js & Express)
Una API REST ligera que sirve como un puente seguro hacia la base de datos.
* **Payload Optimizado:** Consulta la base de datos usando un límite estricto para evitar sobrecargar la memoria, devolviendo un arreglo limpio con el historial de datos meteorológicos.

### 3. El Dashboard (React & Vite)
La interfaz frontend donde los datos cobran vida.
* **Filtrado del lado del cliente:** Implementa un filtrado rápido de arreglos en JavaScript al vuelo (matemáticas con el objeto `Date`) para alternar al instante entre las vistas de 24 horas, 7 días y el historial completo, sin hacer peticiones de red redundantes al servidor.
* **Visuales:** Construido con Tailwind CSS y `Chart.js` para la gráfica de series de tiempo.
  
## Live Demo
Check out the live dashboard here: **https://meteoflow.vercel.app/**
