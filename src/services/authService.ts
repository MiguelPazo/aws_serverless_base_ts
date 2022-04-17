/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import {IAuthService} from "./interfaces/IAuthService";
import TYPES from "../types";
import {ILogger, IUtils} from "../common/_interfaces";
import {IUserService} from "./interfaces/IUserService";
import {IJwtService} from "./interfaces/IJwtService";


@injectable()
export class AuthService implements IAuthService {

    private readonly logger;

    @inject(TYPES.IUserService)
    private readonly userService: IUserService;

    @inject(TYPES.IJwtService)
    private readonly jwtService: IJwtService;

    @inject(TYPES.IUtils)
    private readonly utils: IUtils;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async validate(user: string, password: string, ip: string, userAgent?: string): Promise<string | null> {
        try {
            const oUser = await this.userService.getOne(user.toString());

            if (oUser) {
                if (await this.utils.comparePasswordWithSalt(password, oUser.password)) {
                    const authToken = await this.jwtService.generateAuthToken({
                        user: oUser.user,
                        firstname: oUser.firstname,
                        lastname: oUser.lastname,
                        ip,
                        userAgent
                    });

                    return authToken;
                }
            }
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
