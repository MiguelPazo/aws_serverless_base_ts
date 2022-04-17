/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import {inject, injectable} from "inversify";
import TYPES from "../types";
import {IRedisDb} from "../databases/_interfaces";
import * as fs from "fs";
import {IJwtService} from "./interfaces/IJwtService";
import {importJWK, jwtVerify, SignJWT} from "jose";
import {ILogger, IUtils} from "../common/_interfaces";
import {AuthUser} from "../dto/authUser";


@injectable()
export class JwtService implements IJwtService {

    private readonly logger;

    @inject(TYPES.IRedisDb)
    private redisDb: IRedisDb;

    @inject(TYPES.IUtils)
    private readonly utils: IUtils;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this.logger = logger.getLogger();
    }

    async generateAuthToken(data: any): Promise<string | null> {
        try {
            const privateKey = fs.readFileSync(__dirname + './../../storage/keys/private_key.json');
            const jwkPrivate = await importJWK(JSON.parse(privateKey.toString()), 'PS256');

            const authToken = await new SignJWT(data)
                .setProtectedHeader({alg: 'RS256'})
                .setIssuedAt()
                .setIssuer('app')
                .setJti(this.utils.generateCode())
                .setAudience('audience')
                .setExpirationTime('24h')
                .sign(jwkPrivate);

            return authToken;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async verifyAuthToken(jwt: string): Promise<AuthUser | any> {
        try {
            if (this.utils.isEmpty(jwt.toString())) {
                return null;
            }

            const publicKey = fs.readFileSync(__dirname + './../../storage/keys/public_key.json');
            const jwkPublic = await importJWK(JSON.parse(publicKey.toString()), 'PS256');
            const {payload} = await jwtVerify(jwt.toString(), jwkPublic);

            payload['token'] = jwt;

            return payload;
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }

    async setRevokedToken(payload: AuthUser): Promise<boolean> {
        try {
            const redisWriter = await this.redisDb.getWriter();

            await redisWriter.set(payload.token, true);
            await redisWriter.expireat(payload.token, payload.exp);

            return true;
        } catch (err) {
            this.logger.error(err);
        }

        return false;
    }

    async getRevokedToken(jwt: string): Promise<string | null> {
        try {
            const redisReader = await this.redisDb.getReader();

            return await redisReader.get(jwt);
        } catch (err) {
            this.logger.error(err);
        }

        return null;
    }
}
