from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .config import settings
from .routers import auth, rfqs, quotations

Base.metadata.create_all(bind=engine)

app = FastAPI(title="B2B RFQ Marketplace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(rfqs.router, prefix="/api/rfqs", tags=["rfqs"])
app.include_router(quotations.router, prefix="/api", tags=["quotations"])

@app.get("/")
def root():
    return {"message": "B2B RFQ Marketplace API"}