/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {IUserModel} from "../../models/mongodb/userModel";


export interface IUserDao {

    getOne(query: any): Promise<IUserModel | null>;
}
