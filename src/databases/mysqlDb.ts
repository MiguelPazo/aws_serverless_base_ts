/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as mysql from "mysql2/promise";
import {IMysqlDb} from "./_interfaces";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@injectable()
export class MysqlDb implements IMysqlDb {

    private readonly logger;

    private reader: any = null;
    private writer: any = null;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getReader(): Promise<any> {
        try {
            if (!this.reader) {
                this.reader = await mysql.createConnection({
                    host: process.env.MYSQL_HOST_READER,
                    user: process.env.MYSQL_USERNAME,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE
                });
            }
        } catch (err) {
            this.logger.error(err);
        }

        return this.reader;
    }

    async getWriter(): Promise<any> {
        try {
            if (!this.writer) {
                this.writer = await mysql.createConnection({
                    host: process.env.MYSQL_HOST_WRITER,
                    user: process.env.MYSQL_USERNAME,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE
                });
            }
        } catch (err) {
            this.logger.error(err);
        }

        return this.writer;
    }
}
