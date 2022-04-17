/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {sqs} from "../queue/sqs";
import {inject, injectable} from "inversify";
import {ISqsService} from "./interfaces/ISqsService";
import {ILogger} from "../common/_interfaces";
import TYPES from "../types";


@injectable()
export class SqsService implements ISqsService {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async send(data: any, queueUrl: string): Promise<any> {
        const params: any = {
            DelaySeconds: 10,
            MessageBody: JSON.stringify(data),
            QueueUrl: queueUrl
        };

        try {
            await sqs.sendMessage(params).promise();
        } catch (err) {
            this.logger.error(err);
        }

        return true;
    }
}
