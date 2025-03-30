from pydantic import BaseModel
from datetime import datetime
from typing import List


class Beer(BaseModel):
    name: str
    price: int
    quantity: int


class Order(BaseModel):
    id: int
    created: datetime
    paid: bool
    subtotal: int
    taxes: int
    discounts: int
    items: List[Beer]


class StockResponse(BaseModel):
    last_updated: datetime
    beers: List[Beer]
