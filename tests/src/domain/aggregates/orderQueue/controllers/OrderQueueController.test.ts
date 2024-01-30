import { OrderQueueController } from "../../../../../../src/domain/aggregates/orderQueue/controllers/OrderQueueController";
import { GetOrderQueueUseCase } from "../../../../../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue";

jest.mock(
  "../../../../../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue"
);

jest.mock("@aws-sdk/lib-dynamodb", () => ({
    DynamoDBDocument: {
      from: jest.fn(() => ({
        put: jest.fn().mockResolvedValue({
          Items: [
            {
              order_id: 123,
              status_queue: "status",
              orderDate: "2024-01-29",
              waiting_time: "00:05:00",
              id: "12345",
            },
          ],
        }),
      })),
    },
  }));

describe("getOrderQueue", () => {
  it("should call GetOrderQueueUseCase", async () => {
    const orderId = 123;
    await OrderQueueController.getOrderQueue(orderId);

    // Assert that GetOrderQueueUseCase.execute was called with the correct input
    expect(GetOrderQueueUseCase.execute).toHaveBeenCalledWith(
      { id: orderId }, expect.anything()
    );
  });

  it("should call moveNext", async () => {
    const orderId = 123;
    await OrderQueueController.moveNext(orderId);

    // Assert that GetOrderQueueUseCase.execute was called with the correct input
    expect(GetOrderQueueUseCase.execute).toHaveBeenCalledWith(
      { id: orderId },
      expect.anything()
    );
  });

  it("should call newOrderQueue", async () => {
    const orderId = 123;
    await OrderQueueController.newOrderQueue(orderId);

    // Assert that GetOrderQueueUseCase.execute was called with the correct input
    expect(GetOrderQueueUseCase.execute).toHaveBeenCalledWith({ id: orderId }, expect.anything());
  });

});
