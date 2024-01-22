import { Given, Then } from "@cucumber/cucumber";
import * as sinon from "sinon";
import assert from "assert";
import IOrderQueueGateway from "../../../src/domain/aggregates/orderQueue/core/ports/IOrderQueueGateway";
import { MoveNextUseCase } from "../../../src/domain/aggregates/orderQueue/usecases/moveNext/MoveNext";

Given(
	"Inicio o moveNext passando o id {int}",
	async function (this: any, int: number) {
		const MoveNextGatewayMock: IOrderQueueGateway = {
			getOrderQueue: sinon.stub().resolves([]),
			getOrderQueueStatus: sinon.stub().resolves([]),
			updateOrderQueue: sinon.stub(),
			add: sinon.stub(),
			beginTransaction: sinon.stub(),
			commit: sinon.stub(),
			rollback: sinon.stub(),
		};

		const setupGatewayMock = (orderId: number) => {
			let mockGetOrderQueue;
			let mockGetOrderQueueStatus;

			if (orderId === 1) {
				mockGetOrderQueue = {
					id: "102030",
					order_id: orderId,
					status_queue: "Em preparação",
					orderDate: "22/01/2024",
				};

				mockGetOrderQueueStatus = {
					id: "102030",
					order_id: orderId,
					status_queue: "Aprovado",
					orderDate: "22/01/2024",
				};
			}

			if (orderId === 2) {
				mockGetOrderQueue = {
					id: "102030",
					order_id: orderId,
					status_queue: "Finalizado",
					orderDate: "22/01/2024",
				};

				mockGetOrderQueueStatus = {
					id: "102030",
					order_id: orderId,
					status_queue: "Finalizado",
					orderDate: "22/01/2024",
				};
			}

			MoveNextGatewayMock.getOrderQueue = sinon
				.stub()
				.resolves([mockGetOrderQueue]);
			MoveNextGatewayMock.getOrderQueueStatus = sinon
				.stub()
				.resolves([mockGetOrderQueueStatus]);
		};

		if (int === 1 || int === 2) {
			setupGatewayMock(int);
		}

		this.result = await MoveNextUseCase.execute(
			{ id: int },
			MoveNextGatewayMock
		);
	}
);

Then("Deve me retornar status {string}", function (this: any, status: string) {
	assert.equal(this.result.result[0].status, status);
});

Then("message {string}", function (this: any, s: string) {
	assert.equal(this.result.message, s);
});

Then("Deve retornar status {int}", function (this: any, int: number) {
	assert.equal(this.result.httpCode, int);
});

Then("Deve retornar error", function (this: any) {
	assert.equal(this.result.hasError, true);
});
