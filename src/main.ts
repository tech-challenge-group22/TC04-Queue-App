import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';

import OrderQueueRoute from './infrastructure/api/orderqueue.route';

dotenv.config();
const server = new ExpressAdapter();

const orderQueueRoute = new OrderQueueRoute(server);

server.router(OrderQueueRoute);

server.listen(3000);
