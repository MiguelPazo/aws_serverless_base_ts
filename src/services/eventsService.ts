/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";
import {IEventsService} from "./interfaces/IEventsService";
import {IEventsModel} from "../models/dynamodb/eventsModel";
import {v4 as uuidv4} from 'uuid';
import {EventsDao} from "../dao/dynamodb/eventsDao";


@injectable()
export class EventsService implements IEventsService {

    private readonly logger;

    @inject(TYPES.EventsDao)
    private readonly eventsDao: EventsDao;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async save(message: string, code?: string): Promise<Boolean> {
        try {
            const data = {
                code: code || uuidv4(),
                created_at: new Date().getTime(),
                message
            }

            await this.eventsDao.put(data);

            return true;
        } catch (err) {
            this.logger.error(err);
        }

        return false;
    }

    async fetchAll(partitionKey: any, sortKey?: any): Promise<[IEventsModel] | []> {
        try {
            const result = await this.eventsDao.fetchAll(partitionKey, sortKey);

            return result;
        } catch (err) {
            this.logger.error(err);
        }

        return [];
    }
}
