import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderList from "../OrderList";

const mockOrders = [
  {
    id: 1,
    created: "2025-03-30T10:23:25.474652",
    paid: false,
    subtotal: 340,
    taxes: 0,
    discounts: 0,
    items: [
      { name: "Corona", price: 115, quantity: 2 },
      { name: "Club Colombia", price: 110, quantity: 1 },
    ],
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockOrders),
  })
) as jest.Mock;

describe("OrderList", () => {
  it("displays the list of orders", async () => {
    render(<OrderList />);

    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("$340"))).toBeInTheDocument();
  });

  it("allows opening the detail modal", async () => {
    render(<OrderList />);
    const verBtn = await screen.findByText("Ver detalle");

    fireEvent.click(verBtn);

    await waitFor(() => {
      expect(screen.getByText("Detalle de orden #1")).toBeInTheDocument();
    });
  });
});
