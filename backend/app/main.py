from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import stock, orders

app = FastAPI(title="Beer Order API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
