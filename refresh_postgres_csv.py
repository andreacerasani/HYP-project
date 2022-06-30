import psycopg2
import os
from psycopg2 import sql

# Connect to your postgres DB
conn = psycopg2.connect("dbname=hyp user=postgres password=postgres")
directory = "./src/assets/csv"
file_order = ["images.csv", "contacts.csv", "events.csv", "service_types.csv", "service_points.csv", "itineraries.csv", "pois.csv", "pois_images.csv", "involve.csv", "host.csv", "events_images.csv"]
# Open a cursor to perform database operations
cur = conn.cursor()
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
