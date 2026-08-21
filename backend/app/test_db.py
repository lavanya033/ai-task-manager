from app.database import engine


try:
    connection = engine.connect()
    print("MySQL connected successfully!")
    connection.close()

except Exception as error:
    print("Database connection failed:")
    print(error)