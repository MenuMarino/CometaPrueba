import { render, screen, waitFor } from "@testing-library/react";
import StockList from "../StockList";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        last_updated: "2025-03-30T10:21:41.452832",
        beers: [
          { name: "Corona", price: 115, quantity: 2 },
          { name: "Quilmes", price: 120, quantity: 0 },
        ],
      }),
  })
) as jest.Mock;

describe("StockList", () => {
  it("renders beers from stock", async () => {
    render(<StockList />);

    await waitFor(() => {
      expect(screen.getByText("Corona")).toBeInTheDocument();
      expect(screen.getByText("Quilmes")).toBeInTheDocument();
      expect(screen.getByText("$115")).toBeInTheDocument();
    });
  });

  it("displays an error message if fetch fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<StockList />);

    await waitFor(() => {
      expect(
        screen.getByText("No se pudo cargar el stock.")
      ).toBeInTheDocument();
    });
  });
});
