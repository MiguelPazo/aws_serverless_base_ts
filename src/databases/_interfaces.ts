/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IMysqlDb {

    getReader(): Promise<any>;

    getWriter(): Promise<any>;
}

export interface IMongoDb {

    getReader(): Promise<any>;

    getWriter(): Promise<any>;
}

export interface IRedisDb {

    getReader(): Promise<any>;

    getWriter(): Promise<any>;
}

export interface IDynamoDb {

    getDb(): Promise<any>;
}
