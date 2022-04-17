/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Request} from "lambda-api"
import {apiSecurity, IAuthFilter, Principal} from "ts-lambda-api";
import TYPES from "../types";
import {IJwtService} from "../services/interfaces/IJwtService";
import {AuthUser} from "../dto/authUser";
import container from "../inversifyConfig";
import {ILogger} from "../common/_interfaces";


@apiSecurity("bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT"
})
export class AuthFilter extends Principal implements IAuthFilter<string, AuthUser> {

    public readonly authenticationSchemeName: string = "Bearer "
    public readonly logger = container.get<ILogger>(TYPES.ILogger);
    public readonly jwtService = container.get<IJwtService>(TYPES.IJwtService);

    public async extractAuthData(request: Request): Promise<string | undefined> {
        if (request.headers["Authorization"]) {
            return request.headers["Authorization"].split(this.authenticationSchemeName)[1];
        }
    }

    public async authenticate(authToken: string): Promise<AuthUser | undefined> {
        const user = await this.jwtService.verifyAuthToken(authToken);

        if (user) {
            return user;
        }
    }
}
