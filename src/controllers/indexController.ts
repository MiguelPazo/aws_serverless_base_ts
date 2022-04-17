/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {Request, Response} from "express";
import {api, apiController, apiOperation, apiResponse, controllerNoAuth, GET} from "ts-lambda-api";
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {ILogger} from "../common/_interfaces";


@apiController("")
@api("Home", "health check")
@controllerNoAuth
@injectable()
export class IndexController {

    private readonly logger;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    @GET("/")
    @apiOperation({name: "Home", description: "health check"})
    @apiResponse(200, {
        type: "object",
        example: `{"success": true}`
    })
    public index(request: Request, response: Response) {
        return {"status": "ok"};
    }
}
