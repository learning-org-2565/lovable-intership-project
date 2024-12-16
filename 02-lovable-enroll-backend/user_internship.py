from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import uvicorn
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware

app = FastAPI()

# --- CORS Middleware Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin. Replace "*" with frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# --- MongoDB Connection ---
MONGO_URL = "mongodb+srv://arunponugoti2565:yFb6W7mPgFdogvsV@project2565.svvyp.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=project2565"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client["myDatabase"]  # Database name in MongoDB Atlas

# --- Data Models ---
class Internship(BaseModel):
    id: Optional[str] = None  # MongoDB document _id (string)
    title: str
    description: str
    price: float

class Enrollment(BaseModel):
    user_id: str
    internship_id: str

# --- Collections ---
internship_collection = db["internships"]
enrollment_collection = db["enrollments"]

# --- Routes ---

@app.get("/")
async def root():
    return {"message": "User/Internship Enrollment Microservice is running!"}

# 1. Create a new internship
@app.post("/internships")
async def create_internship(internship: Internship):
    result = await internship_collection.insert_one(internship.dict())
    created_internship = await internship_collection.find_one({"_id": result.inserted_id})
    created_internship["id"] = str(created_internship["_id"])
    del created_internship["_id"]
    return created_internship

# 2. List all internships
@app.get("/internships")
async def list_internships():
    internships_cursor = internship_collection.find({})
    internships = []
    async for i in internships_cursor:
        i["id"] = str(i["_id"])
        del i["_id"]
        internships.append(i)
    return internships

# 3. Enroll a user in an internship
@app.post("/enroll")
async def enroll_user(enrollment: Enrollment):
    print("Received payload:", enrollment.dict())  # Debugging payload
    result = await enrollment_collection.insert_one(enrollment.dict())
    created_enrollment = await enrollment_collection.find_one({"_id": result.inserted_id})
    created_enrollment["id"] = str(created_enrollment["_id"])
    del created_enrollment["_id"]
    return created_enrollment

# 4. Get all enrollments (for admin)
@app.get("/enrollments")
async def get_all_enrollments():
    enrollments_cursor = enrollment_collection.find({})
    enrollments = []
    async for e in enrollments_cursor:
        e["id"] = str(e["_id"])
        del e["_id"]
        enrollments.append(e)
    return enrollments

if __name__ == "__main__":
    uvicorn.run("user_internship:app", host="127.0.0.1", port=8000, reload=True)
