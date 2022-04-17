/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {IUserDao} from "./_interfaces";
import TYPES from "../../types";
import {ILogger} from "../../common/_interfaces";
import {IMongoDb} from "../../databases/_interfaces";
import {IUserModel} from "../../models/mongodb/userModel";


@injectable()
export class UserDao implements IUserDao {

    private readonly logger;
    private readonly collection = 'users';

    @inject(TYPES.IMongoDb)
    private readonly mongoDb: IMongoDb;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getOne(query: any): Promise<IUserModel | null> {
        const reader = await this.mongoDb.getReader();

        try {
            const data = await reader.collection(this.collection).findOne(query);

            return data;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}

