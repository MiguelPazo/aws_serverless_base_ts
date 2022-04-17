/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IUserService} from "./interfaces/IUserService";
import {IUserDao} from "../dao/mongodb/_interfaces";
import {IUserModel} from "../models/mongodb/userModel";
import {ILogger} from "../common/_interfaces";


@injectable()
export class UserService implements IUserService {

    private readonly logger;

    @inject(TYPES.IUserDao)
    private readonly userDao: IUserDao;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async getOne(user: string): Promise<IUserModel | null> {
        try {
            const oUser = await this.userDao.getOne({user: user});

            return oUser;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
