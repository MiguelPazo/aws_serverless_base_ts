/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {MongoClient, MongoClientOptions} from 'mongodb';
import * as fs from 'fs';
import {IMongoDb} from "./_interfaces";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class MongoDb implements IMongoDb {

    private readonly logger;

    private reader: any = null;
    private writer: any = null;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getReader(): Promise<any> {
        if (!this.reader) {
            switch (process.env.MONGODB_CONNECTOR) {
                case 'atlas':
                    this.reader = await this.getConnectionAtlas(true);
                    break;

                case 'documentdb':
                    this.reader = await this.getConnectionDocumentDB(true);
                    break;
            }
        }

        return this.reader;
    }

    async getWriter(): Promise<any> {
        if (!this.writer) {
            switch (process.env.MONGODB_CONNECTOR) {
                case 'atlas':
                    this.writer = await this.getConnectionAtlas(false);
                    break;

                case 'documentdb':
                    this.writer = await this.getConnectionDocumentDB(false);
                    break;
            }
        }

        return this.writer;
    }

    async getConnectionAtlas(readerInstance: boolean): Promise<any> {
        try {
            let uri: string;
            const host = readerInstance ? process.env.MONGODB_HOST_READER : process.env.MONGODB_HOST_WRITER;

            const connConfig: MongoClientOptions = {
                keepAlive: true,
                connectTimeoutMS: 5000,
            };

            uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${host}`;
            let connection = await MongoClient.connect(uri, connConfig);

            return connection.db(process.env.MONGODB_DATABASE);
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async getConnectionDocumentDB(readerInstance: boolean): Promise<any> {
        try {
            const ca = fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem');

            let uri: string;
            const host = readerInstance ? process.env.MONGODB_HOST_READER : process.env.MONGODB_HOST_WRITER;

            let connConfig: MongoClientOptions = {
                sslValidate: true,
                sslCA: ca.toString(),
            };

            uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${host}/${process.env.MONGODB_DATABASE}?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retrywrites=false`;

            let connection = await MongoClient.connect(uri, connConfig);

            return connection.db(process.env.MONGODB_DATABASE);
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
