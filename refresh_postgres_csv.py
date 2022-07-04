import psycopg2
import os
from psycopg2 import sql

# Connect to your postgres DB

############### DEVELOPMENT ###############
conn = psycopg2.connect("dbname=hyp user=postgres password=postgres")
cur = conn.cursor()

############### PRODUCTION ################
###### hype-project
# conn = psycopg2.connect("postgres://nafvdfbljgnzzg:adaee8f8a86a01de1a92a3f727c323b03eef292b80624f5ddde41316bb730f3e@ec2-54-228-32-29.eu-west-1.compute.amazonaws.com:5432/da71int9ee1nqm", sslmode='require')
###### visitvenice
# conn = psycopg2.connect("postgres://qhwwutikrbyqnd:a90f530c02ffec2dc949cea806c947c81a76fc557073d9f7ba84303e3296f965@ec2-3-248-121-12.eu-west-1.compute.amazonaws.com:5432/d7th3tpiqogeai", sslmode='require')
# cur = conn.cursor()
# cur.execute("SET DateStyle='dmy'")


directory = "./src/assets/csv"
file_order = ["images.csv", "contacts.csv","pois.csv", "events.csv", "service_types.csv", "service_points.csv", "itineraries.csv",  "pois_images.csv", "involve.csv", "events_images.csv"]
# Open a cursor to perform database operations
# cur.execute('SET DateStyle = "ISO, DMY";')
for filename in file_order:
    # Removing .csv extension
    table = os.path.splitext(filename)[0]
    # Generate filepath
    filepath = os.path.join(directory, filename)

    cur.execute(sql.SQL("delete from {}").format(sql.Identifier(table)))
    print("Deleted table ", table)

    # Execute a query
    with open(filepath, 'r', encoding='utf-8') as f:
        next(f)
        cur.copy_from(f, table, sep=';', null='NULL')

    print("Copied from ", filepath, "\n")

    conn.commit()
