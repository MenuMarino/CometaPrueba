from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)


def get_beer_quantity(stock, beer_name):
    for beer in stock["beers"]:
        if beer["name"] == beer_name:
            return beer["quantity"]
    return 0


def test_create_order():
    initial_stock = client.get("/api/stock").json()
    initial_corona_quantity = get_beer_quantity(initial_stock, "Corona")
    initial_colombia_quantity = get_beer_quantity(initial_stock, "Club Colombia")

    order_data = {"Corona": 2, "Club Colombia": 1}
    response = client.post("/api/orders", json=order_data)

    assert response.status_code == 200
    assert "created" in response.json()
    assert response.json()["paid"] == False

    final_stock = client.get("/api/stock").json()
    final_corona_quantity = get_beer_quantity(final_stock, "Corona")
    final_colombia_quantity = get_beer_quantity(final_stock, "Club Colombia")

    assert final_corona_quantity == initial_corona_quantity - 2
    assert final_colombia_quantity == initial_colombia_quantity - 1
