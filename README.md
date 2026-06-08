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

### 2. The API (Node.js & Express)
A lightweight REST API serving as a secure bridge to the database.
* **Optimized Payload:** Queries the database using a strict limit to prevent massive memory overhead, returning a clean array of historical weather data.

### 3. The Dashboard (React & Vite)
The frontend interface where the data comes to life.
* **Client-Side Filtering:** Implements fast, on-the-fly JavaScript array filtering (`Date` object math) to instantly toggle between 24-hour, 7-day, and full-history views without triggering redundant network requests.
* **Visuals:** Built with Tailwind CSS and `Chart.js` for the time-series graph.

## Live Demo
Check out the live dashboard here: **https://meteoflow.vercel.app/**

## Prerequisites to running the project locally

### PostgreSQL
Make sure your PostgreSQL database has the `time` column set as the Primary Key for the Python upsert logic to work:

"ALTER TABLE weather_history ADD PRIMARY KEY (time);"

### Python

Install the required libraries

"pip install httpx pandas sqlalchemy "psycopg[binary]" python-dotenv"

Run the ETL script to populate your database

"python main.py"

### Backend Node

"cd backend"

Install Express, pg, cors, and dotenv

"pnpm install"

Start the development server

"pnpm run dev"

### Frontend React

"cd frontend"

Install Vite, React, TailwindCSS, and Chart.js

pnpm install

Start the development server

pnpm run dev