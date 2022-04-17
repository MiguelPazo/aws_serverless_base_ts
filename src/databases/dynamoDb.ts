/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {IDynamoDb} from "./_interfaces";
import {inject, injectable} from "inversify";
import {DynamoDB} from 'aws-sdk';
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class DynamoDb implements IDynamoDb {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    getDb(): any {
        try {
            return new DynamoDB.DocumentClient({
                region: process.env.DYNAMODB_REGION || '',
                accessKeyId: process.env.DYNAMODB_ACCESS_KEY,
                secretAccessKey: process.env.DYNAMODB_SECRET_KEY,
                maxRetries: 10
            });
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
