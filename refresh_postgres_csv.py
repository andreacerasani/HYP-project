import psycopg2
import os
from psycopg2 import sql

# Connect to your postgres DB
conn = psycopg2.connect("dbname=hyp user=postgres password=postgres")
directory = "./src/assets/csv"

# Open a cursor to perform database operations
cur = conn.cursor()

for filename in os.listdir(directory):
    # Removing .csv extension
    table = os.path.splitext(filename)[0]
    # Generate filepath
    filepath = os.path.join(directory, filename)

    cur.execute(sql.SQL("delete from {}").format(sql.Identifier(table)))
    print("Deleted table ", table)

    # Execute a query
    with open(filepath, 'r') as f:
        next(f)
        cur.copy_from(f, table, sep=';')

    print("Copied from ", filepath, "\n")

    conn.commit()