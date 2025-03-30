import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateOrderModal from "../CreateOrderModal";

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

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

describe("CreateOrderModal", () => {
  it("displays beers with stock and disables those without stock", async () => {
    render(
      <CreateOrderModal onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(await screen.findByText((content) => content.includes("Corona"))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("Quilmes"))).toBeInTheDocument();
    expect(screen.getByLabelText("Quilmes ($120) - Stock: 0")).toBeDisabled();
  });

  it("validates that at least one beer is selected", async () => {
    render(
      <CreateOrderModal onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    const confirmBtn = await screen.findByText("Confirmar");
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Debes seleccionar al menos una cerveza.")
      ).toBeInTheDocument();
    });
  });
});
