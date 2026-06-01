# pip install httpx
import httpx 
# pip install asyncio
import asyncio
import json
# pip install pandas
import pandas as pd
# pip install sqlalchemy "psycopg[binary]"
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import insert # <-- NUEVA IMPORTACIÓN CRÍTICA
import os 
from dotenv import load_dotenv

load_dotenv()

LATITUDE =  25.56
LONGITUDE = -103.50

async def extract_data_meteorologic():
    url = f"https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status() 
            data = response.json()
            return data
        except Exception as exc:
            print (f"An error occurred while fetching data: {exc}")
            return None

# <-- NUEVA FUNCIÓN: El motor de Upsert -->
def upsert_method(table, conn, keys, data_iter):
    # Convertimos los datos de Pandas a un formato que SQLAlchemy entienda
    data = [dict(zip(keys, row)) for row in data_iter]
    
    # Preparamos la instrucción INSERT estándar de PostgreSQL
    insert_stmt = insert(table.table).values(data)
    
    # Le decimos qué hacer si hay un conflicto (si la hora ya existe):
    # Actualiza todas las columnas (temperatura, humedad, etc.) excepto la hora misma.
    update_columns = {col.name: col for col in insert_stmt.excluded if col.name != 'time'}
    
    # Ensamblamos la instrucción final: ON CONFLICT DO UPDATE
    upsert_stmt = insert_stmt.on_conflict_do_update(
        index_elements=['time'],
        set_=update_columns
    )
    
    # Ejecutamos la consulta
    conn.execute(upsert_stmt)

async def main():
    json_data = await extract_data_meteorologic()

    if json_data and "hourly" in json_data:
        data_for_hourly = json_data["hourly"]
        df = pd.DataFrame(data_for_hourly)
        df["time"] = pd.to_datetime(df["time"])

        string_connection = os.getenv("DATABASE_URL")
        if not string_connection:
            print("String connection not found")
            return
            
        engine = create_engine(string_connection)
        
        try:
            # <-- EL CAMBIO MÁGICO: Le pasamos nuestra nueva función en el parámetro 'method' -->
            df.to_sql(
                "weather_history",
                engine,
                if_exists="append",
                index=False,
                method=upsert_method
            )
            print("Datos sincronizados (Upsert) exitosamente.")
        except Exception as exc:
            print (f"DataBase error: {exc}")

if __name__ == "__main__":
    asyncio.run(main())