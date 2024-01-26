import OrderAdapter from 'src/core/application/adapter/OrderAdapter';
import { OrderItem } from 'src/core/domain/entities/Order';
import User from 'src/core/domain/entities/User';
import { OrderStatus } from 'src/core/domain/enums/OrderStatus';
import { ProductCategory } from 'src/core/domain/enums/ProductCategory';
import { CPF } from 'src/core/domain/valueObjects/Cpf';
import { Money } from 'src/core/domain/valueObjects/Money';
// Import necessary dependencies for testing (e.g., testing framework, mocks)

describe('OrderAdapter', () => {
  let price;
  let cpf;

  beforeEach(async () => {
    price = await Money.create(100);
    cpf = await CPF.create('12345678910');
  });

  describe('toDomain', () => {
    test('should convert OrderCreationDTO to Order', async () => {
      const orderCreationDTO = {
        items: [
          { productId: '1', observation: 'Test Observation', quantity: 1 },
          { productId: '2', observation: 'Test Observation 2', quantity: 2 },
        ],
        customerId: '42',
        extraItems: undefined,
      };
      const result = await OrderAdapter.toDomain(orderCreationDTO);

      const orderItemList = orderCreationDTO.items.map((item) => {
        return OrderItem.create(
          item.productId,
          item.observation,
          item.quantity,
        );
      });
      expect(result).toEqual({
        id: null,
        customer: new User(orderCreationDTO.customerId),
        deliveredAt: undefined,
        status: OrderStatus.RECEIVED,
        extraItems: undefined,
        total: undefined,
        items: orderItemList,
        createdAt: expect.any(Date),
      });
    });

    test('should convert OrderCreationDTO to Order with customer', async () => {
      const orderCreationDTO = {
        items: [
          { productId: '1', observation: 'Test Observation', quantity: 1 },
          { productId: '2', observation: 'Test Observation 2', quantity: 2 },
        ],
        customerId: undefined,
        extraItems: undefined,
      };
      const result = await OrderAdapter.toDomain(orderCreationDTO);

      const orderItemList = orderCreationDTO.items.map((item) => {
        return OrderItem.create(
          item.productId,
          item.observation,
          item.quantity,
        );
      });
      expect(result).toEqual({
        id: null,
        customer: null,
        deliveredAt: undefined,
        status: OrderStatus.RECEIVED,
        extraItems: undefined,
        total: undefined,
        items: orderItemList,
        createdAt: expect.any(Date),
      });
    });

    // Add more test cases for different scenarios and edge cases
  });

  describe('toDTO', () => {
    test('should create a valid OrderResponseDTO from an Order object', () => {
      const order = {
        id: '1',
        customer: {
          id: '42',
          email: 'test@test.com',
          name: 'test untario',
          cpf: cpf,
          phone: '123456789',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        deliveredAt: new Date(),
        extraItems: undefined,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: price,
              category: ProductCategory.SANDWICH,
              createdAt: new Date(),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: price,
      };
      const dto = OrderAdapter.toDTO(order);
      const itemsDTO = OrderAdapter.itemsToDTO(order.items);
      expect(dto).toEqual({
        id: order.id,
        customer: {
          id: order.customer.id,
          cpf: order.customer.cpf.value,
          email: order.customer.email,
          name: order.customer.name,
          phone: order.customer.phone,
        },
        createdAt: expect.any(Date),
        deliveredAt: expect.any(Date),
        extraItems: undefined,
        items: itemsDTO, // Assuming itemsToDTO returns a shallow copy of items
        status: 'RECEIVED',
        total: 100,
      });
    });

    it('should create a valid OrderResponseDTO with a null customer', () => {
      const order = {
        id: '1',
        customer: null,
        createdAt: new Date(),
        deliveredAt: new Date(),
        extraItems: null,
        items: [
          {
            product: {
              id: '3',
              name: 'test product',
              description: 'only unit test',
              imageUrl: 'http://imagetest.com.png',
              price: price,
              category: ProductCategory.SANDWICH,
              createdAt: new Date(),
            },
            observation: undefined,
            quantity: 1,
          },
        ],
        status: OrderStatus.RECEIVED,
        total: price,
      };
      const itemsDTO = OrderAdapter.itemsToDTO(order.items);
      const dto = OrderAdapter.toDTO(order);

      expect(dto).toEqual({
        id: order.id,
        customer: undefined,
        createdAt: expect.any(Date),
        deliveredAt: expect.any(Date),
        extraItems: null,
        items: itemsDTO, // Assuming itemsToDTO returns a shallow copy of items
        status: 'RECEIVED',
        total: 100,
      });
    });

    // Add more test cases for different scenarios and edge cases
  });

  // Add more test cases for other methods in the OrderAdapter class
});
