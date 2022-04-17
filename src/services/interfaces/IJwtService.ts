/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {AuthUser} from "../../dto/authUser";

export interface IJwtService {

    generateAuthToken(data: any): Promise<string | null>;

    verifyAuthToken(jwt: string): Promise<AuthUser | any>;

    setRevokedToken(payload: AuthUser): Promise<boolean>;

    getRevokedToken(jwt: string): Promise<string | null>;
}
