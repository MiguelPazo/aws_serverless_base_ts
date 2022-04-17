import {EventsDao} from "./dao/dynamodb/eventsDao";

/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

const TYPES = {
    // Utils
    IUtils: Symbol.for('IUtils'),
    ILogger: Symbol.for('ILogger'),

    // Filters
    AuthFilter: Symbol.for('AuthFilter'),

    // Databases
    IMysqlDb: Symbol.for('IMysqlDb'),
    IMongoDb: Symbol.for('IMongoDb'),
    IRedisDb: Symbol.for('IRedisDb'),
    IDynamoDb: Symbol.for('IDynamoDb'),

    // Dao MongoDB
    IUserDao: Symbol.for('IUserDao'),

    // Dao DynamoDB
    EventsDao: Symbol.for('EventsDao'),

    // Services
    IAuthService: Symbol.for('IAuthService'),
    IJwtService: Symbol.for('IJwtService'),
    ISqsService: Symbol.for('ISqsService'),
    IUploadService: Symbol.for('IUploadService'),
    IUserService: Symbol.for('IUserService'),
    IEventsService: Symbol.for('IEventsService'),
};

export default TYPES;
