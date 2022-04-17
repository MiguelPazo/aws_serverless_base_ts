/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IAuthService} from "../services/interfaces/IAuthService";
import {Request} from "lambda-api"
import {api, apiController, apiOperation, apiResponse, body, controllerNoAuth, POST, request} from "ts-lambda-api";
import {ILogger} from "../common/_interfaces";


@apiController("/auth")
@api("Authentication endpoints", "Endpoints for complete authentication process")
@controllerNoAuth
@injectable()
export class AuthController {

    private readonly logger;

    @inject(TYPES.IAuthService)
    private readonly authService: IAuthService;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @POST("")
    @apiOperation({name: "Auth user", description: "auth user"})
    @apiResponse(200, {
        type: "object",
        example: `{success: true, token: "asd.qwe.qwe"}`
    })
    public async index(@body user: any, @request request: Request) {
        const result = await this.authService.validate(user.user, user.password, request.ip, request.userAgent);

        if (result) {
            return {success: true, token: result};
        }

        return {success: false};
    }
}
