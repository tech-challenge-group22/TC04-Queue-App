// import { Given, When, Then, After} from "@cucumber/cucumber";
// import assert from "assert";
// import ExpressAdapter from "../../../src/application/adapters/ExpressAdapter";
// import OrderQueueRoute from "../../../src/infrastructure/api/orderqueue.route"

// let server: ExpressAdapter;
// let orderQueueRoute: any;

// Given("o servidor não está em execução", () => {
// 	server = new ExpressAdapter();
// });

// When("eu iniciar o servidor", () => {
// 	server.listen(3000);
// });

// Then("o servidor deve iniciar corretamente", () => {
// 	return assert.notEqual(server, undefined);
// });

// When("eu iniciar a rota fila de pedidos", async () => {
// 	orderQueueRoute = new OrderQueueRoute(server);
// 	await server.router(OrderQueueRoute);
// });

// Then("a rota deve iniciar corretamente", () => {
// 	assert.notEqual(orderQueueRoute, undefined);
// });

// After(async () => {
// 	// Close the server if it's running
// 	if (server) {
// 	  await server.close(); // Replace with the actual method to stop your server
// 	}
// });