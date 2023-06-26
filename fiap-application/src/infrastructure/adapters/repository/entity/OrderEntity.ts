export class OrderEntity implements Order {

    id: string;
    status: OrderStatus;
    customer: string;
    extraItems: string;
    items: OrderItem[];
    total: number;
    createdAt: Date;
    deliveredAt: Date;

}

export class OrderItemEntity implements OrderItem {

        product: Product;
        observation: string;

}