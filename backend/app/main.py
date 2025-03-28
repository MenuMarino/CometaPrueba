from fastapi import FastAPI
from app.routers import stock, orders

app = FastAPI(title="Beer Order API")

app.include_router(stock.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
