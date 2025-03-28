from fastapi import APIRouter
from app.repositories import get_current_stock

router = APIRouter()


@router.get("/stock", response_model=dict)
def get_stock():
    return get_current_stock()
