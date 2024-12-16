# config.py
"""
Why creating this file?
- config.py holds all configuration details like DB URI, 
  admin credentials, etc. It's good practice to keep them 
  in one place, so your code is more maintainable.
"""

MONGODB_URI = "mongodb+srv://arunponugoti2565:yFb6W7mPgFdogvsV@project2565.svvyp.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=project2565"

# Default admin users
ADMIN_USERS = [
    {"username": "arun",   "password": "ar1481un"},
    {"username": "admin2", "password": "password2"}
]

# The name of the MongoDB database we'll use
DB_NAME = "ContentManagementDB"

# The name of the collection that stores modules
MODULES_COLLECTION = "modules"

# The name of the collection that stores user info or admin info
USERS_COLLECTION = "users"
