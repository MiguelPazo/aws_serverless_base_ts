/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {IEventsModel} from "../../models/dynamodb/eventsModel";


export interface IEventsService {

    save(message: string, code?: string): Promise<Boolean>;

    fetchAll(partitionKey: any, sortKey?: any): Promise<[IEventsModel] | []>;
}
