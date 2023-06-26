interface OrderItem {
    product: Product;
    observation: string;
}

interface Order {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    customer: string; // TODO: change to Client
    total: number;
    extraItems: string; // TODO: verify whether we need to have condiments as extra items in a structured way
    createdAt: Date;
    deliveredAt: Date;
}