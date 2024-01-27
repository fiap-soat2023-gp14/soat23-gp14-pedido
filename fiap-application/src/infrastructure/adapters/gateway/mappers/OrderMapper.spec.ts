import { OrderMapper } from './OrderMapper';
import { OrderMock } from '../../../mocks/OrderMock';
import { Order } from '../../../../core/domain/entities/Order';
import { OrderEntityStatus } from '../enums/OrderEntityStatus';
import { OrderEntity } from '../entity/OrderEntity';
import { OrderStatus } from '../../../../core/domain/enums/OrderStatus';
import { Money } from '../../../../core/domain/valueObjects/Money';
import { CPF } from '../../../../core/domain/valueObjects/Cpf';

describe('OrderMapper', () => {
  describe('toEntity', () => {
    it('should convert an Order object to an OrderEntity object', async () => {
      const order: Order = await OrderMock.getOrder();

      const orderEntity = OrderMapper.toEntity(order);

      expect(orderEntity).toEqual({
        _id: order.id,
        customer: {
          _id: order.customer.id,
          name: order.customer.name,
          cpf: order.customer.cpf.value,
          email: order.customer.email,
          createdAt: order.customer.createdAt,
          phone: order.customer.phone,
          updatedAt: order.customer.updatedAt,
        },
        deliveredAt: order.deliveredAt,
        createdAt: order.createdAt,
        status: OrderEntityStatus[order.status],
        extraItems: order.extraItems,
        total: order.total.value,
        items: [
          {
            product: {
              _id: order.items[0].product.id,
              name: order.items[0].product.name,
              description: order.items[0].product.description,
              price: order.items[0].product.price.value,
              category: order.items[0].product.category,
              imageUrl: order.items[0].product.imageUrl,
              createdAt: order.items[0].product.createdAt,
            },
            observation: order.items[0].observation,
            quantity: order.items[0].quantity,
          },
        ],
      });
    });
  });

  describe('toDomain', () => {
    it('should convert an OrderEntity object to an Order object', async () => {
      const orderEntity: OrderEntity = OrderMock.getOrderEntity();

      const order = await OrderMapper.toDomain(orderEntity);

      expect(order).toEqual({
        id: orderEntity._id,
        customer: {
          id: orderEntity.customer._id,
          name: orderEntity.customer.name,
          email: orderEntity.customer.email,
          cpf: await CPF.create(orderEntity.customer.cpf),
          createdAt: orderEntity.customer.createdAt,
          phone: orderEntity.customer.phone,
          updatedAt: orderEntity.customer.updatedAt,
        },
        deliveredAt: orderEntity.deliveredAt,
        createdAt: orderEntity.createdAt,
        status: OrderStatus[OrderEntityStatus[orderEntity.status]],
        extraItems: orderEntity.extraItems,
        total: await Money.create(orderEntity.total),
        items: [
          {
            product: {
              id: orderEntity.items[0].product._id,
              name: orderEntity.items[0].product.name,
              description: orderEntity.items[0].product.description,
              price: await Money.create(orderEntity.items[0].product.price),
              category: orderEntity.items[0].product.category,
              imageUrl: orderEntity.items[0].product.imageUrl,
              createdAt: orderEntity.items[0].product.createdAt,
            },
            observation: orderEntity.items[0].observation,
            quantity: orderEntity.items[0].quantity,
          },
        ],
      });
    });
  });
});
