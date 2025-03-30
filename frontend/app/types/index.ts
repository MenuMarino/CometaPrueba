export interface Beer {
  name: string;
  price: number;
  quantity: number;
}

export interface Stock {
  last_updated: string;
  beers: Beer[];
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: OrderItem[];
}
