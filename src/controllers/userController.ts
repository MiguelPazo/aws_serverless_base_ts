/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {principal} from "inversify-express-utils";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IUserService} from "../services/interfaces/IUserService";
import {api, apiController, apiOperation, apiResponse, controllerRolesAllowed, GET} from "ts-lambda-api";
import {AuthUser} from "../dto/authUser";
import {ILogger} from "../common/_interfaces";


@apiController("/user")
@controllerRolesAllowed("admin")
@api("User API", "description of API for doing amazing things")
@injectable()
export class UserController {

    private readonly logger;

    @inject(TYPES.IUserService)
    private readonly userService: IUserService;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @GET("")
    @apiOperation({name: "Get User", description: "show details of one user"})
    @apiResponse(200, {
        type: "object",
        example: `{"success": true}`
    })
    public async getOne(@principal() user: AuthUser) {
        return await this.userService.getOne(user.user);
    }
}
