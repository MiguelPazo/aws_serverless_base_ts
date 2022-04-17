import {IUserModel} from "../../models/mongodb/userModel";

/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IUserService {

    getOne(user: string): Promise<IUserModel | null>;
}
