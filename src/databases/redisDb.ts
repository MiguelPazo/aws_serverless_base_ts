/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as Redis from "ioredis";
import {IRedisDb} from "./_interfaces";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class RedisDb implements IRedisDb {

    private readonly logger;

    private reader: any = null;
    private writer: any = null;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getReader(): Promise<any> {
        try {
            if (!this.reader) {
                let config = {
                    port: 6379,
                    host: process.env.REDIS_READER,
                };

                if (process.env.REDIS_PASSWORD) {
                    config['password'] = process.env.REDIS_PASSWORD
                }

                this.reader = new Redis(config);
            }
        } catch (err) {
            this.logger.error(err);
        }

        return this.reader;
    }

    async getWriter(): Promise<any> {
        try {
            if (!this.writer) {
                let config = {
                    port: 6379,
                    host: process.env.REDIS_WRITER,
                };

                if (process.env.REDIS_PASSWORD) {
                    config['password'] = process.env.REDIS_PASSWORD
                }

                this.writer = new Redis(config);
            }
        } catch (err) {
            this.logger.error(err);
        }

        return this.writer;
    }
}
