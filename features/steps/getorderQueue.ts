import { Given, When, Then } from "@cucumber/cucumber";
import * as sinon from "sinon";
import assert from "assert";
import { GetOrderQueueUseCase } from "../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue";
import { GetOrderQueueOutputDTO } from "../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueueDTO";

let result: GetOrderQueueOutputDTO;

const queue1 = {
	id: "123456",
	order_id: 1,
	status_queue: "concluido",
	waiting_time: "500",
	orderDate: "11/07/2023",
};
const queue2 = {
	id: "123457",
	order_id: 2,
	status_queue: "concluido",
	waiting_time: "600",
	orderDate: "12/07/2023",
};

Given("inicio a listagem de queue", () => {
	const getOrderUseCase = new GetOrderQueueUseCase();
	return getOrderUseCase;
});

When("eu busco pela informacao de pedidos sem passar o id", async () => {
	const QueueGatewayMock = {
		getOrderQueue: sinon.stub().resolves([queue1, queue2]),
		getOrderQueueStatus: sinon.stub(),
		updateOrderQueue: sinon.stub(),
		add: sinon.stub(),
		beginTransaction: sinon.stub(),
		commit: sinon.stub(),
		rollback: sinon.stub(),
	};

	result = await GetOrderQueueUseCase.execute({}, QueueGatewayMock);
	return result;
});

Then("o resultado deve ser de sucesso", () => {
	assert.deepStrictEqual(result.hasError, false);
});

Then("deve retornar dois itens", () => {
	assert.equal(result.result?.length, 2);
});

When(
	"eu busco pela informacao de pedidos passando o id {int} como parametro",
	async (int: number) => {
		const QueueGatewayMock = {
			getOrderQueue: sinon.stub().resolves([queue1]),
			getOrderQueueStatus: sinon.stub(),
			updateOrderQueue: sinon.stub(),
			add: sinon.stub(),
			beginTransaction: sinon.stub(),
			commit: sinon.stub(),
			rollback: sinon.stub(),
		};
		result = await GetOrderQueueUseCase.execute(
			{ id: int },
			QueueGatewayMock
		);
		return result;
	}
);

When(
	"eu busco pela informacao de pedidos passando o id {int} não existente como parametro",
	async (int: number) => {
		const QueueGatewayMock = {
			getOrderQueue: sinon.stub().resolves([]),
			getOrderQueueStatus: sinon.stub(),
			updateOrderQueue: sinon.stub(),
			add: sinon.stub(),
			beginTransaction: sinon.stub(),
			commit: sinon.stub(),
			rollback: sinon.stub(),
		};

		result = await GetOrderQueueUseCase.execute(
			{ id: int },
			QueueGatewayMock
		);
		return result;
	}
);

When(
	"eu busco pela informacao de pedidos e existe erro na conexão com o banco de dados",
	async () => {
		const QueueGatewayMock = {
			getOrderQueue: sinon.stub().throws(new Error("Simulando erro")),
			getOrderQueueStatus: sinon.stub(),
			updateOrderQueue: sinon.stub(),
			add: sinon.stub(),
			beginTransaction: sinon.stub(),
			commit: sinon.stub(),
			rollback: sinon.stub(),
		};

		result = await GetOrderQueueUseCase.execute({}, QueueGatewayMock);
		return result;
	}
);

Then("o resultado deve retornar erro", () => {
	assert.deepStrictEqual(result.hasError, true);
});

Then("deve retornar um item", () => {
	assert.equal(result.result?.length, 1);
});
