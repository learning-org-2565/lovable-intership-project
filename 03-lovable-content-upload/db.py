# db.py
"""
Why creating this file?
- db.py handles the MongoDB connection using Motor (async driver).
- This keeps database logic separate from your main code, 
  making it easier to maintain.
"""

import motor.motor_asyncio
from config import MONGODB_URI, DB_NAME

# Create the Motor client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

# Our main database
database = client[DB_NAME]
