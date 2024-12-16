from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from admin import router as admin_router
from content import router as content_router

app = FastAPI(title="Admin Content Management")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Allow all origins; restrict in production for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods: POST, GET, etc.
    allow_headers=["*"],  # Allow all headers
)

# Include our routers
app.include_router(admin_router)
app.include_router(content_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=9001, reload=True)
