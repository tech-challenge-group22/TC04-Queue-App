import { Given, When, Then } from "@cucumber/cucumber";
import * as sinon from "sinon";
import assert from "assert";
import { GetOrderQueueUseCase } from "../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue";
import { GetOrderQueueOutputDTO } from "../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueueDTO";

let result: GetOrderQueueOutputDTO;

const mockOrderQueue = {
	id: "123456",
	order_id: 1,
	status_queue: "concluido",
	waiting_time: "500",
	orderDate: "11/07/2023",
};

const QueueGatewayMock = {
	getOrderQueue: sinon.stub().resolves([mockOrderQueue]),
	getOrderQueueStatus: sinon.stub(),
	updateOrderQueue: sinon.stub(),
	add: sinon.stub(),
	beginTransaction: sinon.stub(),
	commit: sinon.stub(),
	rollback: sinon.stub(),
};

const mockGetOrderQueue: GetOrderQueueOutputDTO = {
	hasError: false,
	result: [mockOrderQueue],
};

Given("inicio a listagem de queue sem passar ID", async function () {
	const getOrderUseCase = new GetOrderQueueUseCase();
	return getOrderUseCase;
});

When("eu busco pela informacao de pedidos sem passar o id", async function () {
	result = await GetOrderQueueUseCase.execute({}, QueueGatewayMock);
	return result;
});

Then("o resultado deve ser de sucesso", function () {
	// Comparação usando assert.deepStrictEqual
	assert.deepStrictEqual(
		result.hasError,
		false,
		"O campo hasError deve ser false"
	);
	assert.deepStrictEqual(
		result.result,
		[mockOrderQueue],
		"O campo result deve corresponder ao mockOrderQueue"
	);
});
