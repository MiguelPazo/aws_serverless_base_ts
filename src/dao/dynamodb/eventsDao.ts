/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {BaseDao} from "./_baseDao";
import {injectable} from "inversify";
import {IEventsModel} from "../../models/dynamodb/eventsModel";

export interface Users {
    code: string;
    date: number;
}

const DYNAMO_TABLE_EVENTS = 'events';


@injectable()
export class EventsDao extends BaseDao<IEventsModel> {
    tableName: string = DYNAMO_TABLE_EVENTS;
    key: string = 'code';
    sortKey: string = 'created_at';
}
