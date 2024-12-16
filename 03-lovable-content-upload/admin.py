# admin.py
"""
Why creating this file?
- This file contains routes for "admin-only" operations such as 
  uploading modules. We separate this from the user routes 
  for clarity and security.
"""

from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from typing import Optional
import uuid
import os

from config import MODULES_COLLECTION, USERS_COLLECTION, ADMIN_USERS
from db import database
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

# Temporary global dictionary to store the "logged-in" admin user
logged_in_admin = {"username": None}


async def verify_admin(username: str, password: str):
    """
    This function checks if the provided username/password 
    matches any of our known admin users in config.
    If valid, it returns True. Otherwise, raises HTTPException.
    """
    for admin in ADMIN_USERS:
        if admin["username"] == username and admin["password"] == password:
            return True
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid admin credentials"
    )

class AdminLoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def admin_login(admin_request: AdminLoginRequest):
    """
    Admin login endpoint. 
    Once verified, we store the username in the `logged_in_admin` dictionary.
    """
    await verify_admin(admin_request.username, admin_request.password)
    logged_in_admin["username"] = admin_request.username
    return {"message": f"Admin {admin_request.username} logged in successfully."}



@router.post("/logout")
async def admin_logout():
    """
    Logs out the current admin.
    """
    logged_in_admin["username"] = None
    return {"message": "Admin logged out."}


@router.post("/upload-module")
async def upload_module(
    course_type: str = Form(...),
    module_title: str = Form(...),
    module_content: str = Form(...),
    image: Optional[UploadFile] = File(None),
):
    """
    Upload a new module to the database. 
    Requires the admin to be logged in.
    """
    # Check if admin is logged in
    if not logged_in_admin["username"]:
        raise HTTPException(status_code=401, detail="Not logged in as admin.")

    # 1. Handle the image if provided
    image_url = None
    if image:
        # Generate a unique filename
        unique_name = f"{uuid.uuid4()}_{image.filename}"
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)  # ensure uploads folder exists
        file_path = os.path.join(upload_dir, unique_name)

        # Save file locally
        with open(file_path, "wb") as f:
            f.write(image.file.read())

        image_url = file_path  # store local path in DB

    # 2. Insert module document into MongoDB
    new_module = {
        "course_type": course_type,
        "title": module_title,
        "content": module_content,
        "image_url": image_url
    }
    result = await database[MODULES_COLLECTION].insert_one(new_module)

    return {
        "message": "Module uploaded successfully",
        "module_id": str(result.inserted_id)
    }
