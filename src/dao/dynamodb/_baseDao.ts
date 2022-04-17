/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../../types";
import {IDynamoDb} from "../../databases/_interfaces";
import {ILogger} from "../../common/_interfaces";


@injectable()
export class BaseDao<Schema> {

    private readonly logger;

    protected readonly tableName: string;
    protected readonly key: string;
    protected readonly sortKey: string;

    @inject(TYPES.IDynamoDb)
    private readonly dynamoDb: IDynamoDb;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async fetchAll(partitionKey: any, sortKey?: any, columns?: Array<string>): Promise<[Schema] | []> {
        try {
            const _db = await this.dynamoDb.getDb();

            let partitionKeyQuery = `:${this.key}`
            let sortKeyQuery = `:${this.sortKey}`

            let params = {
                TableName: this.tableName,
                KeyConditionExpression: `${this.key} = ${partitionKeyQuery}`,
                ExpressionAttributeValues: {
                    [partitionKeyQuery]: partitionKey,
                },
                ProjectionExpression: columns ? columns.join(',') : undefined
            };

            if (sortKey) {
                params['FilterExpression'] = `${this.sortKey} = ${sortKeyQuery}`;
                params['ExpressionAttributeValues'] = {
                    [partitionKeyQuery]: partitionKey,
                    [sortKeyQuery]: sortKey,
                };
            }

            console.log(params);

            let result = await _db.query(params).promise();

            if (result.Items.length > 0) {
                return result.Items as [Schema];
            }
        } catch (err) {
            this.logger.error(err);
        }

        return [];
    }

    async scan(): Promise<Array<Schema>> {
        try {
            const _db = await this.dynamoDb.getDb();

            let resp = await _db.scan({
                TableName: this.tableName
            }).promise();

            if (resp.Items) {
                return resp.Items as Schema[];
            }
        } catch (err) {
            this.logger.error(err);
        }

        return [];
    }

    async put(data: Schema, returnValues: string = 'NONE') {
        try {
            const _db = await this.dynamoDb.getDb();

            return await _db.put({
                TableName: this.tableName,
                Item: data,
                ReturnValues: returnValues
            }).promise();
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
