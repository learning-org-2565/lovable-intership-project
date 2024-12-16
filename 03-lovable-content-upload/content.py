# content.py
"""
Why creating this file?
- This file contains the user-facing routes. 
  For example, listing modules by course type.
"""

from fastapi import APIRouter, HTTPException
from typing import List, Dict

from db import database
from config import MODULES_COLLECTION

router = APIRouter(prefix="/content", tags=["content"])

@router.get("/{course_type}")
async def get_modules(course_type: str) -> List[Dict]:
    """
    Retrieve modules by course type (e.g., 'Basic', 'Intermediate', 'Advanced').
    This is a public endpoint, but in a real app you'd check if user 
    is enrolled in this course_type before showing modules.
    """
    modules_cursor = database[MODULES_COLLECTION].find({"course_type": course_type})
    modules = []
    async for doc in modules_cursor:
        doc["_id"] = str(doc["_id"])  # convert ObjectId to string
        modules.append(doc)

    if not modules:
        raise HTTPException(status_code=404, detail="No modules found for this course_type.")
    
    return modules
