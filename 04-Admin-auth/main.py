# main.py

import os
from typing import Optional, List
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import motor.motor_asyncio

# For real-world apps, store secrets/credentials in environment variables or .env
MONGODB_URI = "mongodb+srv://arunponugoti2565:yFb6W7mPgFdogvsV@project2565.svvyp.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=project2565"

# Create FastAPI instance
app = FastAPI()

# Configure CORS so frontend (e.g., running on localhost:3000 or 8080) can call the backend
origins = [
    "http://localhost:3000",  # React dev server
    "http://localhost:8080",  # Possibly your existing local server
    # add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Motor (async) client for MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)
db = client.myDatabase  # The name "myDatabase" is from the URI, but can be customized
collection = db.modules  # We'll store our modules in a "modules" collection

# Optionally define a Pydantic model for read queries
class ModuleModel(BaseModel):
    module_title: str
    course_type: str
    description: str
    file_names: List[str]

@app.get("/")
def home():
    return {"message": "FastAPI is running on port 9002!"}


@app.post("/upload_module")
async def upload_module(
    module_title: str = Form(...),
    course_type: str = Form(...),
    description: str = Form(...),
    files: List[UploadFile] = File(None),
):
    """
    Endpoint to receive module info and files, then store them in MongoDB.
    """
    file_names = []
    if files:
        # If you want to store files locally, you could do so here:
        # For each file, save it or store it in the DB (GridFS if large).
        for file in files:
            contents = await file.read()
            # For demonstration, let's store the file name in DB, but not the content
            # If you need to store the binary content, consider GridFS or a separate collection
            file_names.append(file.filename)
            # If storing in the filesystem, you'd do something like:
            # with open(f"uploaded_files/{file.filename}", "wb") as f:
            #     f.write(contents)
    
    # Build a document to insert into MongoDB
    module_document = {
        "module_title": module_title,
        "course_type": course_type,
        "description": description,
        "file_names": file_names
    }

    # Insert the document into the "modules" collection
    result = await collection.insert_one(module_document)

    return {
        "message": "Module uploaded successfully!",
        "inserted_id": str(result.inserted_id),
        "file_names": file_names
    }


@app.get("/modules", response_model=List[ModuleModel])
async def list_modules():
    """
    Returns a list of all modules stored in MongoDB
    """
    modules_cursor = collection.find({})
    modules = []
    async for doc in modules_cursor:
        # Convert the MongoDB document to a Pydantic model-like dict
        modules.append({
            "module_title": doc.get("module_title", ""),
            "course_type": doc.get("course_type", ""),
            "description": doc.get("description", ""),
            "file_names": doc.get("file_names", []),
        })
    return modules


# Entry point to run the server on port 9002
# You can run via: uvicorn main:app --host 0.0.0.0 --port 9002 --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9002, reload=True)
