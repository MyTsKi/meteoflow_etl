# pip install httpx
# Library to make async HTTP request 
import httpx 
# pip install asyncio
# Library to add async methods in python
import asyncio
# Library to process JSON code
import json
#pip install pandas
#Library Pandas to process data in DataFrame
import pandas as pd
# pip install sqlalchemy "psycopg[binary]"
from sqlalchemy import create_engine
# pip install python-dotenv
import os 
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Parameters for the Open-Meteo API
LATITUDE =  25.56
LONGITUDE = -103.50

async def extract_data_meteorologic():
    # Set API URL and assign the latitude and longitude
    url = f"https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"

    #httpx.AsyncClient() efficient conexion for multiple requests\
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()  # Check if the request was successful
            data = response.json()
            return data
        except Exception as exc:
            print (f"An error occurred while fetching data: {exc}")
            return None



async def main():
    # call the method to extract data from the API
    json_data = await extract_data_meteorologic()

    # If the data is extracted successfuly
    if json_data and "hourly" in json_data:
        data_for_hourly = json_data["hourly"]
        df = pd.DataFrame(data_for_hourly)
        df["time"] = pd.to_datetime(df["time"])
        # df["time"] = df["time"].dt.tz_localize("UTC").dt.tz_convert("America/Monterrey")

        # Connect to supabase
        string_connection = os.getenv("DATABASE_URL")
        #if dont have the string connection, print an error
        if not string_connection:
            print("String connection not found")
            return
        #if have the string connection, continue with the process
        engine = create_engine(string_connection)
        try:
            # Insert data into the database, if the table exist, append the data to the table, if not exist, create the table and insert the data
            df.to_sql("weather_history",engine,if_exists="append",index=False)
            print("Data inserted successfully")
        except Exception as exc:
            print (f"DataBase error: {exc}")

#  Block main to execute
if __name__ == "__main__":
    asyncio.run(main())
        