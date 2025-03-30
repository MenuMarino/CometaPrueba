from datetime import datetime
from app.schemas import Beer, Order, StockResponse
from typing import List, Dict

stock: Dict[str, Beer] = {
    "Corona": Beer(name="Corona", price=115, quantity=10),
    "Quilmes": Beer(name="Quilmes", price=120, quantity=10),
    "Club Colombia": Beer(name="Club Colombia", price=110, quantity=10),
}

orders: Dict[int, Order] = {}
order_id_counter = 1


def get_current_stock() -> StockResponse:
    return StockResponse(
        last_updated=datetime.now(), beers=[beer for beer in stock.values()]
    ).model_dump()


def create_order(order_data: Dict[str, int]) -> Order:
    global order_id_counter

    items = []
    for beer_name, quantity in order_data.items():
        if beer_name in stock:
            beer = stock[beer_name]
            if beer.quantity >= quantity:
                beer.quantity -= quantity
                items.append(
                    {"name": beer.name, "quantity": quantity, "price": beer.price}
                )
            else:
                raise ValueError(
                    f"Not enough stock for {beer_name}. Only {beer.quantity} left."
                )
        else:
            raise ValueError(f"Beer '{beer_name}' not found in stock.")

    order = Order(
        id=order_id_counter,
        created=datetime.now(),
        paid=False,
        subtotal=0,
        taxes=0,
        discounts=0,
        items=items,
    )

    subtotal = sum(
        [
            beer.price * item["quantity"]
            for item in items
            for beer in stock.values()
            if beer.name == item["name"]
        ]
    )
    order.subtotal = subtotal
    orders[order_id_counter] = order
    order_id_counter += 1

    return order


def get_orders() -> List[Order]:
    return list(orders.values())


def pay_order(order_id: int) -> Order:
    if order_id in orders:
        order = orders[order_id]
        order.paid = True
        return order
    else:
        raise ValueError(f"Order with ID {order_id} not found.")
