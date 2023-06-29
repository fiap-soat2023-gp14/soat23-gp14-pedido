export class OrderItemCreationDTO {
  productId: string;
  quantity: number;
  observation?: string;
}

export class OrderCreationDTO {
  customer: string;
  items: OrderItemCreationDTO[];
  extraItems?: string;
}
