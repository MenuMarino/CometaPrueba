from fastapi import APIRouter, HTTPException
from app.repositories import create_order, get_orders, pay_order
from app.schemas import Order
from typing import Dict, List

router = APIRouter()


@router.post("/orders", response_model=Order)
def create_new_order(order_data: Dict[str, int]):
    try:
        order = create_order(order_data)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/orders", response_model=List[Order])
def get_all_orders():
    return get_orders()


@router.patch("/orders/{order_id}", response_model=Order)
def pay_order_by_id(order_id: int):
    try:
        order = pay_order(order_id)
        return order
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
