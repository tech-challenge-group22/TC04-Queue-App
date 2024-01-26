import IOrderQueueGateway from '../../core/ports/IOrderQueueGateway';
import { NewOrderQueueInputDTO, NewOrderQueueOutputDTO } from './NewOrderQueueDTO';
  
  export class NewOrderQueueUseCase {
    static async execute( params: NewOrderQueueInputDTO, gateway: IOrderQueueGateway, ): Promise<NewOrderQueueOutputDTO> {
        try {
            await gateway.add(params.order_id);

            const output: NewOrderQueueOutputDTO = {
                hasError: false,
            };
            
            console.log('Adding a new order into the queue sucessfully!');
            return output;

        } catch (error: any){
            const output: NewOrderQueueOutputDTO = {
                hasError: true,
                message: 'Failed to add a new order into the queue',
                httpCode: 500,
              };
        
              console.log('Error adding a new order into the queue', error);
              return output;
        }
    }
}
